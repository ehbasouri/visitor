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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MainScreen from "../../../common/MainScreen";
import BasketIcon from "../../../common/BasketIcon";
import { useSelector } from 'react-redux';

function ClientProducts({router}) {

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const basket = useSelector(state=>state.general_reducer.basket)

    useEffect(()=>{
        fetchProducts()
    },[])

    async function fetchProducts(searchValue) {
        const queries = { business_id: "60af7c5b596a15642b1c924a" }
        if(searchValue) queries.name= searchValue
        try {
            const {data} = await API.get("product", queries);
            setProducts(data);
        } catch (error) {
            console.log("error : ", error);
        }
    }

    function onDeleteProduct(delCat) {
        const productList = JSON.parse(JSON.stringify(products));
        const updatedLidt = productList.filter(item=>item._id != delCat._id);
        setProducts(updatedLidt);
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
            <Header backEnabled={false} />
            <MainScreen>
                <SearchInput value={name} onChange={onSearchValueChange} />
                {products.map(product=>(
                    <ClientProductItem onDeleteProduct={onDeleteProduct} key={product._id} product={product} />
                ))}
            </MainScreen>
                {basket.products.length > 0 && <AddButton
                    link={"basket"}
                    icon={<BasketIcon/>}
                />}
        </div>
    )
}

export default ClientSceneWrapper(ClientProducts)