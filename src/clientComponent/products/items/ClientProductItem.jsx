import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { HOST } from '../../../service/api';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { 
  Link
} from "react-router-dom";
import { DeleteModal } from '../../../common/DeleteModal';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import fa from '../../../translation/fa';
import { AddProductToBasketButton } from '../../../common/AddProductToBasketButton';
import { useSelector } from 'react-redux';

import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { BASKET } from '../../../consts';

const useStyles = makeStyles({
  root: {
    marginTop: 16
  },
  cardAction: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

export default function ClientProductItem({product, onDeleteProduct}) {
  const classes = useStyles();
  const [showDelModal, setShowDelModal] = useState(false);
  const basket = useSelector(state=>state.general_reducer.basket)

  const dispatch = useDispatch();

  function onAddToBasket() {
    const addedProductList = JSON.parse(JSON.stringify(basket.products));
    addedProductList.push({...product, countInBasket: 1});
    dispatch(updateGeneralProps({
      key: BASKET, value: {...basket, products: addedProductList}
    }))
  }

  function isInBasket() {
    const addedItem = basket.products.find(item=>item._id === product._id);
    return addedItem
  }

  return (
    <>
    <Card className={classes.root}> 
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={HOST + product.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography align={"left"} gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography align={"left"} variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardAction} >
        {!isInBasket() ? <Button onClick={onAddToBasket} endIcon={<AddShoppingCartIcon/>} size="small" color="primary">
          {fa["add to basket"]}
        </Button>:
        <AddProductToBasketButton product = {isInBasket()} />}
      </CardActions>
    </Card>
      <DeleteModal
          open={showDelModal}
          setOpen={setShowDelModal}
          onDelete={onDeleteProduct}
          url={"business/product"}
          params={{id : product._id}}
      />
      </>
  );
}
