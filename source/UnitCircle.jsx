import updateCanvasSize from "./helper/updateCanvasSize";
import * as two from "./two";

import style from "./UnitCircle.module.css";

import { createSignal, createEffect, onMount } from "solid-js";

function UnitCircle () {

    /* ref */
    let canvas;

    /* signal */
    const [ getRadian, setRadian ] = createSignal( 0 );

    /* closure */
    let is_move_enabled = false;
    let is_wheel_enabled = false;

    let base_x, base_y;
    let radian_snapshot;

    /* life cycle */
    onMount( _ => {

        /* renderer */
        const renderer = new two.Renderer( { canvas } );

        /* grid */
        const grid_line_1 = new two.Polyline( { positions: [ - 0.8, - 1, - 0.8, 1 ], color: [ 0.2, 0.2, 0.2, 1 ] } );
        const grid_line_2 = new two.Polyline( { positions: [ - 0, - 1, 0, 1 ], color: [ 0.2, 0.2, 0.2, 1 ] } );
        const grid_line_3 = new two.Polyline( { positions: [ 0.8, - 1, 0.8, 1 ], color: [ 0.2, 0.2, 0.2, 1 ] } );
        const grid_line_4 = new two.Polyline( { positions: [ - 1, - 0.8, 1, - 0.8 ], color: [ 0.2, 0.2, 0.2, 1 ] } );
        const grid_line_5 = new two.Polyline( { positions: [ - 1, 0, 1, 0 ], color: [ 0.2, 0.2, 0.2, 1 ] } );
        const grid_line_6 = new two.Polyline( { positions: [ - 1, 0.8, 1, 0.8 ], color: [ 0.2, 0.2, 0.2, 1 ] } );

        /* arrow */
        const vertical_arrow_body = new two.Polyline( { positions: [ 0, 0, 0, 0.8 ], color: [ 1, 1, 1, 1 ] } );
        const horizontal_arrow_body = new two.Polyline( { positions: [ 0, 0, 0, 0 ], color: [ 1, 1, 1, 1 ] } );

        const vertical_arrow_head = new two.Triangle( { positions: [ - 0.02, 0.8 - 0.04, 0.02, 0.8 - 0.04, 0, 0.8 ], color: [ 1, 1, 1, 1 ] } );
        const horizontal_arrow_head = new two.Triangle( { positions: [ - 0.04, 0.02, - 0.04, - 0.02, 0, 0 ], color: [ 1, 1, 1, 1 ] } );

        /* ring */
        const ring_inside = new two.Ring( { center: [ 0, 0 ], radius: 0.8, segmentCount: 256, color: [ 0.7, 0.7, 1, 1 ] } );
        const ring_outside = new two.Ring( { center: [ 0, 0 ], radius: 0.8 + 2 / canvas.width, segmentCount: 256, color: [ 0.7, 0.7, 1, 1 ] } );

        /* anchor */
        const anchor_border = new two.Ring( { center: [ 0, 0.8 ], radius: 0.065, segmentCount: 32, color: [ 1, 1, 1, 1 ] } );
        const anchor_content = new two.Circle( { center: [ 0, 0.8 ], radius: 0.065, segmentCount: 32, color: [ 0, 0, 0, 1 ] } );

        /* render */
        const render = _ => renderer.render( [
            anchor_content,
            grid_line_1, grid_line_2, grid_line_3, grid_line_4, grid_line_5, grid_line_6,
            ring_inside,
            ring_outside,
            horizontal_arrow_body, horizontal_arrow_head,
            vertical_arrow_body, vertical_arrow_head,
            anchor_border,
        ] );

        /* observe */
        updateCanvasSize( canvas, canvas => {

            ring_outside.setRadius( 0.8 + 2 / canvas.width ); // 如果canvas不是正方形，那么ring_outside和ring_inside就有可能会出现“质壁分离”

            render();

        } );

        /* effect */
        createEffect( _ => {

            /*  */
            const radian = getRadian();
            const rotation = [ Math.sin( radian ), Math.cos( radian ) ];

            /*  */
            anchor_border.setRotation( [ ... rotation ] );
            anchor_content.setRotation( [ ... rotation ] );

            /*  */
            const offset_x = rotation[ 0 ] * 0.8;
            const offset_y = rotation[ 1 ] * 0.8;

            const offset_x_sign = Math.sign( offset_x ) || 1;
            const offset_y_sign = Math.sign( offset_y ) || 1;

            vertical_arrow_head.setPositions( [
                - 0.02 + offset_x, offset_y - 0.04 * offset_y_sign,
                0.02 + offset_x, offset_y - 0.04 * offset_y_sign,
                0 + offset_x, offset_y,
            ] );
            horizontal_arrow_head.setPositions( [
                offset_x - 0.04 * offset_x_sign, 0.02,
                offset_x - 0.04 * offset_x_sign, - 0.02,
                offset_x, 0,
            ] );

            vertical_arrow_body.setPositions( [ offset_x, 0, offset_x, offset_y ] );
            horizontal_arrow_body.setPositions( [ 0, 0, offset_x, 0 ] );

            /*  */
            render();

        } );

        /* animation */
        let is_blink = false;
        let prev_time = performance.now();

        requestAnimationFrame( function loop () {

            requestAnimationFrame( loop );

            const next_time = performance.now();

            if ( next_time - prev_time < 600 ) return;

            is_blink = ! is_blink;
            prev_time = next_time;

            anchor_content.setColor( is_blink ? [ 0.2, 0.2, 0.5, 1 ] : [ 0, 0, 0, 1 ] );

            render();

        } );

    } );

    /* jsx */
    return (
        <div
            class={ style.container }
            onWheel={ handleWheelEvent }
            onPointerUp={ handlePointerUpEvent }
            onPointerDown={ handlePointerDownEvent }
            onPointerMove={ handlePointerMoveEvent }
            onPointerEnter={ handlePointerEnterEvent }
            onPointerLeave={ handlePointerLeaveEvent }
        >
            <section>
                <canvas ref={ canvas }></canvas>
            </section>
            <section class={ style[ "axis-tag-container" ] }>
                <span>0</span>
                <span>-1</span>
                <span>+1</span>
                <span>-1</span>
                <span>+1</span>
            </section>
            <section class={ style[ "coordinate-container" ] }>
                { createX( getRadian() ) }
                { createY( getRadian() ) }
            </section>
        </div>
    );

    /* event handler */
    function handlePointerEnterEvent ( event ) {
        console.log( event.target );
        is_move_enabled = false;
        is_wheel_enabled = true;

    }

    function handlePointerLeaveEvent ( event ) {

        is_move_enabled = false;
        is_wheel_enabled = false;

    }

    function handlePointerUpEvent ( event ) {

        is_move_enabled = false;
        is_wheel_enabled = true;

    }

    function handlePointerDownEvent ( event ) {

        is_move_enabled = true;
        is_wheel_enabled = false;

        radian_snapshot = getRadian();
        [ base_x, base_y ] = [ event.clientX, event.clientY ];

    }

    function handlePointerMoveEvent ( event ) {

        if ( ! is_move_enabled ) return;

        const rect = canvas.getBoundingClientRect();
        const origin_position = [ ( rect.right + rect.left ) / 2, ( rect.top + rect.bottom ) / 2 ];
        const base_position = [ base_x, base_y ];
        const next_position = [ event.clientX, event.clientY ];

        const vector_a = [ base_position[ 0 ] - origin_position[ 0 ], origin_position[ 1 ] - base_position[ 1 ] ];
        const vector_b = [ next_position[ 0 ] - origin_position[ 0 ], origin_position[ 1 ] - next_position[ 1 ] ];

        const delta_degree = createClockwiseAngle( vector_a, vector_b );

        setRadian( delta_degree / 180 * Math.PI + radian_snapshot );

    }

    function handleWheelEvent ( event ) {

        event.preventDefault();
        event.stopPropagation();

        if ( ! is_wheel_enabled ) return;

        setRadian( getRadian() + Math.sign( event.deltaY ) * Math.PI / 180 );

    }

}

