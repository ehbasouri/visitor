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

function ClientArchiveOrderDetailes(params) {

    let { id } = useParams();

    const [orderDetails, setOrderDetails] = useState(null);
    const user_info = useSelector(state=>state.general_reducer.user_info)

    useEffect(()=>{
        fetchOrderDetail();
    },[])

    async function fetchOrderDetail() {
        try {
            const {data} = await API.get("client/order", {_id: id, client_id : user_info._id});
            console.log("data : ", data);
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
                <ArchiveOrderItem
                    title={fa["discount"]}
                    value={converEnglishNumToPersian(numberWithCommas(orderDetails.discount)) + " " + fa["toman"]  }
                />
                <ArchiveOrderItem
                    title={fa["total price"]}
                    value={converEnglishNumToPersian(numberWithCommas(getTotalPrice())) + " " + fa["toman"]  }
                />
            </MainScreen>}
        </div>
    )
}

export default ClientSceneWrapper(ClientArchiveOrderDetailes);