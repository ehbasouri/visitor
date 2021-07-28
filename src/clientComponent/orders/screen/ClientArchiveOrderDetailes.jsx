import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {useParams} from "react-router-dom";
import { Header } from "../../../common/Header";
import ClientSceneWrapper from "../../../SceneWrapper/ClientSceneWrapper";
import { API } from "../../../service/api";
import { useSelector } from 'react-redux';
import MainScreen from "../../../common/MainScreen";
import fa from "../../../translation/fa";
import InvoiceIrem from "../../../component/orders/items/InvoiceItem";
import ArchiveOrderItem from "../../../component/orders/items/ArchiveOrderItem";
import converEnglishNumToPersian from "../../../utils/EnglishNumToPersianNum";
import numberWithCommas from "../../../utils/commaSeperator";

import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import { firebsaeAnalyticsLogEvent } from "../../../utils/firebaseAnalyticsLogEvent";

function ClientArchiveOrderDetailes(params) {

    let { id } = useParams();

    const [orderDetails, setOrderDetails] = useState(null);
    const user_info = useSelector(state=>state.general_reducer.user_info)

    useEffect(()=>{
        fetchOrderDetail();
        firebsaeAnalyticsLogEvent("client_archive_order_detailes_screen")
    },[])

    async function fetchOrderDetail() {
        try {
            const {data} = await API.get("client/order", {_id: id, client_id : user_info._id});
            setOrderDetails(data[0]);
        } catch (error) {
            console.log("error : ", error);
        }
    }

    // function getTotalPrice() {
    //     let totalPrice = 0
    //     orderDetails.products.map(product=> totalPrice = totalPrice + (product.unit_price * product.unitCountInBasket) + (product.price * product.countInBasket))
    //     return totalPrice - orderDetails.discount;
    // }

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

    return(
        <div className={"mainScreen"}>
            <Header/>
            { orderDetails && <MainScreen>
                <ArchiveOrderItem
                    title={fa["shopping store"]}
                    value={orderDetails.business.name}
                />
                {orderDetails.products.map((product)=>(
                    <InvoiceIrem key={product._id} product={product} />
                ))}
                {orderDetails.gift.map((product)=>(
                    <InvoiceIrem gift key={product._id} product={product} />
                ))}
                { orderDetails.discount > 0 && <ArchiveOrderItem
                    title={fa["discount"]}
                    value={converEnglishNumToPersian(numberWithCommas(orderDetails.discount)) + " " + fa["toman"]  }
                />}
                <ArchiveOrderItem
                    title={fa["total price"]}
                    value={converEnglishNumToPersian(numberWithCommas(getTotalPrice())) + " " + fa["toman"]  }
                />
                { orderDetails.paied_amount && getTotalPrice() !== orderDetails.paied_amount && <ArchiveOrderItem
                    title={fa["paied amount"]}
                    value={converEnglishNumToPersian(numberWithCommas(orderDetails.paied_amount)) + " " + fa["toman"]  }
                />}
                {orderDetails.paied_amount && getTotalPrice() !== orderDetails.paied_amount && <ArchiveOrderItem
                    title={fa["debt amount"]}
                    value={converEnglishNumToPersian(numberWithCommas(getTotalPrice() - orderDetails.paied_amount)) + " " + fa["toman"]  }
                />}
            </MainScreen>}
        </div>
    )
}

export default ClientSceneWrapper(ClientArchiveOrderDetailes);
