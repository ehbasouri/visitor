import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import fa from '../../../translation/fa';
import { useEffect, useState } from 'react';
import { 
  Switch} from "react-router-dom";
import ClientActiveOrders from './ClientActiveOrders';
import ClientArchiveOrders from './ClientArchiveOrders';
import { PrivateClientRoute } from "../../../App/AppRouter";

function ClientOrderRouter(params) {
    return(
        <Switch>
            <PrivateClientRoute path={"/orders/active"} component={ClientActiveOrders} />
            <PrivateClientRoute path={"/orders/archive"} component={ClientArchiveOrders} />
        </Switch>
    )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function ClientOrders({history}) {

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    newValue === 1 ?
    history.push("/orders/active") : 
    history.push("/orders/archive")
  };

  useEffect(()=>{
    if(history.location.pathname === "/orders/active"){
      setValue(1)
    }else if(history.location.pathname === "/orders/archive") {
      setValue(0)
    } else {
      history.push("/orders/active")
      setValue(1)
    }
  },[])

  return (
    <div className={"mainScreen"}>
      <AppBar >
        <Tabs 
          variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label={fa["archive"]} {...a11yProps(0)} />
          <Tab label={fa["active"]} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <ClientOrderRouter/>
    </div>
  );
}

export default ClientOrders;
