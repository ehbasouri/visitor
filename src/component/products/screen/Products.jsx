import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import { API } from "../../../service/api";
import AddButton from "../../common/AddButton";
import { Header } from "../../common/Header";
import { SearchInput } from "../../common/SearchInput";
import ProductItem from "../items/ProductItem";

function Products({router}) {

    console.log("router : ", router);

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetchProducts()
    },[])

    async function fetchProducts(params) {
        try {
            const {data} = await API.get("business/product");
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

    return(
        <div className={"mainScreen"}>
            <Header/>
            <SearchInput/>
            {products.map(product=>(
                <ProductItem onDeleteProduct={onDeleteProduct} key={product._id} product={product} />
            ))}
            <AddButton link={"addproduct"} />
        </div>
    )
}

export default SceneWrapper(Products)