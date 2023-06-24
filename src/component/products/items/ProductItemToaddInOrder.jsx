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
import { AddOrRemoveItemButton } from '../../orders/items/AddOrRemoveItemButton';
import { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  count: {
      color: "#d84315"
  }
}));

export default function ProductItemToaddInOrder({
  product, 
  productList = [], 
  setAddedProductList = () => null,
  isGift = false 
}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(checkProduct());

  const SelectedProduct = useMemo(() => {
    return productList.find((element) => element?._id === product?._id)
  }, [product?._id, productList])

  function checkProduct() {
    const index = productList.findIndex(element => element._id === product._id);
    return index > -1
  }

  function handleChange(event) {
    setChecked(event.target.checked);
    if(event.target.checked){
      setAddedProductList([...productList, {...product, countInBasket : isGift ? 0 : 1, unitCountInBasket: isGift ? 1 : 0}])
    } else{
      const updatedList = productList.filter((element)=>element._id !== product._id)
      setAddedProductList(updatedList);
    }
  }

  function findIndex(params) {
    const index = productList.findIndex(item=>item._id === product._id)
    return index
  }
  const onAddOrRemovePress = (add) => {

    // if(product.countInBasket === product.count && add) return;
    const updatedProducts = JSON.parse(JSON.stringify(productList));
    const index = findIndex();
    updatedProducts[index].countInBasket = add ? SelectedProduct.countInBasket + 1 : SelectedProduct.countInBasket - 1
    setAddedProductList(updatedProducts)
  }
  const onRemovePress = () => {
    if(SelectedProduct.countInBasket === 1 && SelectedProduct.unitCountInBasket === 0){
      handleChange({target : {value: false}})
    }else if(SelectedProduct.countInBasket > 0) {
      onAddOrRemovePress(false)
    }
  }
  const onAddOrRemoveUnitPress = (add) => {
    const updatedProducts = JSON.parse(JSON.stringify(productList));
    const index = findIndex();
    updatedProducts[index].unitCountInBasket = add ? SelectedProduct.unitCountInBasket + 1 : SelectedProduct.unitCountInBasket - 1
    setAddedProductList(updatedProducts)
  }
  const onRemoveUnitPRess = () => {
    if(SelectedProduct.unitCountInBasket === 1 && SelectedProduct.countInBasket === 0 ){
      handleChange({target : {value: false}})
    }else if(SelectedProduct.unitCountInBasket > 0 ) {
      onAddOrRemoveUnitPress(false)
    }
  }


  return (
    <List dense className={classes.root}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar
                src={ HOST + product.image}
              >
                {product.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={product.name} />
            <ListItemSecondaryAction>

            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            </ListItemSecondaryAction>
          </ListItem>
            {checked && <AddOrRemoveItemButton
              product={{...SelectedProduct, ...product}}
              onAddPress={()=>onAddOrRemovePress(true)}
              onRemovePress={onRemovePress}
              onAddOrRemoveUnitPress={()=>onAddOrRemoveUnitPress(true)}
              onRemoveUnitPRess={onRemoveUnitPRess}
              />}
    </List>
  );
}
