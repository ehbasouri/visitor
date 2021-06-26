import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OrderItem from '../items/OrderItem';
import MainScreen from '../../../common/MainScreen';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../service/api';
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
      {/* <SearchInput/> */}
      {active_orders.map(order=>(
        <OrderItem key={order._id} order={order} onDetailsClick={onDetailsClick} />
      ))}
    </MainScreen>
  );
}

export default ActiveOrders;
