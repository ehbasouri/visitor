import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { API } from '../../../service/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateGeneralProps } from "../../../redux/actions";
import { DEBTS, PAIED_OBJECT } from '../../../consts';

function useDebt() {
  
  const user_info = useSelector(state=>state.general_reducer.user_info)
  const debts = useSelector(state=>state.general_reducer.debts)
  const paiedObject = useSelector(state=>state.general_reducer.paiedObject)
  const [total_debt, set_total_debt] = useState(0);
  const dispatch = useDispatch()

  useEffect(()=>{
      fetchClients();
      fetchPaieds();
  },[])


  async function fetchPaieds() {
    const queries = {
      business_id : user_info._id
    }
    const result = {};
    try {
        const {data} = await API.get("paied", queries);
        data.map(element=>{
          if (result[element.client_id]) {
            result[element.client_id] = element.is_debt ?  result[element.client_id] + element.amount : result[element.client_id] - element.amount
          } else {
            result[element.client_id] = element.is_debt ? element.amount : 0 - element.amount
          }
        })
        dispatch(updateGeneralProps({
          key: PAIED_OBJECT,
          value: result
        }))
    } catch (error) {
        console.log("error : ", error);
    }
  }

  function getClientTotalDebt(client_id) {
    if (paiedObject[client_id]) {
      return paiedObject[client_id]
    }
    return 0;
  }

  async function fetchClients(searchValue) {
    const queries = {
        business_id: user_info._id
    }
    try {
      const {data} = await API.get("debt",queries);
      dispatch(updateGeneralProps({
          key: DEBTS,
          value: data
      }))
      set_total_debt(getTotalDebt(data));
    } catch (error) {
      console.log("error : ", error);
    }
  }

  function getTotalDebt(items = []) {
    var result = 0;
    items.map(item=>result = result + item.amount - item.paied_amount)
    return result;
  }

  return {
    debts,
    total_debt,
    getClientTotalDebt
  }
}

export {useDebt}

