import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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
import OrderProductItem from '../items/OrderProductItem';
import Button from '@material-ui/core/Button';
import OrderInfoItem from '../items/OrderInfoItem';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { API, HOST } from '../../../service/api';
import SimpleBackdrop from '../../../common/SimpleBackdrop';
import { MyModal } from '../../../common/MyModal';
import ProductListToAdd from '../screen/ProductListToAdd';
import { useRef } from 'react';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';
import numberWithCommas from '../../../utils/commaSeperator';
import OrderGiftItem from "../items/OrderGiftItem"
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainScreen from "../../../common/MainScreen";
import { Header } from "../../../common/Header";

moment.locale('fa', { useGregorianParser: true });

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: 16
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

function OrderItem() {

  const history = useHistory()
  let { id } = useParams();

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [discount, setDiscount] = React.useState(0);
  const [updatedOrder, setUpdatedOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [paied_amount, set_paied_amount] = React.useState(null);
  const [showModal, setShowModal] = React.useState(0);

  const productListRef = useRef(null);
  const giftListRef = useRef(null);

    const user_info = useSelector(state=>state.general_reducer.user_info)

    useEffect(()=>{
        fetchOrderDetail();
    },[])

    async function fetchOrderDetail() {
        try {
            const {data} = await API.get("business/order", {_id: id, business_id : user_info._id});
            console.log("data : ", data);
            setUpdatedOrder(data[0]);
        } catch (error) {
            console.log("error : ", error);
        }
    }

  useEffect(()=>{
    set_paied_amount(getTotalPrice())
  },[updatedOrder])


function getTotalPrice() {
    if(!updatedOrder) return
    let totalPrice = 0
    updatedOrder.products.map(product => {
        if((product.unitCountInBasket === undefined)){
            totalPrice = totalPrice + (product.price * product.countInBasket)
        }else {
            totalPrice = totalPrice + (product.unit_price * product.unitCountInBasket)  + (product.price * product.countInBasket)
        }
    })
    return Number(totalPrice - discount); 
}

  function getTotalBuyPrice() {
    if(!updatedOrder) return
    let totalBuyPrice = 0
    updatedOrder.products.map(product=> {
      if((product.unitCountInBasket === undefined)){
        totalBuyPrice = totalBuyPrice + (product.buy_price * product.countInBasket)
      }else {
          totalBuyPrice = totalBuyPrice + ((product.buy_price / product.count_in_box) * product.unitCountInBasket)  + (product.buy_price * product.countInBasket)
      }
    })
    updatedOrder.gift.map(product=> {
      if((product.unitCountInBasket === undefined)){
        totalBuyPrice = totalBuyPrice + (product.buy_price * product.countInBasket)
      }else {
          totalBuyPrice = totalBuyPrice + ((product.buy_price / product.count_in_box) * product.unitCountInBasket)  + (product.buy_price * product.countInBasket)
      }
    })
    console.log("totalBuyPrice", totalBuyPrice)
    return Math.round(Number(totalBuyPrice));
  }

  console.log("updatedOrder : ", updatedOrder);
  
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
      buy_price: getTotalBuyPrice(),
      gift: updatedOrder.gift,
      paied_amount,
      is_debt: paied_amount < getTotalPrice()
    }

    try {
      const {data} = await API.put("order", options, {id: updatedOrder._id})
      onDetailsClick(updatedOrder._id, cancel);
    } catch (error) {
      console.log("error : ", error);
      console.log("error : ", error.response);
    }
    setLoading(false);
  }

  function onDetailsClick(order_id, cancel) {
    if(!cancel) {
      history.replace("/admin/archiveorderdetail/" + order_id)
    }else {
        history.goBack();
    }
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
        <Header title={updatedOrder ? updatedOrder.client.name : ""} />
        <MainScreen>
            
            { updatedOrder && <Card className={classes.root}>
                <CardContent>
                {updatedOrder.client.address && <Typography align={"left"} paragraph>{fa["address"]} : </Typography>}
                {updatedOrder.client.address && <Typography align={"left"}  paragraph>
                    {updatedOrder.client.address}
                </Typography>}
                {updatedOrder.client.mobile && <Typography align={"left"} paragraph>{fa["mobile"]} : </Typography>}
                {updatedOrder.client.mobile && <Typography align={"left"}  paragraph>
                    {updatedOrder.client.mobile}
                </Typography>}
                {updatedOrder.client.phone && <Typography align={"left"} paragraph>{fa["phone"]} : </Typography>}
                {updatedOrder.client.phone && <Typography align={"left"}  paragraph>
                    {updatedOrder.client.phone}
                </Typography>}
                {updatedOrder.comment && <Typography className={classes.description} align={"left"} paragraph>{fa["description"]} : </Typography>}
                {updatedOrder.comment && <Typography align={"left"}  paragraph>
                    {updatedOrder.comment}
                </Typography>}
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
                        closeFnc={()=>productListRef.current.handleOpen(false)}
                        productList={updatedOrder.products}
                    />}
                /> */}
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
                        closeFnc={()=>giftListRef.current.handleOpen(false)}
                        productList={updatedOrder.gift}
                        isGift
                    />}
                /> */}
                <Divider/>

                {updatedOrder.gift.map(element=>(
                    <OrderGiftItem key={element._id} setOrder={setUpdatedOrder} order={updatedOrder} product={element} />
                ))}

                <Divider/>

                <OrderInfoItem
                    title={fa["total price"]}
                    value={converEnglishNumToPersian(numberWithCommas(getTotalPrice())) + " " + fa["toman"]}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    type="number"
                    fullWidth
                    label={fa["paied amount"]}
                    onChange={e=>set_paied_amount(e.target.value)}
                    value={paied_amount}
                    className={classes.input}
                />
                <OrderInfoItem
                    title={fa["debt amount"]}
                    value={converEnglishNumToPersian(numberWithCommas(getTotalPrice() - paied_amount)) + " " + fa["toman"]}
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
            <SimpleBackdrop
                open={loading}
                setOpen={setLoading}
                />
            </Card>}
        </MainScreen>
    </div>
  );
}

export default SceneWrapper(OrderItem)