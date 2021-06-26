import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {useParams} from "react-router-dom";
import { Header } from "../../../common/Header";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import { API } from "../../../service/api";
import MainScreen from "../../../common/MainScreen";
import { makeStyles } from '@material-ui/core/styles';
import ProductStoreItem from "../items/ProductStoreItem";
import converEnglishNumToPersian from "../../../utils/EnglishNumToPersianNum";
import numberWithCommas from "../../../utils/commaSeperator";

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        padding: "10px",
        display: "flex",
    },
    canceledText: {
      color: "red"
    }
  }));

function StoreDetail(params) {
    const classes = useStyles();

    let { id } = useParams();

    const [products, setProducts] = useState([]);
    
    useEffect(()=>{
        fetchProducts()
    },[])

    async function fetchProducts() {
        const queries = { store_id: id }
        try {
            const {data} = await API.get("business/product", queries);
            setProducts(data);
        } catch (error) {
            console.log("error : ", error);
        }
    }


    return(
        <div className={"mainScreen"}>
            <Header/>
            {<MainScreen>
                {products.map(product=>(
                    <ProductStoreItem
                        title={product.name}
                        value={converEnglishNumToPersian(numberWithCommas(product.count))}
                        image={product.image}
                    />
                ))}
            </MainScreen>}
        </div>
    )
}

export default SceneWrapper(StoreDetail);