import React from 'react';
import MainScreen from '../../../common/MainScreen';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../service/api';
import { TotalItems } from "../../../component/analytics/items/TotalItems" ;
import { useState } from 'react';
import ClientSceneWrapper from '../../../SceneWrapper/ClientSceneWrapper';
import { Header } from "../../../common/Header";
import { useParams } from 'react-router-dom';
import DebtItem from "../../../component/clients/items/DebtItem";
import fa from '../../../translation/fa';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';
import numberWithCommas from '../../../utils/commaSeperator';

function DebtDetailes({history}) {
    let { id, business_name } = useParams();

  const user_info = useSelector(state=>state.general_reducer.user_info)
  const [debt, set_debt] = useState(null)
  const [paieds, set_paieds] = useState([])

  useEffect(()=>{
    fetchData()
  },[])

  function fetchData() {
    fetchDebt()
    fetchPaieds()
  }

  async function fetchDebt() {
      const queries = {
        client_id : user_info._id, 
        business_id: id
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

  async function fetchPaieds() {
    const queries = {
      client_id : user_info._id, 
      business_id: id
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
    <Header title={business_name} />
        {debt && <MainScreen>
            <TotalItems
                title={fa["debt amount"]}
                subTitle={converEnglishNumToPersian(numberWithCommas(debt.amount - debt.paied_amount)) + " " + fa["toman"]}
            />
            {paieds.map(debt=>(
                <DebtItem url={"/archiveorderdetail/"} key={debt._id} debt={debt} business_name={business_name} />
            ))}
        </MainScreen>} 
    </div>
  );
}

export default ClientSceneWrapper(DebtDetailes);

