import React, {useEffect} from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import Clients from "../../clients/screen/Clients";
import Orders from "../../orders/screen/Orders";
import Settings from "../../settings/screen/Settings";
import BottomTabbar from "../items/BottomTabbar";
import { 
  Switch,
  Route
} from "react-router-dom";
import { PrivateBusinessRoute } from "../../../App/AppRouter";
import { useSelector } from "react-redux";

function HomeRouter(params) {
    return(
        <Switch>
            <PrivateBusinessRoute path={"/admin/orders"} component={Orders} />
            <PrivateBusinessRoute path={"/admin/clients"} component={Clients} />
            <PrivateBusinessRoute path={"/admin/settings"} component={Settings} />
        </Switch>
    )
}

 

function Home({history}) {
  const [value, setValue] = React.useState(2);

  const user_info = useSelector(state=>state.general_reducer.user_info)


    useEffect(()=>{
        if(user_info && !user_info.mobile){
            history.push("/admin/updateuserinfo")
        }
    },[user_info])

    return(
        <div>
            <HomeRouter/>
            <BottomTabbar
                setValue={setValue}
                value={value}
            />
        </div>
    )
}

export default SceneWrapper(Home, "lg")