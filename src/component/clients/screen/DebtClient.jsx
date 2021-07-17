import React from 'react';
import MainScreen from '../../../common/MainScreen';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../service/api';
import { TotalItems } from "../../analytics/items/TotalItems" ;
import { useState } from 'react';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import { Header } from "../../../common/Header";
import { useParams } from 'react-router-dom';
import DebtItem from '../items/DebtItem';
import fa from '../../../translation/fa';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';
import numberWithCommas from '../../../utils/commaSeperator';

function DebtClient({history}) {
    let { id, client_name } = useParams();

  const user_info = useSelector(state=>state.general_reducer.user_info)
  const [debt, set_debt] = useState(null)
  const [paieds, set_paieds] = useState([])

  useEffect(()=>{
      fetchDebt()
      fetchOrders()
  },[])

  async function fetchDebt() {
      const queries = {
        business_id : user_info._id, 
        client_id: id
      }
      try {
          const {data} = await API.get("debt", queries);
          if(data && data.length > 0){
            set_debt(data[0]);
          }
      } catch (error) {
          console.log("error : ", error);
      }
  }

  async function fetchOrders() {
    const queries = {
      business_id : user_info._id, 
      client_id: id
    }
    try {
        const {data} = await API.get("paied", queries);
        if(data && data.length > 0){
          set_paieds(data);
        }
    } catch (error) {
        console.log("error : ", error);
    }
  }

  return (
  <div className={"mainScreen"}>
    <Header title={client_name} />
        {debt && <MainScreen>
            <TotalItems
                title={fa["debt amount"]}
                subTitle={converEnglishNumToPersian(numberWithCommas(debt.amount - debt.paied_amount)) + " " + fa["toman"]}
            />
            {paieds.map(debt=>(
                <DebtItem key={debt._id} debt={debt} client_name={client_name} />
            ))}
        </MainScreen>}
    </div>
  );
}

export default SceneWrapper(DebtClient);

