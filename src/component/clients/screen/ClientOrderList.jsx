import React from 'react';
import MainScreen from '../../../common/MainScreen';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../service/api';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { ARCHIVE_ORDERS, FROM_DATE, TO_DATE } from '../../../consts';
import ArchiveOrder from "../../orders/items/ArchiveOrder" ;
import { MyRangeDatePicker } from '../../../common/MyRangeDatePicker';
import { useState } from 'react';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import { Header } from "../../../common/Header";
import { useParams } from 'react-router-dom';

function ClientOrderList({history}) {
    let { id } = useParams();

  const user_info = useSelector(state=>state.general_reducer.user_info)
  const [archive_orders, set_archive_orders] = useState([])
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)

  useEffect(()=>{
      fetchOrders()
  },[fromDate, toDate])

  async function fetchOrders() {
      const queries = {
        business_id : user_info._id, 
        status: "archive",
        client_id: id
        // page: 20,
        // limit: 10
      }
      if(fromDate && toDate){
        queries.fromDate = fromDate
        queries.toDate = toDate
      }
      try {
          const {data} = await API.get("business/order", queries);
          set_archive_orders(data)
      } catch (error) {
          console.log("error : ", error);
      }
  }

  function onDetailsClick(order_id, cancel) {
    if(!cancel) history.push("/admin/archiveorderdetail/" + order_id);
    else fetchOrders()
  }

  function setFilterDate({start, end}) {
    setFromDate(start)
    setToDate(end)
  }

  return (
  <div className={"mainScreen"}>
    <Header/>
        <MainScreen>
        <MyRangeDatePicker
            setFilterDate={setFilterDate}
        />
        {/* <SearchInput/> */}
        {archive_orders.map(order=>(
            <ArchiveOrder key={order._id} order={order} onDetailsClick={onDetailsClick} />
        ))}
        </MainScreen>
    </div>
  );
}

export default SceneWrapper(ClientOrderList);

