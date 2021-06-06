import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));

function Clients() {
  
  const clients = useSelector(state=>state.general_reducer.clients)
  const dispatch = useDispatch()

  useEffect(()=>{
    fetchClients();
  },[])

  async function fetchClients(params) {
    try {
      const {data} = await API.get("business/getusers")
      dispatch(updateGeneralProps({
        key: CLIENTS,
        value: data.users
      }))
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className={"mainScreen"} >
        <ClientHeader/>
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

