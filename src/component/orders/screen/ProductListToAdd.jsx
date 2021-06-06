import React, {useCallback} from "react";
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
    }
  }));

function ProductListToAdd({closeFnc, onAddPress, productList = []}) {

    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [addedProductList, setAddedProductList] = useState(productList);
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
            <Header
                backEnabled={false}
                rightComponent={
                <IconButton onClick={closeFnc} edge="center" color="inherit" >
                    <CloseIcon />
                </IconButton>}
            />
                <MainScreen>
                    <SearchInput value={name} onChange={onSearchValueChange} />
                    <List className={classes.root} subheader={<li />}>
                        {products.map(product=>(
                            <ProductItemToaddInOrder 
                                productList={addedProductList} 
                                setAddedProductList={setAddedProductList}
                                key={product._id} 
                                product={product} />
                        ))}
                    </List>
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
                </MainScreen>
        </div>
    )
}

export default SceneWrapper(ProductListToAdd);