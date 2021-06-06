import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export function Header({
    title,
    backEnabled = true,
    rightComponent,
    leftComponent
}) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar variant="dense">
          {rightComponent}
          {backEnabled && <IconButton onClick={() => history.goBack()} edge="center" className={classes.menuButton} color="inherit" >
            <ArrowForwardIcon />
          </IconButton>}
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
          {leftComponent}
        </Toolbar>
      </AppBar>
    </div>
  );
}
