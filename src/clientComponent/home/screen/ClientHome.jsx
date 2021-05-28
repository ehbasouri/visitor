import React from "react";
import ClientSceneWrapper from "../../../SceneWrapper/ClientSceneWrapper";
import ClientBottomTabbar from "../items/ClientBottomTabbar";
import { 
  Switch,
} from "react-router-dom";
import { PrivateClientRoute } from "../../../App/AppRouter";
import ClientOrders from "../../orders/screen/ClientOrders";
import ClientSettings from "../../settings/screen/ClientSettings";
import ClientProducts from "../../products/screen/ClientProducts";

function ClientHomeRouter(params) {
    return(
        <Switch>
            <PrivateClientRoute path={"/products"} component={ClientProducts} />
            <PrivateClientRoute path={"/orders"} component={ClientOrders} />
            <PrivateClientRoute path={"/settings"} component={ClientSettings} />
        </Switch>
    )
}

 

function ClientHome() {
  const [value, setValue] = React.useState(2);

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