import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SimpleBreadcrumbs from '../items/SimpleBreadcrumbs';
import { Header } from '../../../common/Header';
import CategoryItem from '../items/CategoryItem';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import { API } from '../../../service/api';
import AddCategoryModal from '../items/AddCategoryModal';
import SimpleBackdrop from '../../../common/SimpleBackdrop';
import DeleteCategoryModal from '../items/DeleteCategoryModal';
import Button from '@material-ui/core/Button';
import MainScreen from '../../../common/MainScreen';

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

function Categories() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [tree, setTree] = useState([{name: "root", _id: "1"}]);
  const [categories, setCategories] = useState([]);
  const [parId, setParId] = useState("1");
  const [showAddModal, setShowAddModal] = useState(false);

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

  function handleOpenModal() {
    setShowAddModal(true);
  }

  function addCategories(newCat) {
    setCategories([...categories, newCat]);
  }

  function delCategory(delCat) {
    const catList = JSON.parse(JSON.stringify(categories));
    const updatedLidt = catList.filter(item=>item._id != delCat._id);
    setCategories(updatedLidt);
  }

  function onItemClick(category, index) {
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

  function updateCategories(category) {
    const catList = JSON.parse(JSON.stringify(categories));
    const catIndex = catList.findIndex(item=>item._id === category._id);
    catList[catIndex] = category;
    setCategories(catList);
  }

  return (
    <div className={"mainScreen"}>
        <Header/>
        <MainScreen>
          <SimpleBreadcrumbs onClick={onItemClick} tree={tree} />
          <List component="nav" aria-label="main mailbox folders">
          {categories.map(category=>(
            <CategoryItem 
              onClick={()=>onItemClick(category)} 
              key={category._id} 
              category={category} 
              icon={<ArrowBackIosIcon />} 
              delCategory={delCategory}
              updateCategories={updateCategories}
            />
          ))}
          <Button
              loa
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleOpenModal}
          >
              {"Add New"}
          </Button>
          </List>
        </MainScreen>
        <AddCategoryModal
          open={showAddModal}
          setOpen={setShowAddModal}
          parId={parId}
          addCategories={addCategories}
        />
        <SimpleBackdrop
          open={loading}
          setOpen={setLoading}
        />
    </div>
  );
}

export default SceneWrapper(Categories)
