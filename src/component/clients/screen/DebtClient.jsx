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
import AddDebtPaiedModal from "../items/AddDebtPaiedModal"
import EditButton from "../../../common/EditButton";

function DebtClient({history}) {
    let { id, client_name } = useParams();

  const user_info = useSelector(state=>state.general_reducer.user_info)
  const [debt, set_debt] = useState(0)
  const [paieds, set_paieds] = useState([])
  const [showAddModal, setShowAddModal] = useState(false);
  const [client_detailes, set_client_detailes] = useState({})

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(()=>{
    fetchUser();
  },[])

  async function fetchUser() {
      try {
          const {data} = await API.get("business/getusers",{_id: id});
          set_client_detailes(data.users[0]);
      } catch (error) {
          console.log("error : ", error)
      }
  }

  function fetchData() {
    fetchPaieds()
  }

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

  async function fetchPaieds() {
    const queries = {
      business_id : user_info._id, 
      client_id: id
    }
    try {
        const {data} = await API.get("paied", queries);

        let total_debt = 0;
        data.map(element=>{
          total_debt = element.is_debt ?  total_debt + element.amount : total_debt - element.amount
        })
        set_debt(total_debt);

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
        {paieds && <MainScreen>
            <TotalItems
                title={fa["debt amount"]}
                subTitle={converEnglishNumToPersian(numberWithCommas(debt)) + " " + fa["toman"]}
            />
            {paieds.map(debt=>(
                <DebtItem key={debt._id} debt={debt} client_name={client_name} />
            ))}
        </MainScreen>} 
          <AddDebtPaiedModal 
            open={showAddModal}
            setOpen={setShowAddModal}
            business_id = {user_info._id}
            client_id= {id}
            fetchData={fetchData}
            client={client_detailes}
            business={user_info}
          />
        <EditButton 
          onClick={()=>setShowAddModal(true)} 
        />
    </div>
  );
}

export default SceneWrapper(DebtClient);

