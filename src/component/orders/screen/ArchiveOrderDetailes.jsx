import React from "react";
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

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        padding: "10px",
        display: "flex",
    },
    canceledText: {
      color: "red"
    }
  }));

function ArchiveOrderDetail(params) {
    const classes = useStyles();

    let { id } = useParams();

    const [orderDetails, setOrderDetails] = useState(null);
    const [readyToPrint, setReadyToPrint] = useState(false);
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
        orderDetails.products.map(product=> totalPrice = totalPrice + (product.price * product.countInBasket))
        return totalPrice - orderDetails.discount;
    }

    function onPrintPress(params) {
        setReadyToPrint(true)
        setTimeout(()=>{
            window.print()
            setReadyToPrint(false)
        }, 500)
    }

    return(
        <div className={"mainScreen"}>
            {!readyToPrint && <Header/>}
            { orderDetails && <MainScreen>
                <ArchiveOrderItem
                    title={fa["client"]}
                    value={orderDetails.client.name}
                />
                {orderDetails.products.map((product)=>(
                    <InvoiceIrem key={product._id} product={product} />
                ))}
                <ArchiveOrderItem
                    title={fa["discount"]}
                    value={converEnglishNumToPersian(numberWithCommas(orderDetails.discount)) + " " + fa["toman"]  }
                />
                <ArchiveOrderItem
                    title={fa["total price"]}
                    value={converEnglishNumToPersian(numberWithCommas(getTotalPrice())) + " " + fa["toman"]  }
                />
                {orderDetails.status === "archive" &&<SignItem date={orderDetails.updated_at} />}
                { !readyToPrint && orderDetails.status === "archive" && <div className={classes.buttonContainer} >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={onPrintPress}
                    >
                        {fa["print"]}
                    </Button>
                </div>}
                {orderDetails.status === "cancel" && <Typography align={"left"} variant="subtitle1" className={classes.canceledText}>
                    {fa["canceled"]}
                    <CancelIcon/>
                </Typography> }
            </MainScreen>}
        </div>
    )
}

export default SceneWrapper(ArchiveOrderDetail);