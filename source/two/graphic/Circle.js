import earcut from "earcut";
import createPureColors from "../helper/createPureColors";
import createDiamondColors from "../helper/createDiamondColors";

/**
 * 构造器
 * @param { Object } option - 参数字典。
 * @param { number[] } - option.center - 中心坐标。
 * @param { number } - option.radius - 半径。
 * @param { number } - option.segmentCount - 弧分的段数。
 * @param { number[] | string } - option.color - 颜色，rgba数组或"diamond"。
 * @returns { Object } - 实例。
 */
export default function ( { center, radius, segmentCount, color } ) {

    /*  */
    const segment_count = segmentCount;

    /*  */
    const outline_positions = [];
    const [ center_x, center_y ] = center;
    const angle_step = Math.PI * 2 / segment_count;

    for ( let i = segment_count; i > 0; i -- ) {

        const angle = angle_step * i;
        const x = Math.sin( angle ) * radius + center_x;
        const y = Math.cos( angle ) * radius + center_y;

        outline_positions.push( x, y );

    }

    const circle_indexes = earcut( outline_positions, undefined, 2 );
    const circle_positions = [];

    circle_indexes.forEach( index => circle_positions.push( outline_positions[ index * 2 ], outline_positions[ index * 2 + 1 ] ) );

    /*  */
    const colors =
        Array.isArray( color ) ? createPureColors( circle_positions.length / 2, [ ... color ] ) :
        color === "diamond" ? createDiamondColors( circle_positions.length / 2 ) :
        new Error( "遭遇非法参数" );

    if ( colors instanceof Error ) throw colors;

    /*  */
    const rotation = [ 0, 1 ];

    /*  */
    this.getColors = _ => colors;
    this.getRotation = _ => rotation;
    this.getPositions = _ => circle_positions;
    this.getDrawType = _ => "TRIANGLES";
    this.getDrawCount = _ => circle_positions.length / 2;

    this.setRotation = new_rotation => Object.assign( rotation, new_rotation );
    this.setColor = color => {

        const new_colors =
            Array.isArray( color ) ? createPureColors( circle_positions.length / 2, [ ... color ] ) :
            color === "diamond" ? createDiamondColors( circle_positions.length / 2 ) :
            new Error( "遭遇非法参数" );

        colors.length = 0;
        Object.assign( colors, new_colors );

    };

};