import React from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import { Header } from "../../../common/Header";

function AddClient(params) {
    return(
        <div className={"mainScreen"}>
            <Header/>
            <h1 className={"fontTest"} >
                سلام
            </h1>
            <h1 >
                سلام
            </h1>
        </div>
    )
}

export default SceneWrapper(AddClient);