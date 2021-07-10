import React from "react";
import ClientSceneWrapper from "../../../SceneWrapper/ClientSceneWrapper";
import ClientBottomTabbar from "../items/ClientBottomTabbar";
import { 
  Switch,
  Route
} from "react-router-dom";
import ClientOrders from "../../orders/screen/ClientOrders";
import ClientSettings from "../../settings/screen/ClientSettings";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Business from "../../business/screen/Business";

function ClientHomeRouter(params) {
    return(
        <Switch>
            <Route path={"/business"} component={Business} /> 
            <Route path={"/orders"} component={ClientOrders} />
            <Route path={"/settings"} component={ClientSettings} />
        </Switch>
    )
}

 

function ClientHome({history}) {
  const [value, setValue] = React.useState(2);

  const user_info = useSelector(state=>state.general_reducer.user_info)


    useEffect(()=>{
        if(user_info && !user_info.mobile){
            history.push("/updateuserinfo")
        }
    },[user_info])

    useEffect(()=>{
        console.log("history : ", history.location.pathname);
        if(history.location.pathname === "/"){
            console.log("goto business")
            history.push("/business")
        }
    },[history.location.pathname])

    return(
        <div>
            <ClientHomeRouter/>
            <ClientBottomTabbar
                setValue={setValue}
                value={value}
            />
        </div>
    )
}

export default ClientSceneWrapper(ClientHome)