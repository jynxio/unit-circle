/**
 * 创建纯色的colors。
 * @param { number } count - 颜色数量。
 * @param { number[] } color - 纯色的rgba数组，如[1, 1, 1, 1]。
 * @returns { number[] } - 纯色的colors。
 */
export default function ( count, color ) {

    const colors = [];

    for ( let i = 0; i < count; i ++ ) {

        colors.push( ... color );

    }

    return colors;

}