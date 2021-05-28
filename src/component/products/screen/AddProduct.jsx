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
    }
  }));

function AddClient(params) {
    
    let { id } = useParams();

    const [loading, setLoading] = useState(id ? true : false);
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [buy_price, set_buy_price] = useState(0)
    const [category, set_category] = useState(null)
    const [store_id, set_store_id] = useState("1")
    const [count, setCount] = useState(0)
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [localImage, setLocalImage] = useState(null);
    const [severity, setSeverity] = useState("error");

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const classes = useStyles();

    useEffect(()=>{
        if(id) fetchOrderDetail()
    },[])

    async function fetchOrderDetail(params) {
        try {
            const {data} = await API.get("business/product",{_id: id});
            if(data.length > 0){
                setName(data[0].name);
                setPrice(data[0].price);
                set_buy_price(data[0].buy_price);
                setLocalImage(HOST + data[0].image)
                setCount(data[0].count)
                setDescription(data[0].description)
                set_category({_id : data[0].cat_id, name: "select Category"})
            }
            console.log("data : ", data);
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
        setLoading(true);
        const productData = {
            name,
            price,
            buy_price,
            cat_id: category._id,
            store_id,
            count,
            description
        }
        try {

            const imageUploadResponse = await API.multipartPost(image);
            productData.image = imageUploadResponse.data.filename;
            const { data } = await API.post("business/product", productData);
            setMessage("product is created");
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
                            height="140"
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
                        label="name"
                        autoFocus
                        onChange={e=>setName(e.target.value)}
                        value={name}
                        defaultValue={name}
                    />
                    <DropDown
                        label={"store"}
                    />
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
                        label="price"
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
                        label="buy price"
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
                        label="count"
                        onChange={e=>setCount(e.target.value)}
                        value={count}
                        defaultValue={count}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="description"
                        onChange={e=>setDescription(e.target.value)}
                        value={description}
                        defaultValue={description}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        // className={classes.submit}
                        onClick={onRegister}
                    >
                    {"Register"}
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