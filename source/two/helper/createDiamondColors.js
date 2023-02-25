/**
 * 创建钻石色的colors。
 * @param { number } count - 颜色数量。
 * @returns { number[] } - 钻石色的colors。
 */
export default function ( count ) {

    const colors = [];

    for ( let i = 0; i < count; i ++ ) {

        colors.push( Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1, 1, )

    }

    return colors;

}