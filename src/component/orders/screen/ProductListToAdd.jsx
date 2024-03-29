import React, {useCallback, useRef} from "react";
import { useState } from "react";
import { useEffect } from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import { API } from "../../../service/api";
import { debounce } from "../../../utils/debounce";
import AddButton from "../../../common/AddButton";
import { SearchInput } from "../../../common/SearchInput";
import MainScreen from "../../../common/MainScreen";
import ProductItem from "../../products/items/ProductItem";
import { Header } from "../../../common/Header";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ProductItemToaddInOrder from "../../products/items/ProductItemToaddInOrder";
import Button from '@material-ui/core/Button';
import fa from "../../../translation/fa";
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectCategoryModal from "../../products/items/SelectCategoryModal";
import { AddOrRemoveItemButton } from "../items/AddOrRemoveItemButton";

const limit = 20

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      height: "75vh",
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    loader: {
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
    buttonContainer: {
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        backgroundColor: "#fff",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        alignItems: "center",
        justifyContent: "center"
    },
    itemContainer: {
        paddingBottom: theme.spacing(6)
    }
  }));

function ProductListToAdd({closeFnc, onAddPress, productList = [], isGift= false}) { 

    const classes = useStyles();

    const [isFetching, setIsFetching] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [addedProductList, setAddedProductList] = useState(productList);
    const [goingUp, setGoingUp] = useState(false);
    const prevScrollY = useRef(0);

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
        setLoading(true);
        try {
            const {data} = await API.get("business/product", queries);
            setProducts(page === 0 ? data : [ ...products, ...data]);

            setPage(page + limit);
            if(data.length < 10)
                setFinished(true);
        } catch (error) {
            console.log("error : ", error);
        }
        setIsFetching(false);
        setLoading(false);
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
            <Header
                backEnabled={false}
                rightComponent={
                <IconButton onClick={closeFnc} edge="center" color="inherit" >
                    <CloseIcon />
                </IconButton>} 
            />
                <MainScreen>
                    <SearchInput value={name} onChange={onSearchValueChange} />
                    {/* <List onScroll={isScrolling} id={"myModalID"} className={classes.root} subheader={<li />}> */}
                    <SelectCategoryModal
                        category={category}
                        set_category={onCatChange}
                    />
                        <div className={classes.itemContainer} >
                            {products.map(product=>(
                                <>
                                <ProductItemToaddInOrder 
                                    productList={addedProductList} 
                                    setAddedProductList={setAddedProductList}
                                    key={product._id} 
                                    isGift={isGift}
                                    product={product} />
                                </>
                            ))}
                            {loading && 
                                <div className={classes.loader} >
                                    <CircularProgress />
                                </div>
                            }
                        </div>
                    {/* </List> */}
                    <div className={classes.buttonContainer} >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={()=>{
                                onAddPress(addedProductList)
                                closeFnc()
                            }}
                        >
                            {fa["done"]}
                        </Button>
                    </div>
                </MainScreen>
        </div>
    )
}

export default SceneWrapper(ProductListToAdd);