import React from 'react';
import MainScreen from '../../../common/MainScreen';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../service/api';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { ARCHIVE_ORDERS, FROM_DATE, TO_DATE } from '../../../consts';
import ArchiveOrder from '../items/ArchiveOrder';
import OrderItem from '../items/OrderItem';
import { MyRangeDatePicker } from '../../../common/MyRangeDatePicker';
import { useState } from 'react';

function ArchiveOrders({history}) {

  const user_info = useSelector(state=>state.general_reducer.user_info)
  const archive_orders = useSelector(state=>state.general_reducer.archive_orders)
  const fromDate = useSelector(state=>state.general_reducer.fromDate)
  const toDate = useSelector(state=>state.general_reducer.toDate)

  const dispatch = useDispatch()

  useEffect(()=>{
      fetchOrders()
  },[fromDate, toDate])

  async function fetchOrders() {
      const queries = {
        business_id : user_info._id, 
        status: "archive"
        // page: 20,
        // limit: 10
      }
      if(fromDate && toDate){
        queries.fromDate = fromDate
        queries.toDate = toDate
      }
      try {
          const {data} = await API.get("business/order", queries);
          dispatch(updateGeneralProps({
            key: ARCHIVE_ORDERS,
            value: data
          }))
      } catch (error) {
          console.log("error : ", error);
      }
  }

  function onDetailsClick(order_id, cancel) {
    if(!cancel) history.push("/admin/archiveorderdetail/" + order_id);
    else fetchOrders()
  }

  function setFilterDate({start, end}) {
    dispatch(updateGeneralProps([
      {
        key: FROM_DATE,
        value: start
      },{
        key: TO_DATE,
        value: end
      }
    ]))
  }

  return (
    <MainScreen>
      <MyRangeDatePicker
        setFilterDate={setFilterDate}
      />
      {/* <SearchInput/> */}
      {archive_orders.map(order=>(
        <ArchiveOrder key={order._id} order={order} onDetailsClick={onDetailsClick} />
      ))}
    </MainScreen>
  );
}

export default ArchiveOrders;

