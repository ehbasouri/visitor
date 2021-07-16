import React, {useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddButton from '../../../common/AddButton';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import MainScreen from '../../../common/MainScreen';
import { useState } from 'react';
import { useEffect } from 'react';
import { API } from '../../../service/api';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { CLIENTS, PACKAGES } from '../../../consts';
import { debounce } from "../../../utils/debounce";
import { Header } from "../../../common/Header";
import {PackageCard} from "../../../common/PackageCard"
import fa from '../../../translation/fa';
import { getRandomColor } from '../../../consts/randomColors';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));

function Packages() {
  
  const [name, setName] = useState("")
  const user_info = useSelector(state=>state.general_reducer.user_info)
  const packages = useSelector(state=>state.general_reducer.packages)
  const dispatch = useDispatch()

  useEffect(()=>{
      fetchPackages();
  },[])

  async function fetchPackages(searchValue) {
    if(!user_info.is_active) return;
    const queries = {
        business_id: user_info._id
    }
    if(searchValue) queries.name= searchValue;
    try {
      const {data} = await API.get("business/package", queries);
      dispatch(updateGeneralProps({
        key: PACKAGES,
        value: data
      }))
    } catch (error) {
      console.log("error : ", error);
    }
  }

  const debounceCallback = useCallback(
    debounce((value) => {
      fetchPackages(value)
    }, 500),
    []
  );

  function onDeleteProduct(delCat) {
    const productList = JSON.parse(JSON.stringify(packages));
    const updatedLidt = productList.filter(item=>item._id != delCat._id);
    dispatch(updateGeneralProps({
        key: PACKAGES,
        value: updatedLidt
    }))
}

  return (
    <div className={"mainScreen"} >
        <Header title={fa["package"]} />
        <MainScreen>
            {packages.map(item=>(
                <PackageCard onDeleteProduct={onDeleteProduct} admin key={item._id} item={item} backgroundColor={getRandomColor()} />
            ))}
        </MainScreen>
        <AddButton link={"addpackage"} />
    </div>
  );
}

export default SceneWrapper(Packages);

