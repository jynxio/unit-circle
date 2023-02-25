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
        Array.isArray( color ) ? createPureColors( segment_count, [ ... color ] ) :
        color === "diamond" ? createDiamondColors( segment_count ) :
        new Error( "遭遇非法参数" );

    if ( colors instanceof Error ) throw colors;

    /*  */
    this.getColors = _ => colors;
    this.getPositions = _ => positions;
    this.getDrawType = _ => "LINE_STRIP";
    this.getDrawCount = _ => positions.length / 2;

}