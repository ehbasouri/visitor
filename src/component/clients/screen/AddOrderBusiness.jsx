import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { blueGrey } from '@material-ui/core/colors';
import StoreIcon from '@material-ui/icons/Store';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import moment from "jalali-moment";
import fa from '../../../translation/fa';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { API, HOST } from '../../../service/api';
import SimpleBackdrop from '../../../common/SimpleBackdrop';
import { MyModal } from '../../../common/MyModal';
import { useRef } from 'react';
import ProductListToAdd from '../../orders/screen/ProductListToAdd';
import OrderProductItem from '../../orders/items/OrderProductItem';
import OrderInfoItem from '../../orders/items/OrderInfoItem';
import { Header } from '../../../common/Header';
import MainScreen from '../../../common/MainScreen';
import {useParams} from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import numberWithCommas from '../../../utils/commaSeperator';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';
import OrderGiftItem from "../../orders/items/OrderGiftItem"

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

const newOrder = {
    "products": [],
    "discount": 0,
    "price": 0,
    "client": {},
    "gift": []
}

function AddOrderBusiness({history}) {

  const classes = useStyles();
  const [discount, setDiscount] = React.useState(0);
  const [updatedOrder, setUpdatedOrder] = React.useState(newOrder);
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(0);


    const user_info = useSelector(state=>state.general_reducer.user_info)
    let { id } = useParams();

  const productListRef = useRef(null);
  const giftListRef = useRef(null);
  


    useEffect(()=>{
        fetchUser();
    },[])

    async function fetchUser() {
        try {
            const {data} = await API.get("business/getusers",{_id: id});
            setUpdatedOrder({...updatedOrder, client: data.users[0]})
        } catch (error) {
            console.log("error : ", error)
        }
    }

  function getTotalPrice() {
    let totalPrice = 0
    updatedOrder.products.map(product=> totalPrice = totalPrice + (product.price * product.countInBasket))
    return totalPrice - discount;
  }

  function getTotalBuyPrice() { 
    let totalBuyPrice = 0
    updatedOrder.products.map(product=> totalBuyPrice = totalBuyPrice  + ((product.buy_price / product.count_in_box) * product.unitCountInBasket) + (product.buy_price * product.countInBasket))
    updatedOrder.gift.map(giftItem=> totalBuyPrice = totalBuyPrice  + ((giftItem.buy_price / giftItem.count_in_box) * giftItem.unitCountInBasket) + (giftItem.buy_price * giftItem.countInBasket))
    return totalBuyPrice - discount;
  }

  function onDiscountChange(e) {
    setDiscount(e.target.value)
  }

  async function onDoneClick(cancel) {
    setLoading(true);
    const options = {
      ...updatedOrder ,
      price: getTotalPrice(),
      discount,
      status: "archive",
      buy_price: getTotalBuyPrice(),
      business_id: user_info._id,
      client_id: updatedOrder.client._id,
      business: user_info
    }

    try {
      const {data} = await API.post("order", options)
      history.replace("/admin/archiveorderdetail/" + data._id)
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

  function onAddGiftPress(newGiftList) {
    const rawUpdatedOrder = JSON.parse(JSON.stringify(updatedOrder));
    rawUpdatedOrder.gift = newGiftList;
    setUpdatedOrder(rawUpdatedOrder);
  }

  return (
    showModal ? (
      showModal === 1 ? <ProductListToAdd
          onAddPress={onAddProductPress}
          closeFnc={()=>setShowModal(0)}
          productList={updatedOrder.products}
        /> : 
        <ProductListToAdd
          onAddPress={onAddGiftPress}
          closeFnc={()=>setShowModal(0)}
          productList={updatedOrder.gift}
          isGift
        />
    ) :
    <div className={"mainScreen"}>
        <Header/>
        <MainScreen>
            <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar src={HOST + updatedOrder.client.avatar} aria-label="recipe" className={classes.avatar}>
                    <StoreIcon/>
                </Avatar>
                }
                title={updatedOrder.client.name}
                align={"right"}
            />
                <CardContent>
                <Divider/>
                {updatedOrder.products.map(product=>(
                    <OrderProductItem key={product._id} setOrder={setUpdatedOrder} order={updatedOrder} product={product} />
                ))}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={()=>setShowModal(1)}
              >
                  {fa["add product"]}
              </Button>
                {/* <MyModal
                    title={fa["add product"]}
                    ref={productListRef}
                    content={
                    <ProductListToAdd
                        onAddPress={onAddProductPress}
                        closeFnc={()=>setShowModal(0)}
                        productList={updatedOrder.products}
                    />}
                /> */}
                
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={()=>setShowModal(2)}
                >
                    {fa["add gift"]}
                </Button>
              {/* <MyModal
                title={fa["add gift"]}
                ref={giftListRef}
                content={
                  <ProductListToAdd
                    onAddPress={onAddGiftPress}
                    closeFnc={()=>setShowModal(0)}
                    productList={updatedOrder.gift}
                    isGift
                  />}
              />
              <Divider/> */}

              {updatedOrder.gift.map(element=>(
                <OrderGiftItem key={element._id} setOrder={setUpdatedOrder} order={updatedOrder} product={element} />
              ))}
                <Divider/>
                <OrderInfoItem
                    title={fa["total price"]}
                    value={converEnglishNumToPersian(numberWithCommas(getTotalPrice()))}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={()=>onDoneClick(false)}
                >
                    {fa["submit"]}
                </Button>
                </CardContent>
            <SimpleBackdrop
                open={loading}
                setOpen={setLoading}
                />
            </Card>
        </MainScreen>
    </div>
  );
}

export default SceneWrapper(AddOrderBusiness)