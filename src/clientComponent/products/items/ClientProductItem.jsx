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
import { DeleteModal } from '../../../common/DeleteModal';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import fa from '../../../translation/fa';
import { AddProductToBasketButton } from '../../../common/AddProductToBasketButton';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component'; 

import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { BASKET } from '../../../consts';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';
import numberWithCommas from '../../../utils/commaSeperator';
import { ClientProdoctBottomDrawer } from "./ClientProdoctBottomDrawer"
import 'react-lazy-load-image-component/src/effects/blur.css';

const useStyles = makeStyles({
  root: {
    marginTop: 16,
    maxWidth: 345,
    width: "100%"
  },
  cardAction: {
    display: "flex",
    justifyContent: "flex-end"
  },
  image: {
    minHeight: 200
  }
});

export default function ClientProductItem({product, onDeleteProduct, show_price}) {
  const classes = useStyles();
  const [showDelModal, setShowDelModal] = useState(false);
  const basket = useSelector(state=>state.general_reducer.basket)
  const business = useSelector(state=>state.general_reducer.business)
  const cbrs = useSelector(state=>state.general_reducer.cbrs)

  const dispatch = useDispatch();

  function onAddToBasket(countInBasket, unitCountInBasket) {
    const addedProductList = JSON.parse(JSON.stringify(basket.products));
    addedProductList.push({...product, countInBasket, unitCountInBasket});
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
        <LazyLoadImage
          alt="Contemplative Reptile"
          // height={null}
          src={HOST + product.image} 
          width="100%" 
          className={classes.image}
          />
        <CardContent>
          <Typography align={"left"} gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography align={"left"} variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>

          {cbrs[business._id] && cbrs[business._id].show_price && <Typography align={"left"} variant="body2" color="textSecondary" component="p">
            {fa["box"] + " " + converEnglishNumToPersian(numberWithCommas(product.price))} {fa["toman"]}
          </Typography>}

          {cbrs[business._id] && cbrs[business._id].show_price && <Typography align={"left"} variant="body2" color="textSecondary" component="p">
            {fa["unit"] + " " + converEnglishNumToPersian(numberWithCommas(product.unit_price))} {fa["toman"]}
          </Typography>}

        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardAction} >
        
        {!isInBasket() ? 
          <ClientProdoctBottomDrawer  onAddToBasket={onAddToBasket} /> :
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
