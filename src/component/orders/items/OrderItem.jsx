import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blueGrey } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StoreIcon from '@material-ui/icons/Store';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import moment from "jalali-moment";
import fa from '../../../translation/fa';
import OrderProductItem from './OrderProductItem';
import Button from '@material-ui/core/Button';
import OrderInfoItem from './OrderInfoItem';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { API, HOST } from '../../../service/api';
import SimpleBackdrop from '../../../common/SimpleBackdrop';
import { MyModal } from '../../../common/MyModal';
import ProductListToAdd from '../screen/ProductListToAdd';
import { useRef } from 'react';

moment.locale('fa', { useGregorianParser: true });

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: 16
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blueGrey[500],
    borderRadius: 3
  },
  description: {
    marginTop: 16
  },
  cancelButton : {
    backgroundColor: "red",
    marginTop: 16,
    color: "#fff"
  }
}));

function OrderItem({order, onDetailsClick}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [discount, setDiscount] = React.useState(0);
  const [updatedOrder, setUpdatedOrder] = React.useState(order);
  const [loading, setLoading] = React.useState(false);

  const productListRef = useRef(null);

  function getTotalPrice() {
    let totalPrice = 0
    updatedOrder.products.map(product=> totalPrice = totalPrice + (product.price * product.countInBasket))
    return totalPrice - discount;
  }

  function getTotalBuyPrice() {
    let totalBuyPrice = 0
    updatedOrder.products.map(product=> totalBuyPrice = totalBuyPrice + (product.buy_price * product.countInBasket))
    return totalBuyPrice - discount;
  }
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function onDiscountChange(e) {
    setDiscount(e.target.value)
  }

  async function onDoneClick(cancel) {
    setLoading(true);
    const options = {
      products: updatedOrder.products ,
      price: getTotalPrice(),
      discount,
      status: cancel ? "cancel" : "archive",
      buy_price: getTotalBuyPrice()
    }
    try {
      const {data} = await API.put("order", options, {id: order._id})
      onDetailsClick(order._id, cancel);
    } catch (error) {
      console.log("error : ", error.response);
    }
    setLoading(false);
  }

  function onAddProductPress(newProductList) {
    const rawUpdatedOrder = JSON.parse(JSON.stringify(updatedOrder));
    rawUpdatedOrder.products = newProductList;
    setUpdatedOrder(rawUpdatedOrder);
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        onClick={handleExpandClick}
        avatar={
          <Avatar src={HOST + order.client.avatar} aria-label="recipe" className={classes.avatar}>
            <StoreIcon/>
          </Avatar>
        }
        title={order.client.name}
        subheader={moment(order.created_at).format('YYYY/MM/DD  hh:mm  a')}
        align={"right"}
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {order.client.address && <Typography align={"left"} paragraph>{fa["address"]} : </Typography>}
          {order.client.address && <Typography align={"left"}  paragraph>
            {order.client.address}
          </Typography>}
          {order.comment && <Typography className={classes.description} align={"left"} paragraph>{fa["description"]} : </Typography>}
          {order.comment && <Typography align={"left"}  paragraph>
            {order.comment}
          </Typography>}
          <Divider/>
          {updatedOrder.products.map(product=>(
            <OrderProductItem key={product._id} setOrder={setUpdatedOrder} order={updatedOrder} product={product} />
          ))}
          <MyModal
            title={fa["add product"]}
            ref={productListRef}
            content={
              <ProductListToAdd
                onAddPress={onAddProductPress}
                closeFnc={()=>productListRef.current.handleOpen(false)}
                productList={updatedOrder.products}
              />}
          />
          <Divider/>
          <TextField
              variant="outlined"
              margin="normal"
              required
              type="number"
              fullWidth
              label={fa["discount"]}
              onChange={onDiscountChange}
              value={discount}
              className={classes.input}
          />
          <OrderInfoItem
            title={fa["total price"]}
            value={getTotalPrice()}
          />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={()=>onDoneClick(false)}
          >
            {fa["done"]}
          </Button>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondry"
              onClick={()=>onDoneClick(true)}
              className={classes.cancelButton}
          >
            {fa["cancel"]}
          </Button>
        </CardContent>
      </Collapse>
      <SimpleBackdrop
          open={loading}
          setOpen={setLoading}
        />
    </Card>
  );
}

export default SceneWrapper(OrderItem)