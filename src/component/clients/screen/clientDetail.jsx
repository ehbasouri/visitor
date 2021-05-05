import React from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import { Header } from "../../common/Header";

function ClientDetail(params) {
    return(
        <div className={"mainScreen"}>
            <Header/>
            <h1>
                ClientDetail Screen
            </h1>
        </div>
    )
}

export default SceneWrapper(ClientDetail);