import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {useHistory, useParams} from "react-router-dom";
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
import Button from '@material-ui/core/Button';
import { firebsaeAnalyticsLogEvent } from "../../../utils/firebaseAnalyticsLogEvent";



function PackageDetailes(params) {

    let { id } = useParams();

    const history = useHistory();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const user_info = useSelector(state=>state.general_reducer.user_info)

    useEffect(()=>{
        fetchPackageDetail();
        firebsaeAnalyticsLogEvent("client_package_detailes_screen");
    },[])

    async function fetchPackageDetail() {
        try {
            const {data} = await API.get("client/package", {_id: id});
            setOrderDetails(data[0]);
        } catch (error) {
            console.log("error : ", error);
        }
    }

    function getTotalPrice() {
        let totalPrice = 0
        orderDetails.products.map(product=> totalPrice = totalPrice + (product.unit_price * product.unitCountInBasket) + (product.price * product.countInBasket))
        return totalPrice - orderDetails.discount;
    }

    
    async function onSubmit() {
        setLoading(true)
        const orderData = {
            ...orderDetails,
            client_id: user_info._id,
            client: user_info,
            is_package: true,
        }
        console.log('orderData : ', orderData);
        if(orderData.comment.length === 0) delete orderData.comment
        delete orderData.name
        delete orderData._id
        delete orderData.created_at
        delete orderData.updated_at
        delete orderData.__v
        try {
            const {data} = await API.post("order", orderData);
            console.log('data : ', data);
            history.replace("/orders/active")
        } catch (error) {
            console.log("error : ", error);
        }
        setLoading(false)
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    // className={classes.submit}
                    onClick={onSubmit}
                >
                    {fa["submit"]}
                </Button>
            </MainScreen>}
        </div>
    )
}

export default ClientSceneWrapper(PackageDetailes);
