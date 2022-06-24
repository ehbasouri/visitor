import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { HOST } from '../../../service/api';
import TextField from '@material-ui/core/TextField';
import fa from '../../../translation/fa';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  count: {
      color: "#2e7d32"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  divider: {
      height: "3px",
      backgroundColor: "#666"
  },
  avatar: {
      borderRadius: 3,
      marginRight: "10px",
      marginLeft: "10px"
  }
}));

export default function ProductStoreItem({title, value, image}) {
  const classes = useStyles();
  return (
    <List dense className={classes.root}>
        <ListItem button>
            {image && <Avatar src={HOST + image} aria-label="recipe" className={classes.avatar} />}
            <ListItemText primary={title} />

            <ListItemSecondaryAction>
                <ListItemText className={classes.count} primary={value } />
            </ListItemSecondaryAction>
        </ListItem>
        <Divider className={classes.divider} />
    </List>
  );
}
