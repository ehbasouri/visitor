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

function OrderDetail() {

  const history = useHistory()
  let { id } = useParams();

  const classes = useStyles();
  const [discount, setDiscount] = React.useState(0);
  const [updatedOrder, setUpdatedOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [paied_amount, set_paied_amount] = React.useState(null);
  const [showModal, setShowModal] = React.useState(0);
  const [debt, set_debt] = React.useState(0);

  const user_info = useSelector(state=>state.general_reducer.user_info)

  useEffect(()=>{
      fetchOrderDetail();
  },[]) 
  
  useEffect(()=>{
    if(updatedOrder && typeof updatedOrder.paied_amount === "number"){
      set_paied_amount(updatedOrder.paied_amount)
    } else {
      set_paied_amount(getTotalPrice())
    }
    if (updatedOrder) {
      fetchDebt() 
    }
  },[updatedOrder, discount])

  async function fetchOrderDetail() {
    try {
        const {data} = await API.get("business/order", {_id: id, business_id : user_info._id});
        setUpdatedOrder(data[0]);

        data[0] && !data[0]?.is_package && fetchProducts(data[0]);

        if(data[0] && typeof data[0].discount === "number"){
          setDiscount(data[0].discount)
        }
    } catch (error) {
        console.log("error : ", error);
    }
  }

  async function fetchProducts(rawOrder) {
    console.log('fetching pl ...');
    try {
      const rawResult = {...rawOrder};
      const ids = []
      rawResult.products.map(element=>ids.push(element._id))
      const giftIds = []
      rawResult.gift.map(element=>giftIds.push(element._id))
      if(giftIds.length > 0){
        const updatedGiftsRes = await API.get("business/productbyIds",{ids: giftIds.join()})
        const updatedGift = mergeArrays(updatedGiftsRes.data, rawResult.gift);
        rawResult.gift = updatedGift

      }
      if(ids.length > 0){
        const updatedProductsRes = await API.get("business/productbyIds",{ids: ids.join()})
        const updatedProducts = mergeArrays(updatedProductsRes.data, rawResult.products);
        rawResult.products = updatedProducts;
      }
      setUpdatedOrder(rawResult);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  const mergeArrays = (arr1 = [], arr2 = []) => {
    let res = [];
    res = arr1.map(obj => {
        const index = arr2.findIndex(el => el["_id"] == obj["_id"]);
        const { countInBasket, unitCountInBasket } = index !== -1 ? arr2[index] : {};
        return {
          ...obj,
          countInBasket,
          unitCountInBasket,
        };
    });
    return res;
  };

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
    updatedOrder.products.map(product => {
      if((product.unitCountInBasket === undefined)){
        totalBuyPrice = totalBuyPrice + (product.buy_price * product.countInBasket)
      }else {
        totalBuyPrice = totalBuyPrice + ( Math.floor(product.buy_price / product.count_in_box) * product.unitCountInBasket)  + (product.buy_price * product.countInBasket)
      }
    })
    updatedOrder.gift.map(product=> {
      if((product.unitCountInBasket === undefined)){
        totalBuyPrice = totalBuyPrice + (product.buy_price * product.countInBasket)
      }else {
          totalBuyPrice = totalBuyPrice + ((product.buy_price / product.count_in_box) * product.unitCountInBasket)  + (product.buy_price * product.countInBasket)
      }
    })
    return Math.round(Number(totalBuyPrice));
  }

  function onDiscountChange(e) {
    setDiscount(e.target.value)
  }

  async function onDoneClick(cancel) {
    // setLoading(true);
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

  async function fetchDebt() {
    const queries = {
      business_id : user_info._id, 
      client_id: updatedOrder.client_id
    } 
    try {
        const {data} = await API.get("paied", queries);
        if(data && data.length > 0){
            let total_debt = 0;
            data.map(element=>{
              total_debt = element.is_debt ?  total_debt + element.amount : total_debt - element.amount
            })
            set_debt(total_debt);
        }
    } catch (error) {
        console.log("error : ", error);
    }
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
                {getTotalPrice() - paied_amount > 0 && <OrderInfoItem
                    title={fa["debt amount"]}
                    value={converEnglishNumToPersian(numberWithCommas(getTotalPrice() - paied_amount)) + " " + fa["toman"]}
                />}
                <OrderInfoItem
                    title={fa["all debt"]}
                    value={converEnglishNumToPersian(numberWithCommas(debt)) + " " + fa["toman"]}
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

export default SceneWrapper(OrderDetail)