import React from "react";
import {useHistory} from "react-router-dom";
import { Header } from "../../../common/Header";


export default function ClientOrderDetail(params) {

    const history = useHistory();
    
    return(
        <div className={"mainScreen"}>
            <Header/>
            <h1>
                OrderDetail Screen
            </h1>
            <button onClick={() => history.goBack()}>Go Back</button>
        </div>
    )
}