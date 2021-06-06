import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DeleteModal } from '../../../common/DeleteModal';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    text: {
        textAlign: "left"
    }
  }));

export default function StoreItem({onDelete, store}) {

    const history = useHistory()

    const classes = useStyles();
    const [showDelModal, setShowDelModal] = useState(false);

    function onEdit() {
        history.push("/admin/updateStore/" + store.name + "/" + store._id)
    }

    return (
        <div>
            <ListItem
                button
                alignItems={"center"}
                >
                <ListItemText className={classes.text} primary={store.name} />
                <ListItemIcon onClick={onEdit} >
                    <EditIcon/>
                </ListItemIcon>
                <ListItemIcon onClick={()=>setShowDelModal(true)} >
                    <DeleteIcon/>
                </ListItemIcon>
            </ListItem>
            <DeleteModal
                open={showDelModal}
                setOpen={setShowDelModal}
                onDelete={onDelete}
                url={"business/store"}
                params={{id : store._id}}
            />
        </div>
    );
}
