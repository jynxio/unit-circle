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
    const positions = [];
    const [ center_x, center_y ] = center;
    const angle_step = Math.PI * 2 / segment_count;

    for ( let i = 0; i < segment_count; i ++ ) {

        const angle = angle_step * i;
        const x = Math.sin( angle ) * radius + center_x;
        const y = Math.cos( angle ) * radius + center_y;

        positions.push( x, y );

    }

    /*  */
    const colors =
        Array.isArray( color ) ? createPureColors( segment_count, [ ... color ] ) :
        color === "diamond" ? createDiamondColors( segment_count ) :
        new Error( "遭遇非法参数" );

    if ( colors instanceof Error ) throw colors;

    /*  */
    const rotation = [ 0, 1 ];

    /*  */
    this.getColors = _ => colors;
    this.getRotation = _ => rotation;
    this.getPositions = _ => positions;
    this.getDrawType = _ => "LINE_LOOP";
    this.getDrawCount = _ => positions.length / 2;

    this.setRotation = new_rotation => Object.assign( rotation, new_rotation );
    this.setRadius = new_radius => {

        positions.forEach( ( item, index, self ) => {

            const offset = index % 2 === 0 ? center_x : center_y;

            self[ index ] = ( item - offset ) / radius * new_radius + offset;

        } );

    };

};