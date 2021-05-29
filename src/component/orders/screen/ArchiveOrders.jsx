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
import ArchiveOrder from '../items/ArchiveOrder';

function ArchiveOrders({history}) {

  const [orders, setOrders] = useState([]);
  const user_info = useSelector(state=>state.general_reducer.user_info)

  useEffect(()=>{
    fetchOrders()
  },[])


  async function fetchOrders() {
      const queries = {business_id : user_info._id }
      try {
          const {data} = await API.get("business/order", queries);
          console.log("data :  : ", data)
          setOrders(data);
      } catch (error) {
          console.log("error : ", error);
      }
  }

  return (
      <MainScreen>
        <SearchInput/>
        {orders.map(order=>(
          ( order.status !== "active" ?<ArchiveOrder key={order._id} order={order} /> : null)
        ))}
      </MainScreen>
  );
}

export default ArchiveOrders;
