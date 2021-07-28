import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { API } from '../../../service/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateGeneralProps } from "../../../redux/actions";
import { DEBTS } from '../../../consts';

function useDebt() {
  
  const user_info = useSelector(state=>state.general_reducer.user_info)
  const debts = useSelector(state=>state.general_reducer.debts)
  const [total_debt, set_total_debt] = useState(0);
  const dispatch = useDispatch()

  useEffect(()=>{
      fetchClients();
  },[])

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
    total_debt
  }
}

export {useDebt}

