import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { blueGrey } from '@material-ui/core/colors';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import moment from "jalali-moment";
import fa from '../../../translation/fa';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { API } from '../../../service/api';
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
import { AlertComponent } from '../../../common/AlertComponent';
import { handleApiErrors } from '../../../utils/handleApiErrors';

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
  },
  input: {
    //   marginLeft: theme.spacing(2)
  }
}));

const newOrder = {
    "products": [],
    "discount": 0,
    "price": 0,
    "gift": []
}

function AddPackage({history}) {
  
  const {id} = useParams();

  const classes = useStyles();
  const [discount, setDiscount] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [updatedOrder, setUpdatedOrder] = useState(newOrder);
  const [loading, setLoading] = useState(false);
  const user_info = useSelector(state=>state.general_reducer.user_info)
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(0);

  useEffect(()=>{
    fetchPackage();
  },[])

  async function fetchPackage() {
      if(!id) {
        return
      }
      const params = {
        business_id : user_info._id,
        _id: id
      }
    try {
        const {data} = await API.get("business/package", params)
        if(data.length > 0 ){
            setUpdatedOrder(data[0]);
            setName(data[0].name);
            setDiscount(data[0].discount);
            setComment(data[0].comment)
        }
      } catch (error) {
        console.log("error : ", error.response);
    }
  }

  const productListRef = useRef(null);
  const giftListRef = useRef(null);

  // function getTotalPrice() {  
  //   let totalPrice = 0
  //   updatedOrder.products.map(product=> totalPrice = totalPrice + (product.price * product.countInBasket))
  //   return totalPrice - discount;
  // }

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

  // function getTotalBuyPrice() {
  //   let totalBuyPrice = 0
  //   updatedOrder.products.map(product=> totalBuyPrice = totalBuyPrice  + ((product.buy_price / product.count_in_box) * product.unitCountInBasket) + (product.buy_price * product.countInBasket))
  //   updatedOrder.gift.map(giftItem=> totalBuyPrice = totalBuyPrice  + ((giftItem.buy_price / giftItem.count_in_box) * giftItem.unitCountInBasket) + (giftItem.buy_price * giftItem.countInBasket))
  //   return totalBuyPrice - discount;
  // }


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

  function onSubmit () {
      if(id){
        onUpdatePackage()
      } else {
        onInsertPackage()
      }
  }

  async function onInsertPackage(cancel) {
    setLoading(true);
    const options ={
        ...updatedOrder ,
        price: getTotalPrice(),
        discount,
        buy_price: getTotalBuyPrice(),
        business_id: user_info._id,
        business: user_info,
        name,
        comment
    }
    try {
      const {data} = await API.post("package", options)
      history.goBack()
    } catch (error) {
      const errorMessage = handleApiErrors(error);
      setMessage(errorMessage);
      setShowAlert(true);
      console.log("error : ", error.response);
      
    }
    setLoading(false);
  }

  async function onUpdatePackage(cancel) {
    setLoading(true);
    const options ={
        ...updatedOrder ,
        price: getTotalPrice(),
        discount,
        buy_price: getTotalBuyPrice(),
        name,
        comment
    }
    delete options.business_id
    delete options.business
    delete options.created_at
    delete options.updated_at
    delete options._id
    delete options.__v

    try {
      const {data} = await API.put("package", options, {id})
      history.goBack()
    } catch (error) {
      console.log("error : ", error.response);

      const errorMessage = handleApiErrors(error);
      setMessage(errorMessage);
      setShowAlert(true);
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
    />:
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
                <CardContent>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label={fa["name"]}
                    onChange={e=>setName(e.target.value)}
                    value={name}
                    className={classes.input}
                />
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
                    value={converEnglishNumToPersian(numberWithCommas(getTotalPrice()))}
                />
                <TextField
                  id="filled-multiline-flexible"
                  multiline
                  variant="outlined"
                  rowsMax={4}
                  value={comment}
                  onChange={e=>setComment(e.target.value)}
                  margin="normal"
                  fullWidth
                  label={fa["description"]}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                >
                    {fa["submit"]}
                </Button>
                </CardContent>
            <SimpleBackdrop
                open={loading}
                setOpen={setLoading}
                />

          <AlertComponent
            open={showAlert}
            setOpen={setShowAlert}
            message={message}
          />
            </Card>
        </MainScreen>
    </div>
  );
}

export default SceneWrapper(AddPackage)