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
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { PRODUCTS } from "../../../consts";
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectCategoryModal from "../items/SelectCategoryModal";
import SimpleBackdrop from '../../../common/SimpleBackdrop';
import ProductStoreItem from "../../store/items/ProductStoreItem";
import fa from "../../../translation/fa";
import converEnglishNumToPersian from "../../../utils/EnglishNumToPersianNum";
import numberWithCommas from "../../../utils/commaSeperator";
import { 
  Link
} from "react-router-dom";

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ListIcon from '@material-ui/icons/List';
import Crop54Icon from '@material-ui/icons/Crop54';

function DisableElevation(showDetails, setShowDetails) {
  return (
    <ButtonGroup disableElevation variant="contained" color="primary">
      <Button onClick={()=>setShowDetails(false)} startIcon={<ListIcon/>} variant={showDetails ? 'outlined' : 'contained'} />
      <Button onClick={()=>setShowDetails(true)} startIcon={<Crop54Icon/>} variant={!showDetails ? 'outlined' : 'contained'} />
    </ButtonGroup>
  );
}


const limit = 20

function Products() {

    const [isFetching, setIsFetching] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false)
    const isScrolling =()=>{
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 3 / 4)) {
           console.log("you're at the bottom of the page ... ");
           setIsFetching(true);
           // Show loading spinner and make fetch request to api
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll", isScrolling);
        return () => window.removeEventListener("scroll", isScrolling);
    }, [])

    useEffect(() => {
        if (isFetching){
            fetchProducts();
        }
    }, [isFetching]);

    const products = useSelector(state=>state.general_reducer.products)
    const dispatch = useDispatch()

    const [name, setName] = useState("");
    const [page, setPage] = useState(0);
    const [finished, setFinished] = useState(false);
    const [category, set_category] = useState(null)

    useEffect(()=>{
        fetchProducts()
    },[])

    useEffect(()=>{
        fetchProducts()
    },[category])

    async function fetchProducts(searchValue, reload) { 
        if(finished && !reload){
            return;
        }
        const queries = { page: reload ? 0 : page, limit }
        if(searchValue) {
            queries.name = searchValue
        } else if (name && !reload) {
            queries.name = name
        }
        if(category){
            queries.cat_id = category._id
        }
        try {
            const {data} = await API.get("business/product", queries);
            dispatch(updateGeneralProps({
                key: PRODUCTS,
                value: page === 0 ? data : [ ...products, ...data]
            }))

            setPage(page + limit);
            if(data.length < 10)
                setFinished(true);
        } catch (error) {
            console.log("error : ", error);
        }
        setIsFetching(false);
        setLoading(false);
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
            fetchProducts(value, true)
        }, 500),
        [category]
    );

    function onSearchValueChange(event) {
        setName(event.target.value);
        setPage(0);
        setFinished(false);
        debounceCallback(event.target.value)
    }

    function onCatChange(newCat) {
        setPage(0);
        setFinished(false);
        setTimeout(()=>{
            set_category(newCat);
        },0);
    }

    return(
        <div className={"mainScreen"}>
            <Header title={category ? category.name : ""} />
            <SelectCategoryModal
                category={category}
                set_category={onCatChange}
            />
            <MainScreen>
            {DisableElevation(showDetails, setShowDetails)}
                <SearchInput value={name} onChange={onSearchValueChange} />
                <div className={"mainItemsContainer"} >
                    {products.map(product=>(
                        !showDetails ? 
                            <ProductStoreItem {...product} title={`${converEnglishNumToPersian(product?.count)} ${fa['box']} : ${product?.name}`} value={
                                fa["buy"] + " " + converEnglishNumToPersian(numberWithCommas(product?.buy_price))}/> :
                          <ProductItem onDeleteProduct={onDeleteProduct} key={product._id} product={product} />
                    ))}
                    {!finished && <CircularProgress />}
                </div>
            </MainScreen>
            <AddButton link={"addproduct"} />
        </div>
    )
}

export default SceneWrapper(Products)