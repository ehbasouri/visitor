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
import { AddOrRemoveItemButton } from './AddOrRemoveItemButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  count: {
      color: "#d84315"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  itemContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    minHeight: "70px"
  }
}));

export default function OrderGiftItem({product, setOrder, order}) {
  const classes = useStyles();

  function findIndex(params) {
    const index = order.gift.findIndex(item=>item._id === product._id)
    return index
  }

  function onAddOrRemovePress(add) {
    // if(product.countInBasket === product.count && add) return;
    const gift = JSON.parse(JSON.stringify(order.gift));
    const index = findIndex();
    gift[index].countInBasket = add ? product.countInBasket + 1 : product.countInBasket - 1
    setOrder({...order, gift : gift })
  }

  function onRemovePress() {
    if(product.countInBasket === 1 && product.unitCountInBasket === 0){
      const gift = order.gift.filter(item=>item._id !== product._id)
      setOrder({...order, gift : gift })
    }else if(product.countInBasket > 0) {
      onAddOrRemovePress(false)
    }
  }

  function onAddOrRemoveUnitPress(add) {
    // if(product.countInBasket === product.count && add) return;
    const gift = JSON.parse(JSON.stringify(order.gift));
    const index = findIndex();
    gift[index].unitCountInBasket = add ? product.unitCountInBasket + 1 : product.unitCountInBasket - 1
    setOrder({...order, gift : gift })
  }

  function onRemoveUnitPRess() {
    if(product.unitCountInBasket === 1 && product.countInBasket === 0 ){
      const gift = order.gift.filter(item=>item._id !== product._id)
      setOrder({...order, gift : gift })
    }else if(product.unitCountInBasket > 0 ) {
      onAddOrRemoveUnitPress(false)
    }
  }

  return (
    <List dense className={classes.root}>
          <ListItem button className={classes.itemContainer} >
            <ListItemAvatar>
              <Avatar
                src={ HOST + product.image}
              />
            </ListItemAvatar>
            <ListItemText primary={product.name} />
          </ListItem>
          <ListItem button className={classes.itemContainer} >
            <ListItemSecondaryAction>
                <AddOrRemoveItemButton
                  product={product}
                  onAddPress={()=>onAddOrRemovePress(true)}
                  onRemovePress={onRemovePress}
                  onAddOrRemoveUnitPress={()=>onAddOrRemoveUnitPress(true)}
                  onRemoveUnitPRess={onRemoveUnitPRess}
                />
            </ListItemSecondaryAction>
          </ListItem>
    </List>
  );
}
