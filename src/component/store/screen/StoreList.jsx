import React from 'react';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import MainScreen from '../../../common/MainScreen';
import { useState } from 'react';
import { useEffect } from 'react';
import { API } from '../../../service/api';
import { Header } from '../../../common/Header';
import AddButton from '../../../common/AddButton';
import StoreItem from '../items/StoreItem';

function StoreList() {
  const [stores, setStores] = useState(null);

  useEffect(()=>{
    fetchClients();
  },[])

  async function fetchClients(params) {
    try {
      const {data} = await API.get("business/store")
      setStores(data);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  function onDelete(deletedStore) {
      const updatedStores = JSON.parse(JSON.stringify(stores));
      const result = updatedStores.filter(element=>element._id !== deletedStore._id);
      setStores(result);
  }

  return (
    <div className={"mainScreen"} >
        <Header/>
        <MainScreen>
          {stores && stores.map(store=>(
            <StoreItem key={store._id} store={store} onDelete={onDelete} />
          ))}
        </MainScreen>
        {stores && stores.length === 0 &&<AddButton link={"addstore"} />}
    </div>
  );
}

export default SceneWrapper(StoreList);

