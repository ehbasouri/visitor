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
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectCategoryModal from "../items/SelectCategoryModal";
import SimpleBackdrop from '../../../common/SimpleBackdrop';

const limit = 10

function ClientProducts({router}) {

    const {id} = useParams(); 

    const [isFetching, setIsFetching] = useState(false);
    const [loading, setLoading] = useState(true);

    const isScrolling =()=>{
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 3 / 4)) {
           console.log("you're at the bottom of the page");
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




    const [name, setName] = useState("");
    const [page, setPage] = useState(0);
    const [finished, setFinished] = useState(false);
    const [category, set_category] = useState(null)
    
    const basket = useSelector(state=>state.general_reducer.basket)
    const business = useSelector(state=>state.general_reducer.business)


    const products = useSelector(state=>state.general_reducer.products)
    const dispatch = useDispatch()

    useEffect(()=>{
        fetchProducts()
    },[])

    useEffect(()=>{
        fetchProducts()
    },[category])


    async function fetchProducts(searchValue) {
        console.log("fetch more ", finished );
        if(finished){
            return;
        }
        const queries = { business_id: id, page, limit }
        if(searchValue) {
            queries.name = searchValue
        } else if (name) {
            queries.name = name
        }
        if(category){
            queries.cat_id = category._id
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
            fetchProducts(value)
        }, 500),
        []
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
            <Header title={category ? category.name : business.name} />
            <SelectCategoryModal
                category={category}
                set_category={onCatChange}
            />
            <MainScreen>
                <SearchInput value={name} onChange={onSearchValueChange} />
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

          <SimpleBackdrop
            open={loading}
            setOpen={setLoading}
          />
        </div>
    )
}

export default ClientSceneWrapper(ClientProducts)