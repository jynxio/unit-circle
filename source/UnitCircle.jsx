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

        /* position */
        const position_data = [ ... createGrid(), ... createCircle( 100, 0.8 ) ];
        const position_buffer = gl.createBuffer();

        gl.bindBuffer( gl.ARRAY_BUFFER, position_buffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( position_data ), gl.STATIC_DRAW );

        const position_attribute_location = gl.getAttribLocation( program, "a_position" );

        const position_size = 2;          // 2 components per iteration
        const position_type = gl.FLOAT;   // the data is 32bit floats
        const position_normalize = false; // don't normalize the data
        const position_stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        const position_offset = 0;        // start at the beginning of the buffer

        gl.enableVertexAttribArray( position_attribute_location );
        gl.vertexAttribPointer( position_attribute_location, position_size, position_type, position_normalize, position_stride, position_offset );

        /*  */
        const color_uniform_location = gl.getUniformLocation( program, "u_color" );

        /* draw */
        const draw = _ => {

            gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );
            gl.clearColor( 0, 0, 0, 1 );
            gl.clear( gl.COLOR_BUFFER_BIT );
            gl.useProgram( program );

            gl.uniform4fv( color_uniform_location, [ 0.2, 0.2, 0.2, 1 ] ); // reset color
            gl.drawArrays( gl.LINES, 0, 12 );                              // type, point offset, point count

            gl.uniform4fv( color_uniform_location, [ 0.8, 0.8, 1, 1 ] ); // reset color
            gl.drawArrays( gl.LINE_LOOP, 12, 100 );                      // type, point offset, point count

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
 * @param { Function } [ handleResizeEvent ] - （可选）回调函数，它的执行时机是<canvas>的width和height更新完毕之后。
 */
function updateCanvasSize ( canvas, handleResizeEvent ) {

    const observer = new ResizeObserver( callback );

    observer.observe( canvas, { box: "device-pixel-content-box" } );

    function callback ( entries ) {

        for ( const entry of entries ) {

            const software_pixel_width = entry.devicePixelContentBoxSize[ 0 ].inlineSize;
            const software_pixel_height = entry.devicePixelContentBoxSize[ 0 ].blockSize;

            canvas.width = software_pixel_width;
            canvas.height = software_pixel_width;

            continue; // MacOS使用👆 Windows使用👇 这是为什么？

            const hardware_pixel_width = Math.round( software_pixel_width * globalThis.devicePixelRatio / 2 );
            const hardware_pixel_height = Math.round( software_pixel_height * globalThis.devicePixelRatio / 2 );

            canvas.width = hardware_pixel_width;
            canvas.height = hardware_pixel_height;

        }

        handleResizeEvent?.();

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

/**
 * 创建网格。
 * @returns { number[] } - 网格的二维节点坐标数组。
 */
function createGrid () {

    const position_data = [
        - 1, - 0.8, 1, - 0.8,
        - 1, 0, 1, 0,
        - 1, 0.8, 1, 0.8,
        - 0.8, - 1, - 0.8, 1,
        0, - 1, 0, 1,
        0.8, - 1, 0.8, 1,
    ];

    return position_data;

}

/**
 * 创建一个圆。
 * @param { number } segment_count - 分段数。
 * @param { number } ratio - 倍率，比如当ratio为1时将会创建单位圆。
 * @returns { number[] } - 单位圆的二维节点坐标数组。
 */
function createCircle ( segment_count, ratio ) {

    const step = Math.PI * 2 / segment_count;

    const position_data = [];

    for ( let i = 0; i < segment_count; i ++ ) {

        const angle = i * step;
        const x = Math.sin( angle ) * ratio;
        const y = Math.cos( angle ) * ratio;

        position_data.push( x, y );

    }

    return position_data;

}


export default UnitCircle;
