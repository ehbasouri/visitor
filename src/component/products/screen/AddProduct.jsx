import React, { useEffect, useState } from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import { Header } from "../../../common/Header";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DropDown from "../../../common/DropDown";
import SelectCategoryModal from "../items/SelectCategoryModal";
import SimpleBackdrop from "../../../common/SimpleBackdrop";
import { API, HOST } from "../../../service/api";
import { handleApiErrors } from "../../../utils/handleApiErrors";
import { AlertComponent } from "../../../common/AlertComponent";

import {
    useParams
} from "react-router-dom";

import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import MainScreen from "../../../common/MainScreen";
import fa from "../../../translation/fa";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
    imageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        backgroundColor: "#C1C1C1"
    },
    container: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        marginBottom: theme.spacing(3)   
    }
}));

function AddClient({history}) {
    
    let { id } = useParams();

    const [loading, setLoading] = useState(id ? true : false);
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [unit_price, set_unit_price] = useState(0) 
    const [buy_price, set_buy_price] = useState(0)
    const [category, set_category] = useState(null)
    const [store_id, set_store_id] = useState(null)
    const [count, setCount] = useState(0)
    const [count_in_box, set_count_in_box] = useState(0)
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [localImage, setLocalImage] = useState(null);
    const [severity, setSeverity] = useState("error");
    const [is_private, set_is_private] = useState(false);
    
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const classes = useStyles();

    useEffect(()=>{
        if(id) fetchOrderDetail()
    },[])

    useEffect(()=>{
        fetchClients();
      },[])
    
    async function fetchClients(params) {
        try {
        const {data} = await API.get("business/store")
            if(data.length > 0){
                set_store_id(data[0]._id);
            }
        } catch (error) {
        console.log("error : ", error);
        }
    }
      
    async function fetchOrderDetail(params) {
        try {
            const {data} = await API.get("business/product",{_id: id});
            console.log("data" , data[0])
            if(data.length > 0){
                setName(data[0].name);
                setPrice(data[0].price);
                set_unit_price(data[0].unit_price);
                
                set_buy_price(data[0].buy_price);
                setLocalImage(HOST + data[0].image)
                setCount(data[0].count)
                set_count_in_box(data[0].count_in_box)
                setDescription(data[0].description)
                set_is_private(data[0].is_private)
                set_category({_id : data[0].cat_id, name: fa["Select category"] })
            }
        } catch (error) {
            console.log("error : ", error);
        }     
        setLoading(false)   
    }

    async function onSubmit() {
        if(!image){
            setShowAlert(true);
            setMessage("please select image")
            setSeverity("error")
            return;
        }
        if(!name || !category ){
            setShowAlert(true);
            setMessage("please fill items")
            setSeverity("error")
            return;
        } 
        if(!store_id ){
            setShowAlert(true);
            setMessage("please create your store")
            setSeverity("error")
            return;
        } 
        setLoading(true);
        const productData = {
            name,
            price,
            buy_price,
            cat_id: category._id,
            store_id,
            count,
            description,
            is_private,
            unit_price,
            count_in_box
        }
        try {

            const imageUploadResponse = await API.multipartPost(image);
            productData.image = imageUploadResponse.data.filename;
            const { data } = await API.post("business/product", productData);
            setMessage("product is created");
            setShowAlert(true);
            setSeverity("success")
            history.goBack();
        } catch (error) {
            console.log("error : ", error);
            const errorMessage = handleApiErrors(error);
            setMessage(errorMessage);
            setShowAlert(true);
            setSeverity("error")
        }
        setLoading(false)
    }

    async function updateProduct(params) {

        if(!name || !category ){
            setShowAlert(true);
            setMessage("please fill items")
            setSeverity("error")
            return;
        }
        setLoading(true);
        const productData = {
            name,
            price,
            buy_price,
            cat_id: category._id,
            store_id,
            count,
            description,
            is_private,
            unit_price,
            count_in_box
        }
        try {

            if(image){
                const imageUploadResponse = await API.multipartPost(image);
                productData.image = imageUploadResponse.data.filename;
            }

            const { data } = await API.put("business/product", productData, {id});
            setMessage("updated");
            setShowAlert(true);
            setSeverity("success")
        } catch (error) {
            console.log("error : ", error);
            const errorMessage = handleApiErrors(error);
            setMessage(errorMessage);
            setShowAlert(true);
            setSeverity("error")
        }
        setLoading(false)
    }

    function onChangeFile(e) {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setLocalImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    function onRegister() {
        if (id) {
            updateProduct()
        } else {
            onSubmit()
        }
    }

    function handleChange(e) {
        set_is_private(e.target.checked)
    }

    return(
        <div className={"mainScreen"}>
            <Header/>
            <div className={"mainContainer"} >
                <MainScreen>
                    <div className={classes.imageContainer} >
                        <input accept="image/*" onChange={onChangeFile} className={classes.input} name={"file"} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                            </IconButton>
                        </label>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            width="100%"
                            height={null}
                            image={localImage}
                            title="Contemplative Reptile"
                            className={classes.image}
                        />
                    </div>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label={fa["name"]}
                        autoFocus
                        onChange={e=>setName(e.target.value)}
                        value={name}
                        defaultValue={name}
                    />
                    {/* <DropDown
                        label={fa["store"]}
                    /> */}
                    <SelectCategoryModal
                        category={category}
                        set_category={set_category}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="number"
                        fullWidth
                        label={fa["price"]}
                        onChange={e=>setPrice(e.target.value)}
                        value={price}
                        defaultValue={price}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="number"
                        fullWidth
                        label={fa["unit_price"]}
                        onChange={e=>set_unit_price(e.target.value)}
                        value={unit_price}
                        defaultValue={unit_price}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="number"
                        fullWidth
                        label={fa["buy price"]}
                        onChange={e=>set_buy_price(e.target.value)}
                        value={buy_price}
                        defaultValue={buy_price}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="number"
                        fullWidth
                        label={fa["count"]}
                        onChange={e=>setCount(e.target.value)}
                        value={count}
                        defaultValue={count}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="number"
                        fullWidth
                        label={fa["count_in_box"]}
                        onChange={e=>set_count_in_box(e.target.value)}
                        value={count_in_box}
                        defaultValue={count_in_box}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label={fa["description"]}
                        onChange={e=>setDescription(e.target.value)}
                        value={description}
                        defaultValue={description}
                    />
                    <div className={classes.container} >
                        <FormControlLabel
                            control={
                            <Switch
                                checked={is_private}
                                onChange={handleChange}
                                color="primary"
                            />
                            }
                            label={fa["private products"]}
                        />
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        // className={classes.submit}
                        onClick={onRegister}
                    >
                    {fa["submit"]}
                </Button>
            </MainScreen>
            </div>

            <SimpleBackdrop
                open={loading}
                setOpen={setLoading}
            />
            <AlertComponent
              open={showAlert}
              setOpen={setShowAlert}
              message={message}
              severity={severity}
            />
        </div>
    )
}

export default SceneWrapper(AddClient);