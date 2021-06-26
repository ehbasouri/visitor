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
  }
}));

export default function OrderProductItem({product, setOrder, order}) {
  const classes = useStyles();
  const [price, setPrice] = React.useState(product.price);
  
  function onPriceChange(e) {
    setPrice(e.target.value)
    const rawProducts = JSON.parse(JSON.stringify(order.products));
    const index = rawProducts.findIndex(item=>item._id === product._id)
    if (index > -1) {
      rawProducts[index].price = Number(e.target.value);
      setOrder({...order, products: rawProducts})
    }
  }


  function findIndex(params) {
    const index = order.products.findIndex(item=>item._id === product._id)
    return index
  }

  function onAddOrRemovePress(add) {
    // if(product.countInBasket === product.count && add) return;
    const updatedProducts = JSON.parse(JSON.stringify(order.products));
    const index = findIndex();
    updatedProducts[index].countInBasket = add ? product.countInBasket + 1 : product.countInBasket - 1
    setOrder({...order, products : updatedProducts })
  }

  function onRemovePress() {
    if(product.countInBasket === 1){
      const updatedProducts = order.products.filter(item=>item._id !== product._id)
      setOrder({...order, products : updatedProducts })
    }else {
      onAddOrRemovePress(false)
    }
  }

  return (
    <List dense className={classes.root}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar
                // className={classes.large}
                src={ HOST + product.image}
              />
            </ListItemAvatar>
            <ListItemText primary={product.name} />

            <ListItemSecondaryAction>
                <AddOrRemoveItemButton
                  product={product}
                  onAddPress={()=>onAddOrRemovePress(true)}
                  onRemovePress={onRemovePress}
                />
            </ListItemSecondaryAction>
          </ListItem>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  type="number"
                  fullWidth
                  label={fa["Unit price"]}
                  onChange={onPriceChange}
                  defaultValue={product.price}
                  value={price}
              />
    </List>
  );
}
