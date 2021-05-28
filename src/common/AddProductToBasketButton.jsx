import React from 'react';
import Button from '@material-ui/core/Button';
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
    const updatedProducts = JSON.parse(JSON.stringify(basket.products));
    const index = findIndex();
    updatedProducts[index].countInBasket = add ? product.countInBasket + 1 : product.countInBasket - 1
    dispatch(updateGeneralProps({
      key: BASKET, value: {...basket, products : updatedProducts }
    }))
  }

  function onRemovePRess(params) {
    if(product.countInBasket === 1){
      const updatedProducts = basket.products.filter(item=>item._id !== product._id)
      dispatch(updateGeneralProps({
        key: BASKET, value: {...basket, products : updatedProducts }
      }))
    }else {
      onAddOrRemovePress(false)
    }
  }

  return (
    <div className={classes.root}>
      {/* <ButtonGroup size="small" aria-label="small outlined button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup> */}
      <ButtonGroup size={"small"} >
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
      {/* <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup> */}
    </div>
  );
}
