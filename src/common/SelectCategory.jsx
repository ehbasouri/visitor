import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SimpleBreadcrumbs from './SimpleBreadcrumbs';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { API } from '../service/api';
import SimpleBackdrop from './SimpleBackdrop';
import ReadOnlyCatItem from './ReadOnlyCatItem';
import SceneWrapper from '../SceneWrapper/SceneWrapper';
import MainScreen from './MainScreen';
import { useSelector } from 'react-redux';
import fa from '../translation/fa';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SelectCategory({
    set_category,
    client = false
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [tree, setTree] = useState([{name: fa["root"], _id: "1"}]);
  const [categories, setCategories] = useState([]);
  const [parId, setParId] = useState("1");
  const business = useSelector(state=>state.general_reducer.business)
  const cbrs = useSelector(state=>state.general_reducer.cbrs)

  useEffect(()=>{
    fetchCategories(parId);
  },[]);

  async function fetchCategories(parentId) {
    setLoading(true)
    const queries = {
      parId : parentId
    }
    if(client){
      queries.business_id = business._id
    }
    
    if(!cbrs[business._id]){

      queries.is_private = false
    } else if(!cbrs[business._id].show_private_products) {
        queries.is_private = cbrs[business._id].show_private_products ;
    }

    console.log("queries : ", queries);

    const url = client ? "category" : "/business/category";
    try {
      const { data } = await API.get(url,queries);
      setCategories(data);
    } catch (error) {
      console.log("error : ", error);
    }
    setLoading(false);
  }

    function onItemClick(category, index) {
        if(category.edge) {
            set_category(category);
            return
        }
        setParId(category._id);
        fetchCategories(category._id);
        if (index === undefined) {
        setTree([...tree, category]); 
        } else {
        removefromTree(category, index)
        }
    }

  function removefromTree(category, index) {
    const treeList = JSON.parse(JSON.stringify(tree));
    setTree(treeList.slice(0, index + 1))
  }

  return (
    <div className={"mainScreen"}>
        <MainScreen>          
          <SimpleBreadcrumbs onClick={onItemClick} tree={tree} />
          <List component="nav" aria-label="main mailbox folders">
          {categories.map(category=>(
            <ReadOnlyCatItem 
              onClick={()=>onItemClick(category)} 
              key={category._id} 
              category={category} 
              icon={<ArrowBackIosIcon />} 
            />
          ))}
          </List>
          <SimpleBackdrop
            open={loading}
            setOpen={setLoading}
          />
        </MainScreen>
    </div>
  );
}

export default SceneWrapper(SelectCategory)
