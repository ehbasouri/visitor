import React, {useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClientHeader from '../items/ClientHeader';
import ClientItem from '../items/ClientItem';
import AddButton from '../../../common/AddButton';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import MainScreen from '../../../common/MainScreen';
import { useState } from 'react';
import { useEffect } from 'react';
import { API } from '../../../service/api';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { CLIENTS } from '../../../consts';
import { debounce } from "../../../utils/debounce";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));

function Clients() {
  
  const [name, setName] = useState("")
  const user_info = useSelector(state=>state.general_reducer.user_info)
  const clients = useSelector(state=>state.general_reducer.clients)
  const dispatch = useDispatch()

  useEffect(()=>{
      fetchClients();
  },[])

  async function fetchClients(searchValue) {
    if(!user_info.is_active) return;
    const queries = {}
    if(searchValue) queries.name= searchValue;
    try {
      const {data} = await API.get("business/getusers",queries);
      dispatch(updateGeneralProps({
        key: CLIENTS,
        value: data.users
      }))
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
        <ClientHeader value={name} onChange={onSearchValueChange} />
        <MainScreen>
          {clients.map(user=>(
            <ClientItem key={user._id} user={user} />
          ))}
        </MainScreen>
        {/* <AddButton link={"addclient"} /> */}
    </div>
  );
}

export default SceneWrapper(Clients);

