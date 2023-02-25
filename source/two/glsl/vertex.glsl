#version 300 es

in vec4 a_color;
in vec2 a_position;

uniform vec2 u_rotation;

out vec4 v_color;

void main () {

    v_color = a_color;

    vec2 rotatedPosition = vec2(
        a_position.x * u_rotation.y + a_position.y * u_rotation.x,
        a_position.y * u_rotation.y - a_position.x * u_rotation.x
    );

    gl_Position = vec4( rotatedPosition, 0, 1 );

}