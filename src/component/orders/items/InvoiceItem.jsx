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
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  count: {
      color: "#bf360c"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  divider: {
      color: "red",
      backgroundColor: "#666",
      height: "3px"
  },
  title: {
      color: "#666"
  },
  price: {
      color: "#009688"
  }
}));

export default function InvoiceIrem({product}) {
  const classes = useStyles();
  return (
    <List dense className={classes.root}>
          <ListItem button>
            <ListItemText primary={product.name} />

            <ListItemSecondaryAction>
                <ListItemText className={classes.count} primary={product.countInBasket + " " + fa["number"]  } />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider/>
          <ListItem button>
            <ListItemText className={classes.title} primary={fa["Unit price"]} />

            <ListItemSecondaryAction>
                <ListItemText className={classes.price} primary={product.price + " " + fa["toman"] } />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider/>
          <ListItem button>
            <ListItemText className={classes.title} primary={fa["price"]} />

            <ListItemSecondaryAction>
                <ListItemText className={classes.price} primary={ product.countInBasket * product.price + " " + fa["toman"] } />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider className={classes.divider} />
    </List>
  );
}
