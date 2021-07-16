import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { API } from '../../../service/api';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { PACKAGES } from '../../../consts';
import {PackageCard} from "../../../common/PackageCard"
import { getRandomColor } from '../../../consts/randomColors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    overflow: "scroll",
    marginBottom: theme.spacing(2)
}
}));

function ClientPackages({business_id}) {
  
  const classes = useStyles();
  
  const packages = useSelector(state=>state.general_reducer.packages)
  const dispatch = useDispatch()

  useEffect(()=>{
      fetchPackages();
  },[])

  async function fetchPackages(searchValue) {
    const queries = {
        business_id
    }
    try {
      const {data} = await API.get("client/package", queries);
      dispatch(updateGeneralProps({
        key: PACKAGES,
        value: data
      }))
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className={classes.root} >
        {packages.map(item=>(
            <PackageCard link={"package/"} key={item._id} item={item} backgroundColor={getRandomColor()} />
        ))}
    </div>
  );
}

export default ClientPackages;

