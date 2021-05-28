import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCategoryModal from '../items/AddCategoryModal';
import { DeleteModal } from '../../../common/DeleteModal';

const useStyles = makeStyles((theme) => ({
    text: {
        textAlign: "left"
    }
  }));

export default function CategoryItem({icon, delCategory, category, updateCategories, onClick}) {
    const classes = useStyles();
    const [showDelModal, setShowDelModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    function onItemClick() {
        if(!category.edge) onClick();
    }

    return (
        <div>
            <ListItem
                button
                alignItems={"center"}
                >
                <ListItemText onClick={onItemClick} className={classes.text} primary={category.name} />
                <ListItemIcon onClick={()=>setShowEditModal(true)} >
                    <EditIcon/>
                </ListItemIcon>
                <ListItemIcon onClick={()=>setShowDelModal(true)} >
                    <DeleteIcon/>
                </ListItemIcon>
                <ListItemIcon onClick={onItemClick} >
                    {!category.edge && icon}
                </ListItemIcon>
            </ListItem>
            <DeleteModal
                open={showDelModal}
                setOpen={setShowDelModal}
                onDelete={delCategory}
                url={"business/category"}
                params={{catId : category._id}}
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
