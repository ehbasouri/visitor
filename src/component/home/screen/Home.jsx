import React from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import Clients from "../../clients/screen/Clients";
import Orders from "../../orders/screen/Orders";
import Settings from "../../settings/screen/Settings";
import BottomTabbar from "../items/BottomTabbar";
import { 
  Switch,
  Route
} from "react-router-dom";
import { PrivateRoute } from "../../../App/AppRouter";

function Home(params) {
  const [value, setValue] = React.useState(2);

    return(
        <div>
            {/* {value === 2 && <Orders/>}
            {value === 1 && <Clients/>}
            {value === 0 && <Settings/>} */}
            <Switch>
                <PrivateRoute path={"/orders"} component={Orders} />
                <PrivateRoute path={"/clients"} component={Clients} />
                <PrivateRoute path={"/settings"} component={Settings} />
            </Switch>
            <BottomTabbar
                setValue={setValue}
                value={value}
            />
        </div>
    )
}

export default SceneWrapper(Home)