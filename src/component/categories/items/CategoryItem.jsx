import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteCategoryModal from './DeleteCategoryModal';
import AddCategoryModal from '../items/AddCategoryModal';

const useStyles = makeStyles((theme) => ({
    text: {
        textAlign: "left"
    }
  }));

export default function CategoryItem({icon, delCategory, category, updateCategories, onClick}) {
    const classes = useStyles();
    const [showDelModal, setShowDelModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <div>
            <ListItem
                button
                alignItems={"center"}
                >
                <ListItemText onClick={onClick} className={classes.text} primary={category.name} />
                <ListItemIcon onClick={()=>setShowEditModal(true)} >
                    <EditIcon/>
                </ListItemIcon>
                <ListItemIcon onClick={()=>setShowDelModal(true)} >
                    <DeleteIcon/>
                </ListItemIcon>
                <ListItemIcon onClick={onClick} >
                    {icon}
                </ListItemIcon>
            </ListItem>
            <DeleteCategoryModal
                open={showDelModal}
                setOpen={setShowDelModal}
                catId={category._id}
                delCategory={delCategory}
            />
            <AddCategoryModal
              open={showEditModal}
              setOpen={setShowEditModal}
              category={category}
              updateCategories={updateCategories}
            />
        </div>
    );
}
