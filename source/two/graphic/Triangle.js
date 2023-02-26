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
        Array.isArray( color ) ? createPureColors( 3, [ ... color ] ) :
        color === "diamond" ? createDiamondColors( 3 ) :
        new Error( "遭遇非法参数" );

    if ( colors instanceof Error ) throw colors;

    /*  */
    const rotation = [ 0, 1 ];

    /*  */
    this.getColors = _ => colors;
    this.getRotation = _ => rotation;
    this.getPositions = _ => positions;
    this.getDrawType = _ => "TRIANGLES";
    this.getDrawCount = _ => 3;

    this.setRotation = new_rotation => Object.assign( rotation, new_rotation );
    this.setPositions = new_positions => {

        positions.length = 0;

        Object.assign( positions, new_positions );

    };
    this.setColor = color => {

        const new_colors =
            Array.isArray( color ) ? createPureColors( 3, [ ... color ] ) :
            color === "diamond" ? createDiamondColors( 3 ) :
            new Error( "遭遇非法参数" );

        colors.length = 0;
        Object.assign( colors, new_colors );

    };

}