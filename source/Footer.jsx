import { onMount } from "solid-js";

import style from "./Footer.module.css";

export default function () {

    let span;

    onMount( _ => {

        ( function loop () {

            span.style.setProperty( "animation-name", "none" );

            setTimeout( _ => {

                span.style.setProperty( "animation-name", style.scale );
                span.style.setProperty( "top", Math.random() * 120 - 30 + "%" );
                span.style.setProperty( "left", Math.random() * 120 - 30 + "%" );

            }, 10 );

            setTimeout( loop, 2000 );

        } )();

    } );

    return (
        <footer class={ style.footer }>
            <address>{ "Made with " }
                <a href="https://www.solidjs.com/" target="_blank">
                    WebGL
                    <span ref={ span }>✨</span>
                </a>
            </address>
            <hr/>
            <address>
                <a href="https://github.com/jynxio/unit-circle" target="_blank">Source code</a>
            </address>
        </footer>
    );

}