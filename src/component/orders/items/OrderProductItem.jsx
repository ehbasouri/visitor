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

export default function OrderProductItem({product, setOrder, order}) {
  const classes = useStyles();
  const [price, setPrice] = React.useState(product.price);
  const [unit_price, set_unit_price] = React.useState(product.unit_price);
  
  function onPriceChange(e) {
    setPrice(e.target.value)
    const rawProducts = JSON.parse(JSON.stringify(order.products));
    const index = rawProducts.findIndex(item=>item._id === product._id)
    if (index > -1) {
      rawProducts[index].price = Number(e.target.value);
      setOrder({...order, products: rawProducts})
    }
  }

  function onUnitPriceChange(e) {
    set_unit_price(e.target.value)
    const rawProducts = JSON.parse(JSON.stringify(order.products));
    const index = rawProducts.findIndex(item=>item._id === product._id)
    if (index > -1) {
      rawProducts[index].unit_price = Number(e.target.value);
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
    if(product.countInBasket === 1 && product.unitCountInBasket === 0){
      const updatedProducts = order.products.filter(item=>item._id !== product._id)
      setOrder({...order, products : updatedProducts })
    }else if(product.countInBasket > 0) {
      onAddOrRemovePress(false)
    }
  }


  function onAddOrRemoveUnitPress(add) {
    // if(product.countInBasket === product.count && add) return;
    const updatedProducts = JSON.parse(JSON.stringify(order.products));
    const index = findIndex();
    updatedProducts[index].unitCountInBasket = add ? product.unitCountInBasket + 1 : product.unitCountInBasket - 1
    setOrder({...order, products : updatedProducts })
  }

  function onRemoveUnitPRess() {
    if(product.unitCountInBasket === 1 && product.countInBasket === 0 ){
      const updatedProducts = order.products.filter(item=>item._id !== product._id)
      setOrder({...order, products : updatedProducts })
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
              { product.countInBasket > 0 && <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  type="number"
                  fullWidth
                  label={fa["Unit price"]}
                  onChange={onPriceChange}
                  defaultValue={product.price}
                  value={price}
              />}
              { product.unitCountInBasket > 0 && <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  type="number"
                  fullWidth
                  label={fa["unit_price"]}
                  onChange={onUnitPriceChange}
                  defaultValue={product.unit_price}
                  value={unit_price}
              />}
    </List>
  );
}
