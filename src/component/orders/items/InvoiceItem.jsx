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
import numberWithCommas from '../../../utils/commaSeperator';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    paddingBottom: theme.spacing(3),
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
    <div >
      <List dense className={classes.root}>
            <ListItem className={classes.container} button>
              <ListItemText id={"text-to-print"} disableTypography primary={product.name} />

              <ListItemSecondaryAction>
                  <ListItemText id={"text-to-print"} disableTypography className={classes.count} primary={converEnglishNumToPersian(product.countInBasket) + " " + fa["number"]  } />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider/>
            <ListItem className={classes.container} button>
              <ListItemText id={"text-to-print"} disableTypography className={classes.title} primary={fa["Unit price"]} />

              <ListItemSecondaryAction>
                  <ListItemText id={"text-to-print"} disableTypography className={classes.price} primary={converEnglishNumToPersian(numberWithCommas(product.price)) + " " + fa["toman"] } />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider/>
            <ListItem className={classes.container} button>
              <ListItemText id={"text-to-print"} disableTypography className={classes.title} primary={fa["price"]} />

              <ListItemSecondaryAction>
                  <ListItemText id={"text-to-print"} disableTypography className={classes.price} primary={ converEnglishNumToPersian(numberWithCommas(product.countInBasket * product.price)) + " " + fa["toman"] } />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider className={classes.divider} />
      </List>
    </div>
  );
}
