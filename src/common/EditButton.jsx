import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Link
} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(10),
    left: theme.spacing(2),
  }
}));

export default function EditButton({onClick, icon = <EditIcon/>}) {
  const classes = useStyles();

  return (
        <Fab onClick={onClick} aria-label={"Add"} className={classes.fab} color={"primary"}>
            {icon}
        </Fab>
  );
}

