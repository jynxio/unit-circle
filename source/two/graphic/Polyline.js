import createPureColors from "../helper/createPureColors";
import createDiamondColors from "../helper/createDiamondColors";

/**
 * 构造器
 * @param { Object } option - 参数字典。
 * @param { number[] } option.positions - 2d坐标数组，比如[x_1, y_1, x_2, y_2]。
 * @param { number[] | string } - option.color - 颜色，rgba数组或"diamond"。
 * @returns { Object } - 实例。
 */
export default function ( { positions, color } ) {

    /*  */
    positions = [ ... positions ];

    /*  */
    const colors =
        Array.isArray( color ) ? createPureColors( positions.length / 2, [ ... color ] ) :
        color === "diamond" ? createDiamondColors( positions.length / 2 ) :
        new Error( "遭遇非法参数" );

    if ( colors instanceof Error ) throw colors;

    /*  */
    const rotation = [ 0, 1 ];

    /*  */
    this.getColors = _ => colors;
    this.getRotation = _ => rotation;
    this.getPositions = _ => positions;
    this.getDrawType = _ => "LINE_STRIP";
    this.getDrawCount = _ => positions.length / 2;

    this.setRotation = new_rotation => Object.assign( rotation, new_rotation );

}