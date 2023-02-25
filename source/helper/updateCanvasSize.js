/**
 * 自动更新<canvas>的width和height。
 * @param { HTMLCanvasElement } canvas - <canvas>。
 * @param { Function } [ handleResizeEvent ] - （可选）回调函数，它会在<canvas>更新完毕之后被执行，并接收<canvas>作为参数。
 */
export default function ( canvas, handleResizeEvent ) {

    const observer = new ResizeObserver( callback );

    observer.observe( canvas, { box: "content-box" } ); // Safari不支持device-pixel-content-box

    function callback ( entries ) {

        for ( const entry of entries ) {

            const software_pixel_width = entry.contentBoxSize[ 0 ].inlineSize; // Safari不支持devicePixelContentBoxSize
            const software_pixel_height = entry.contentBoxSize[ 0 ].blockSize; // Safari不支持devicePixelContentBoxSize

            const hardware_pixel_width = Math.round( software_pixel_width * globalThis.devicePixelRatio );
            const hardware_pixel_height = Math.round( software_pixel_height * globalThis.devicePixelRatio );

            canvas.width = hardware_pixel_width;
            canvas.height = hardware_pixel_height;

        }

        handleResizeEvent?.( canvas );

    }

}