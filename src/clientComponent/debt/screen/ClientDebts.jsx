import React, {useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClientDebtItem from '../items/ClientDebtItem';
import AddButton from '../../../common/AddButton';
import ClientSceneWrapper from '../../../SceneWrapper/ClientSceneWrapper';
import MainScreen from '../../../common/MainScreen';
import { useState } from 'react';
import { useEffect } from 'react';
import { API } from '../../../service/api';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { CLIENTS } from '../../../consts';
import { debounce } from "../../../utils/debounce";
import { Header } from '../../../common/Header';
import fa from '../../../translation/fa';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));

function ClientDebts() {
  
  const [name, setName] = useState("")
  const user_info = useSelector(state=>state.general_reducer.user_info)
  const [debts, set_debts] = useState([]);
  const dispatch = useDispatch()

  useEffect(()=>{
      fetchClients();
  },[])

  async function fetchClients(searchValue) {
    const queries = {
        client_id: user_info._id
    }
    try {
      const {data} = await API.get("debt",queries);
      set_debts(data);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  const debounceCallback = useCallback(
    debounce((value) => {
      fetchClients(value)
    }, 500),
    []
  );

  function onSearchValueChange(event) {
      setName(event.target.value);
      debounceCallback(event.target.value)
  }

  return (
    <div className={"mainScreen"} >
        <Header title={fa["debt account"]} />
        <MainScreen>
          {debts.map(debt=>(
            <ClientDebtItem key={debt._id} debt={debt} />
          ))}
        </MainScreen>
        {/* <AddButton link={"addclient"} /> */}
    </div>
  );
}

export default ClientSceneWrapper(ClientDebts);

