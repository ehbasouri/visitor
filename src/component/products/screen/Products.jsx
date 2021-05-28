import React, {useCallback} from "react";
import { useState } from "react";
import { useEffect } from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import { API } from "../../../service/api";
import { debounce } from "../../../utils/debounce";
import AddButton from "../../../common/AddButton";
import { Header } from "../../../common/Header";
import { SearchInput } from "../../../common/SearchInput";
import ProductItem from "../items/ProductItem";
import MainScreen from "../../../common/MainScreen";

function Products({router}) {

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");

    useEffect(()=>{
        fetchProducts()
    },[])

    async function fetchProducts(searchValue) {
        const queries = {}
        if(searchValue) queries.name= searchValue
        try {
            const {data} = await API.get("business/product", queries);
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
            <Header/>
            <MainScreen>
                <SearchInput value={name} onChange={onSearchValueChange} />
                {products.map(product=>(
                    <ProductItem onDeleteProduct={onDeleteProduct} key={product._id} product={product} />
                ))}
            </MainScreen>
            <AddButton link={"addproduct"} />
        </div>
    )
}

export default SceneWrapper(Products)