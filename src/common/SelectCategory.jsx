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
    set_category
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [tree, setTree] = useState([{name: "root", _id: "1"}]);
  const [categories, setCategories] = useState([]);
  const [parId, setParId] = useState("1");

  useEffect(()=>{
    fetchCategories(parId);
  },[]);

  async function fetchCategories(parentId) {
    setLoading(true)
    try {
      const { data } = await API.get("/business/category",{
        parId : parentId
      })
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
