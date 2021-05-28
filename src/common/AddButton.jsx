import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Link
} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';


const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(10),
    left: theme.spacing(2),
  }
}));

export default function AddButton({link, icon = <AddIcon/>}) {
  const classes = useStyles();

  return (
        <Fab aria-label={"Add"} className={classes.fab} color={"primary"}>
          <Link style={{color: "#fff"}} to={link} >
            {icon}
          </Link>
        </Fab>
  );
}

