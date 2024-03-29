import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../redux/actions';
import { BASKET } from '../consts';
import fa from '../translation/fa';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  addIcon: {
      color: "#00c853"
  }
}));

export function AddProductToBasketButton({product}) {
  const classes = useStyles();
  const basket = useSelector(state=>state.general_reducer.basket)
  const dispatch = useDispatch();

  function findIndex(params) {
    const index = basket.products.findIndex(item=>item._id === product._id)
    return index
  }

  function onAddOrRemovePress(add) {
    // if(product.countInBasket === product.count && add) return;
    const updatedProducts = JSON.parse(JSON.stringify(basket.products));
    const index = findIndex();
    updatedProducts[index].countInBasket = add ? product.countInBasket + 1 : product.countInBasket - 1
    dispatch(updateGeneralProps({
      key: BASKET, value: {...basket, products : updatedProducts }
    }))
  }

  function onRemovePRess(params) {
    if(product.countInBasket === 1 && product.unitCountInBasket === 0){
      const updatedProducts = basket.products.filter(item=>item._id !== product._id)
      dispatch(updateGeneralProps({
        key: BASKET, value: {...basket, products : updatedProducts }
      }))
    }else if(product.countInBasket > 0 ) {
      onAddOrRemovePress(false)
    }
  }

  function onAddOrRemoveUnitPress(add) {
    // if(product.countInBasket === product.count && add) return;
    const updatedProducts = JSON.parse(JSON.stringify(basket.products));
    const index = findIndex();
    updatedProducts[index].unitCountInBasket = add ? product.unitCountInBasket + 1 : product.unitCountInBasket - 1
    dispatch(updateGeneralProps({
      key: BASKET, value: {...basket, products : updatedProducts }
    }))
  }

  function onRemoveUnitPRess(params) {
    if(product.unitCountInBasket === 1 && product.countInBasket === 0 ){
      const updatedProducts = basket.products.filter(item=>item._id !== product._id)
      dispatch(updateGeneralProps({
        key: BASKET, value: {...basket, products : updatedProducts }
      }))
    }else if(product.unitCountInBasket > 0 ) {
      onAddOrRemoveUnitPress(false)
    }
  }

  return (
    <div className={classes.root}>
      <ButtonGroup size={"small"} >
        <IconButton>
            <Typography align={"left"} >
                {fa["box"]}
            </Typography>
        </IconButton>
        <IconButton onClick={()=>onAddOrRemovePress(true)} >
            <AddCircleIcon className={classes.addIcon} />
        </IconButton>
        <IconButton>
            <Typography>
                {product.countInBasket}
            </Typography>
        </IconButton>
        <IconButton onClick={onRemovePRess} >
            <RemoveCircleIcon color={"error"} />
        </IconButton>
      </ButtonGroup>
      <ButtonGroup size={"small"} >
        <IconButton>
            <Typography>
                {fa["unit"]}
            </Typography>
        </IconButton>
        <IconButton onClick={()=>onAddOrRemoveUnitPress(true)} >
            <AddCircleIcon className={classes.addIcon} />
        </IconButton>
        <IconButton>
            <Typography>
                {product.unitCountInBasket}
            </Typography>
        </IconButton>
        <IconButton onClick={onRemoveUnitPRess} >
            <RemoveCircleIcon color={"error"} />
        </IconButton>
      </ButtonGroup>
    </div>
  );
}
