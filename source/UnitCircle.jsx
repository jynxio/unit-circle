import vertex_shader_source from "./glsl/vertex.glsl?raw";
import fragment_shader_source from "./glsl/fragment.glsl?raw";

import style from "./UnitCircle.module.css";

import { onMount } from "solid-js";

function UnitCircle () {

    let canvas;

    onMount( _ => {

        /* gl */
        const gl = canvas.getContext( "webgl2" );

        if ( ! gl ) throw new Error( "It doesn't support webgl2" );

        /* shader and program */
        const vertex_shader = createShader( gl, gl.VERTEX_SHADER, vertex_shader_source );
        const fragment_shader = createShader( gl, gl.FRAGMENT_SHADER, fragment_shader_source );

        const program = createProgram( gl, vertex_shader, fragment_shader );

        /* vertex array object */
        const vertex_array_object = gl.createVertexArray(); // Create a vertex array object (attribute state)

        gl.bindVertexArray( vertex_array_object );          // Make it the one we're currently working with

        /* location & buffer */
        const position_attribute_location = gl.getAttribLocation( program, "a_position" );
        const color_attribute_location = gl.getAttribLocation( program, "a_color" );

        const position_buffer = gl.createBuffer();
        const color_buffer = gl.createBuffer();

        const position_data = [];
        const color_data = [];

        const position_size = 2;          // 2 components per iteration
        const position_type = gl.FLOAT;   // the data is 32bit floats
        const position_normalize = false; // don't normalize the data
        const position_stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        const position_offset = 0;        // start at the beginning of the buffer

        const color_size = 4;
        const color_type = gl.FLOAT;
        const color_normalize = false;
        const color_stride = 0;
        const color_offset = 0;

        /* draw */
        const draw = ( horizontal_pixel_count, vertical_pixel_count ) => {

            /* base */
            gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );
            gl.clearColor( 0, 0, 0, 1 );
            gl.clear( gl.COLOR_BUFFER_BIT );
            gl.useProgram( program );

            /* the position of the grid */
            position_data.push(
                - 1, - 0.8, 1, - 0.8,
                - 1, 0, 1, 0,
                - 1, 0.8, 1, 0.8,
                - 0.8, - 1, - 0.8, 1,
                0, - 1, 0, 1,
                0.8, - 1, 0.8, 1,
            );

            /* the position of the ring */
            const angle_step = Math.PI * 2 / 100;
            const offset_x = 1 / horizontal_pixel_count * 2;
            const offset_y = 1 / vertical_pixel_count * 2;

            for ( let i = 0; i < 100; i ++ ) {

                const angle = i * angle_step;
                const sin = Math.sin( angle );
                const cos = Math.cos( angle );

                position_data.push( sin * 0.8, cos * 0.8 );

            }

            for ( let i = 0; i < 100; i ++ ) {

                const angle = i * angle_step;
                const sin = Math.sin( angle );
                const cos = Math.cos( angle );

                position_data.push( sin * 0.8 - offset_x * Math.sign( sin ), cos * 0.8 - offset_y * Math.sign( cos ) );

            }

            /* the position of the anchor */
            for ( let i = 0; i < 20; i ++ ) {

                const angle = i * Math.PI * 2 / 20;

                const sin = Math.sin( angle ) * 0.065 + 0;
                const cos = Math.cos( angle ) * 0.065 + 0.8;

                const new_sin = sin * Math.cos( Math.PI / 2 ) + cos * Math.sin( Math.PI / 2 );
                const new_cos = - sin * Math.sin( Math.PI / 2 ) + cos * Math.cos( Math.PI / 2 );

                position_data.push( new_sin, new_cos );

            }

            /* the color of the grid */
            for ( let i = 0; i < 12; i ++ ) color_data.push( 0.2, 0.2, 0.2, 1 );

            /* the color of the ring */
            for ( let i = 0; i < 200; i ++ ) color_data.push( Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1, 1 );

            /* the color of the anchor */
            for ( let i = 0; i < 20; i ++ ) color_data.push( Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1, 1 );

            /* bind position data */
            gl.bindBuffer( gl.ARRAY_BUFFER, position_buffer );
            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( position_data ), gl.STATIC_DRAW );

            gl.enableVertexAttribArray( position_attribute_location );
            gl.vertexAttribPointer( position_attribute_location, position_size, position_type, position_normalize, position_stride, position_offset );

            /* bind color data */
            gl.bindBuffer( gl.ARRAY_BUFFER, color_buffer );
            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( color_data ), gl.STATIC_DRAW );

            gl.enableVertexAttribArray( color_attribute_location );
            gl.vertexAttribPointer( color_attribute_location, color_size, color_type, color_normalize, color_stride, color_offset );

            /*  */
            gl.drawArrays( gl.LINES, 0, 12 );       // type, point offset, point count

            gl.drawArrays( gl.LINE_LOOP, 12, 100 ); // type, point offset, point count
            gl.drawArrays( gl.LINE_LOOP, 112, 100 ); // type, point offset, point count

            gl.drawArrays( gl.LINE_LOOP, 212, 20 ); // type, point offset, point count

        };

        updateCanvasSize( canvas, draw );

    } );

    return (
        <div class={ style.container }>
            <canvas ref={ canvas }></canvas>
        </div>
    );

}

