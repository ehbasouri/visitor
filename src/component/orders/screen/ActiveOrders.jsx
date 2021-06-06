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
import SimpleBackdrop from '../../../common/SimpleBackdrop';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { ACTIVE_ORDERS } from '../../../consts';

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

  const user_info = useSelector(state=>state.general_reducer.user_info)
  const active_orders = useSelector(state=>state.general_reducer.active_orders)

  const dispatch = useDispatch()

  useEffect(()=>{
    fetchOrders()
  },[])

  async function fetchOrders() {
      const queries = {business_id : user_info._id, status: "active" }
      try {
          const {data} = await API.get("business/order", queries);
          dispatch(updateGeneralProps({
            key: ACTIVE_ORDERS,
            value: data
          }))
      } catch (error) {
          console.log("error : ", error);
      }
  }

  function onDetailsClick(order_id, cancel) {
    if(!cancel) {
      history.push("/admin/archiveorderdetail/" + order_id)
    }else {
      fetchOrders()
    }
  }

  return (
    <MainScreen>
      <SearchInput/>
      {active_orders.map(order=>(
        <OrderItem key={order._id} order={order} onDetailsClick={onDetailsClick} />
      ))}
    </MainScreen>
  );
}

export default ActiveOrders;
