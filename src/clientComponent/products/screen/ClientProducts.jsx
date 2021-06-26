import React, {useCallback} from "react";
import { useState } from "react";
import { useEffect } from "react";
import ClientSceneWrapper from "../../../SceneWrapper/ClientSceneWrapper";
import { debounce } from "../../../utils/debounce";
import { Header } from "../../../common/Header";
import { SearchInput } from "../../../common/SearchInput";
import ClientProductItem from "../items/ClientProductItem";
import { API } from "../../../service/api";
import AddButton from "../../../common/AddButton";
import MainScreen from "../../../common/MainScreen";
import BasketIcon from "../../../common/BasketIcon";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { PRODUCTS } from "../../../consts";
import {useParams} from "react-router-dom";

function ClientProducts({router}) {

    const {id} = useParams();

    const [name, setName] = useState("");
    const basket = useSelector(state=>state.general_reducer.basket)
    const business = useSelector(state=>state.general_reducer.business)


    const products = useSelector(state=>state.general_reducer.products)
    const dispatch = useDispatch()

    useEffect(()=>{
        fetchProducts()
    },[])

    async function fetchProducts(searchValue) {
        const queries = { business_id: id }
        if(searchValue) queries.name= searchValue
        try {
            const {data} = await API.get("product", queries);
            dispatch(updateGeneralProps({
                key: PRODUCTS,
                value: data
            }));
        } catch (error) {
            console.log("error : ", error);
        }
    }

    function onDeleteProduct(delCat) {
        const productList = JSON.parse(JSON.stringify(products));
        const updatedLidt = productList.filter(item=>item._id != delCat._id);
        dispatch(updateGeneralProps({
            key: PRODUCTS,
            value: updatedLidt
        }))
    }

    const debounceCallback = useCallback(
        debounce((value) => {
            fetchProducts(value)
        }, 500),
        []
    );

    function onSearchValueChange(event) {
        setName(event.target.value);
        debounceCallback(event.target.value)
    }

    return(
        <div className={"mainScreen"}>
            <Header title={business.name} />
            <MainScreen>
                <SearchInput value={name} onChange={onSearchValueChange} />
                <div className={"mainItemsContainer"} >
                    {products.map(product=>(
                        <ClientProductItem onDeleteProduct={onDeleteProduct} key={product._id} product={product} />
                    ))}
                </div>
            </MainScreen>
                {basket.products.length > 0 && <AddButton
                    link={"/basket"}
                    icon={<BasketIcon/>}
                />}
        </div>
    )
}

export default ClientSceneWrapper(ClientProducts)