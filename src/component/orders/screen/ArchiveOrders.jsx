import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SearchInput } from '../../../common/SearchInput';
import MainScreen from '../../../common/MainScreen';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../service/api';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { ARCHIVE_ORDERS } from '../../../consts';
import ArchiveOrder from '../items/ArchiveOrder';

function ArchiveOrders({history}) {

  const user_info = useSelector(state=>state.general_reducer.user_info)
  const archive_orders = useSelector(state=>state.general_reducer.archive_orders)

  const dispatch = useDispatch()

  useEffect(()=>{
      fetchOrders()
  },[])

  async function fetchOrders() {
      const queries = {
        business_id : user_info._id, 
        status: "archive",
        // page: 20,
        // limit: 10
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

  return (
    <MainScreen>
      {/* <SearchInput/> */}
      {archive_orders.map(order=>(
        <ArchiveOrder key={order._id} order={order} onDetailsClick={onDetailsClick} />
      ))}
    </MainScreen>
  );
}

export default ArchiveOrders;