/**
 * 计算平面向量A到平面向量B的顺时针角度。
 * @param { number[] } v_a - 如[x, y]。
 * @param { number[] } v_b - 如[x, y]。
 * @returns { number } - 角度，单位为度，值域为[0, 360)。
 */
function createClockwiseAngle ( v_a, v_b ) {

    v_a = [ ... v_a ];
    v_b = [ ... v_b ];

    const cos_theta = calculateDotProduct( v_a, v_b ) / calculateNorm( v_a ) / calculateNorm( v_b );

    if ( isNumberEqual( cos_theta, 1 ) ) { return 0 }     // 处理共线情况
    if ( isNumberEqual( cos_theta, - 1 ) ) { return 180 } // 处理共线情况

    const theta = Math.acos( cos_theta );
    const z = calculateCrossProduct( v_a, v_b )[ 2 ];

    if ( z < 0 ) return theta / Math.PI * 180;
    if ( z > 0 ) return ( Math.PI * 2 - theta ) / Math.PI * 180;

    throw( new Error( "Error: Unexpected situation" ) );

    function calculateDotProduct ( v_a, v_b ) {

        return v_a[ 0 ] * v_b[ 0 ] + v_a[ 1 ] * v_b[ 1 ];

    }

    function calculateCrossProduct( v_a, v_b ){

        v_a = [ ... v_a, 0 ];
        v_b = [ ... v_b, 0 ];

        return [
            v_a[ 1 ] * v_b[ 2 ] - v_b[ 1 ] * v_a[ 2 ],
            v_b[ 0 ] * v_a[ 2 ] - v_a[ 0 ] * v_b[ 2 ],
            v_a[ 0 ] * v_b[ 1 ] - v_b[ 0 ] * v_a[ 1 ],
        ];

    }

    function calculateNorm ( v ) {

        return Math.hypot( ... v );

    }

    function isNumberEqual ( n_a, n_b ) {

        return Math.abs( n_a - n_b ) < Number.EPSILON;

    }

}

function createX ( angle ) {

    const bottom = "50%";
    const left = ( Math.sin( angle ) * 0.2 + 0.5 ) * 100 + "%";

    const value = Math.round( Math.sin( angle ) * 100 ) / 100;
    const text = ( value > 0 ? "+" : "" ) + value.toFixed( 2 );

    return <p style={ { bottom, left } }>{ text }</p>

}

function createY ( angle ) {

    const bottom = ( Math.cos( angle ) * 0.2 + 0.5 ) * 100 + "%";
    const left = ( Math.sin( angle ) * 0.4 + 0.5 ) * 100 + "%";

    const value = Math.round( Math.cos( angle ) * 100 ) / 100;
    const text = ( value > 0 ? "+" : "" ) + value.toFixed( 2 );

    return <p style={ { bottom, left } }>{ text }</p>;

}

/**
 * 创建position样式属性（关于x）。
 * @param { number } angle - 角度（弧度制）。
 * @returns { Object } - 关于position的样式对象。
 */
function createXPositionStyle ( angle ) {

    const top = "50%";
    const left = ( Math.sin( angle ) * 0.3 + 0.5 ) * 100 + "%";

    return { top, left };

}

export default UnitCircle;