/**
 * 自动更新<canvas>的width和height。
 * @param { HTMLCanvasElement } canvas - <canvas>。
 * @param { Function } [ handleResizeEvent ] - （可选）回调函数，它会在<canvas>更新完毕之后被执行，并接收2个入参，依次是canvas.width和canvas.height。
 */
function updateCanvasSize ( canvas, handleResizeEvent ) {

    const observer = new ResizeObserver( callback );

    observer.observe( canvas, { box: "content-box" } ); // Safari不支持device-pixel-content-box

    function callback ( entries ) {

        for ( const entry of entries ) {

            const software_pixel_width = entry.contentBoxSize[ 0 ].inlineSize; // Safari不支持devicePixelContentBoxSize
            const software_pixel_height = entry.contentBoxSize[ 0 ].blockSize; // Safari不支持devicePixelContentBoxSize

            const hardware_pixel_width = Math.round( software_pixel_width * globalThis.devicePixelRatio );
            const hardware_pixel_height = Math.round( software_pixel_height * globalThis.devicePixelRatio );

            canvas.width = hardware_pixel_width;
            canvas.height = hardware_pixel_height;

        }

        const horizontal_pixel_count = canvas.width;
        const vertical_pixel_count = canvas.height;

        handleResizeEvent?.( horizontal_pixel_count, vertical_pixel_count );

    }

}

/**
 * 创建vertex或fragment着色器。
 * @param { WebGL2RenderingContext } gl - WebGL2的上下文。
 * @param { number } type - gl.VERTEX_SHADER或gl.FRAGMENT_SHADER。
 * @param { string } source - 着色器的内容。
 * @returns { WebGLShader } - 若编译成功，则返回WebGLShader实例，否则抛出一个错误。
 */
function createShader( gl, type, source ) {

    const shader = gl.createShader( type );

    gl.shaderSource( shader, source );
    gl.compileShader( shader );

    const success = gl.getShaderParameter( shader, gl.COMPILE_STATUS );

    if ( success ) return shader;

    const error = new Error( gl.getShaderInfoLog( shader ) );

    gl.deleteShader( shader );

    throw error;

}

/**
 * 创建program。
 * @param { WebGL2RenderingContext } gl - WebGL2的上下文。
 * @param { WebGLShader } vertex_shader - vertex shader。
 * @param { WebGLShader } fragment_shader - fragment shader。
 * @returns { WebGLProgram } - 若连接成功，则返回WebGLProgram实例，否则抛出一个错误。
 */
function createProgram ( gl, vertex_shader, fragment_shader ) {

    const program = gl.createProgram();

    gl.attachShader( program, vertex_shader );
    gl.attachShader( program, fragment_shader );
    gl.linkProgram( program );

    const success = gl.getProgramParameter( program, gl.LINK_STATUS );

    if ( success ) return program;

    const error = new Error( gl.getProgramInfoLog( program ) );

    gl.deleteProgram( program );

    throw error;

}

export default UnitCircle;