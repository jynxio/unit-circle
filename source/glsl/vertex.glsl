#version 300 es

in vec4 a_color;
in vec4 a_position;

out vec4 v_color;

void main () {

    v_color = a_color;

    gl_Position = a_position;

}