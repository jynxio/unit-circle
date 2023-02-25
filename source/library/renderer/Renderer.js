import vertex_shader_source from "../glsl/vertex.glsl?.raw";
import fragment_shader_source from "../glsl/fragment.glsl?.raw";

/**
 * 构造器。
 * @param { Object } option - 参数字典。
 * @param { HTMLCanvasElement } option.canvas - <canvas>。
 * @returns { Object } - 实例。
 */
export default function ( { canvas } ) {

    /*  */
    const gl = canvas.getContext( "webgl2" );

    if ( ! gl ) throw new Error( "当前运行时不支持webgl2" );

    /*  */
    const vertex_shader = createShader( gl, gl.VERTEX_SHADER, vertex_shader_source );
    const fragment_shader = createShader( gl, gl.FRAGMENT_SHADER, fragment_shader_source );
    const program = createProgram( gl, vertex_shader, fragment_shader );

    /*  */
    const vertex_array_object = gl.createVertexArray();
    gl.bindVertexArray( vertex_array_object );

    /*  */
    const colors = [];
    const positions = [];

    const color_buffer = gl.createBuffer();
    const position_buffer = gl.createBuffer();

    const color_attribute_location = gl.getAttribLocation( program, "a_color" );
    const position_attribute_location = gl.getAttribLocation( program, "a_position" );

    const color_size = 4;
    const color_type = gl.FLOAT;
    const color_normalize = false;
    const color_stride = 0;
    const color_offset = 0;

    const position_size = 2;
    const position_type = gl.FLOAT;
    const position_normalize = false;
    const position_stride = 0;
    const position_offset = 0;

    /*  */
    this.render = models => {

        /*  */
        colors.length = 0;
        positions.length = 0;

        models.forEach( model => {

            colors.push( ... model.getColors() );
            positions.push( ... model.getPositions() );

        } );

        gl.bindBuffer( gl.ARRAY_BUFFER, position_buffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( positions ), gl.STATIC_DRAW );
        gl.enableVertexAttribArray( position_attribute_location );
        gl.vertexAttribPointer( position_attribute_location, position_size, position_type, position_normalize, position_stride, position_offset );

        gl.bindBuffer( gl.ARRAY_BUFFER, color_buffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors ), gl.STATIC_DRAW );
        gl.enableVertexAttribArray( color_attribute_location );
        gl.vertexAttribPointer( color_attribute_location, color_size, color_type, color_normalize, color_stride, color_offset );

        /*  */
        gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );
        gl.clearColor( 0, 0, 0, 1 );
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.useProgram( program );

        let offset = 0;

        models.forEach( model => {

            const type = createDrawType( model.getDrawType() );
            const count = model.getDrawCount();

            gl.drawArrays( type, offset, count );

            offset += count;

        } );

    };

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
 * 创建drawArrays所需的绘制类型。
 * @param { WebGL2RenderingContext } gl - WebGL2的上下文。
 * @param { string } draw_type - "POINTS" | "LINES" | "LINE_STRIP" | "LINE_LOOP" | "TRIANGLES" | "TRIANGLE_STRIP" | "TRIANGLE_FAN"
 * @returns { number } - 绘制类型。
 */
function createDrawType ( gl, draw_type ) {

    switch ( draw_type ) {

        case "POINTS": return gl.POINTS;
        case "LINES": return gl.LINES;
        case "LINE_STRIP": return gl.LINE_STRIP;
        case "LINE_LOOP": return gl.LINE_LOOP;
        case "TRIANGLES": return gl.TRIANGLES;
        case "TRIANGLE_STRIP": return gl.TRIANGLE_STRIP;
        case "TRIANGLE_FAN": return gl.TRIANGLE_FAN;
        default: throw new Error( "遭遇非法参数" );

    }

}