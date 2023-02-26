import style from "./App.module.css";

import UnitCircle from "./UnitCircle";
import Footer from "./Footer";

export default function () {

    return (
        <>
            <div class={ style.container }>
                <UnitCircle/>
            </div>
            <Footer/>
        </>
    );

}