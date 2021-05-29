import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import fa from '../../../translation/fa';
import { useEffect, useState } from 'react';
import { 
  Switch} from "react-router-dom";
import ActiveOrders from './ActiveOrders';
import ArchiveOrders from './ArchiveOrders';
import { PrivateBusinessRoute } from "../../../App/AppRouter";

function OrderRouter(params) {
    return(
        <Switch>
            <PrivateBusinessRoute path={"/admin/orders/active"} component={ActiveOrders} />
            <PrivateBusinessRoute path={"/admin/orders/archive"} component={ArchiveOrders} />
        </Switch>
    )
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function Orders({history}) {

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    console.log("value : ", value)
    value === 1 ?
    history.push("/admin/orders/active") : 
    history.push("/admin/orders/archive")
  },[value])

  return (
    <div className={"mainScreen"}>
      <AppBar >
        <Tabs 
          variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label={fa["archive"]} {...a11yProps(0)} />
          <Tab label={fa["active"]} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <OrderRouter/>
    </div>
  );
}

export default Orders;
