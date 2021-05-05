import React from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import AddButton from "../../common/AddButton";
import { Header } from "../../common/Header";
import { SearchInput } from "../../common/SearchInput";
import ProductItem from "../items/ProductItem";

function Products(params) {
    return(
        <div className={"mainScreen"}>
            <Header/>
            <SearchInput/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <AddButton/>
        </div>
    )
}

export default SceneWrapper(Products)