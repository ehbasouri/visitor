import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import OrderItem from '../items/OrderItem';
import { SearchInput } from '../../../common/SearchInput';
import MainScreen from '../../../common/MainScreen';
import fa from '../../../translation/fa';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../service/api';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    //   width: "100%"
  }
}));

function ActiveOrders({history}) {


  const classes = useStyles();
  const [value, setValue] = useState(1);
  const [orders, setOrders] = useState([]);
  const user_info = useSelector(state=>state.general_reducer.user_info)

  useEffect(()=>{
    fetchOrders()
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function fetchOrders() {
      const queries = {business_id : user_info._id }
      try {
          const {data} = await API.get("business/order", queries);
          setOrders(data);
      } catch (error) {
          console.log("error : ", error);
      }
  }

  console.log("value : ", value)

  function onDetailsClick(order_id) {
    history.push("/admin/archiveorderdetail/" + order_id);
    
  }

  return (
    <MainScreen>
      <SearchInput/>
      {orders.map(order=>(
        value === 1 && order.status === "active"  ?
        <OrderItem key={order._id} order={order} onDetailsClick={onDetailsClick} /> : null
      ))}
    </MainScreen>
  );
}

export default ActiveOrders;
