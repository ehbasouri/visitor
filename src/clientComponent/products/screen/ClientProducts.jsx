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
import { CBRS, PRODUCTS } from "../../../consts";
import {useParams} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectCategoryModal from "../items/SelectCategoryModal";
import SimpleBackdrop from '../../../common/SimpleBackdrop';
import ClientPackages from "../items/ClientPackages";
import { firebsaeAnalyticsLogEvent } from "../../../utils/firebaseAnalyticsLogEvent";

const limit = 10

function ClientProducts({router}) {

    const {id} = useParams(); 

    const [isFetching, setIsFetching] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fetchingCbr, setFetchingCbr] = useState(true);

    const isScrolling =()=>{
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 3 / 4)) {
           setIsFetching(true);
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

    const [name, setName] = useState("");
    const [page, setPage] = useState(0);
    const [finished, setFinished] = useState(false);
    const [category, set_category] = useState(null);
    
    const basket = useSelector(state=>state.general_reducer.basket)
    const business = useSelector(state=>state.general_reducer.business)
    const user_info = useSelector(state=>state.general_reducer.user_info)
    const cbrs = useSelector(state=>state.general_reducer.cbrs)

    const products = useSelector(state=>state.general_reducer.products)
    const dispatch = useDispatch()

    useEffect(()=>{
        fetchCbr();
        firebsaeAnalyticsLogEvent("client_products_screen")
    },[])

    useEffect(()=>{
        fetchProducts()
    },[fetchingCbr])

    useEffect(()=>{
        fetchProducts()
    },[category, fetchingCbr])

    async function fetchCbr() {
        setFetchingCbr(true);
        try {
            const {data} = await API.get("cbr",{client_id: user_info._id, business_id: id })
            if(data.length > 0){
                dispatch(updateGeneralProps({
                    key: CBRS,
                    value: {...cbrs, [data[0].business_id] : data[0] }
                }))
            }
        } catch (error) {
            console.log("error : ", error);
        }
        setFetchingCbr(false)
    }


    async function fetchProducts(searchValue, reload) {
        if(fetchingCbr && !reload) return;
        if(finished && !reload){
            return;
        }
        const queries = { business_id: id, page : reload ? 0 : page , limit  }
        if(searchValue) {
            queries.name = searchValue
        } else if (name && !reload) {
            queries.name = name
        }
        if(category){
            queries.cat_id = category._id
        }

        if(!cbrs[id]){
            queries.is_private = false
        } else if(!cbrs[id].show_private_products) {
            queries.is_private = cbrs[id].show_private_products 
        }

        try {
            const {data} = await API.get("product", queries);
            
            dispatch(updateGeneralProps({
                key: PRODUCTS,
                value: page === 0 ? data : [ ...products, ...data]
            }));
            setPage(page+ limit);
            if(data.length < 10)
                setFinished(true);
        } catch (error) {
            console.log("error : ", error);
        }
        setIsFetching(false)
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
        fetchingCbr ? null :
        <div className={"mainScreen"}>
            <Header title={category ? category.name : business.name} />
            <SelectCategoryModal
                category={category}
                set_category={onCatChange}
            />
            <SearchInput value={name} onChange={onSearchValueChange} />
            <ClientPackages business_id={id} />
            <MainScreen>
                <div className={"mainItemsContainer"} >
                    {products.map(product=>(
                        <ClientProductItem onDeleteProduct={onDeleteProduct} key={product._id} product={product} />
                    ))}
                    {!finished && <CircularProgress />}
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