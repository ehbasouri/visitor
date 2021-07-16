import React, {useRef} from "react";
import { useState } from "react";
import { useEffect } from "react";
import {useParams} from "react-router-dom";
import { Header } from "../../../common/Header";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import { API } from "../../../service/api";
import { useSelector } from 'react-redux';
import MainScreen from "../../../common/MainScreen";
import InvoiceIrem from "../items/InvoiceItem";
import ArchiveOrderItem from "../items/ArchiveOrderItem";
import fa from "../../../translation/fa";
import SignItem from "../items/SigneItem";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import numberWithCommas from "../../../utils/commaSeperator";
import converEnglishNumToPersian from "../../../utils/EnglishNumToPersianNum";
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import CircularProgress from '@material-ui/core/CircularProgress'; 

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        padding: "10px",
        display: "flex",
    },
    canceledText: {
      color: "red"
    },
    tableContainer: {
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(2),
        // paddingTop: theme.spacing(2),
        // paddingBottom: theme.spacing(2),
    }
  }));

function ArchiveOrderTable(params) {
    const classes = useStyles();

    let { id } = useParams();

    const [orderDetails, setOrderDetails] = useState(null);
    const user_info = useSelector(state=>state.general_reducer.user_info)

    useEffect(()=>{
        fetchOrderDetail();
    },[])

    async function fetchOrderDetail() {
        try {
            const {data} = await API.get("business/order", {_id: id, business_id : user_info._id});
            setOrderDetails(data[0]);
        } catch (error) {
            console.log("error : ", error);
        }
    }

    function getTotalPrice() {
        let totalPrice = 0
        orderDetails.products.map(product => {
            if((product.unitCountInBasket === undefined)){
                totalPrice = totalPrice + (product.price * product.countInBasket)
            }else {
                totalPrice = totalPrice + (product.unit_price * product.unitCountInBasket)  + (product.price * product.countInBasket)
            }
        })
        return totalPrice - orderDetails.discount; 
    }

    console.log("orderDetails : ", orderDetails);

    return(
        !orderDetails ? null :
        <div className={classes.tableContainer} >
            <ArchiveOrderItem
                cssId={"text-to-print"}
                title={fa["client"]}
                value={orderDetails.client.name}
            />
            {orderDetails.products.map((product)=>(
                <InvoiceIrem cssId={"text-to-print"} key={product._id} product={product} />
            ))}
            {orderDetails.gift.map((giftItem)=>(
                <InvoiceIrem gift cssId={"text-to-print"} key={giftItem._id} product={giftItem} />
            ))}
            {orderDetails.discount > 0 && <ArchiveOrderItem
                cssId={"text-to-print"}
                title={fa["discount"]}
                value={converEnglishNumToPersian(numberWithCommas(orderDetails.discount)) + " " + fa["toman"]  }
            />}
            <ArchiveOrderItem
                cssId={"text-to-print"}
                title={fa["total price"]}
                value={converEnglishNumToPersian(numberWithCommas(getTotalPrice())) + " " + fa["toman"]  }
            />
            {orderDetails.status === "archive" &&<SignItem date={orderDetails.updated_at} />}
            {/* { !readyToPrint && orderDetails.status === "archive" && } */}
            {orderDetails.status === "cancel" && <Typography align={"left"} variant="subtitle1" className={classes.canceledText}>
                {fa["canceled"]}
                <CancelIcon/>
            </Typography> }
        </div>
    )
}

class ArchiveOrderClass extends React.Component {
    state = {  }
    render() {
        return (
            <ArchiveOrderTable {...this.props} />
        );
    }
}

function ArchiveOrderDetailes() {

    const classes = useStyles();

    const componentRef = useRef(); 

    const [loading, setLoading] = useState(false);

    let { id } = useParams();

    async function onPrintPress() {
        setLoading(true);
        try {
            await exportComponentAsPNG(componentRef, {
                fileName: `ehsan_${id}.png`
            }) 
        } catch (error) {
            console.log("error : ", error);
        }
        setLoading(false);
    }

    return(
        
        <div className={"mainScreen"}>
            <Header/>
            <MainScreen>
                <ArchiveOrderClass
                    ref={componentRef}
                />
                <div className={classes.buttonContainer} >
                    {loading ? 
                        <CircularProgress color="inherit" />
                        : <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={onPrintPress}
                        >
                            {fa["print"]}
                        </Button>}
                </div>
            </MainScreen>
        </div>
    )
}


export default SceneWrapper(ArchiveOrderDetailes);