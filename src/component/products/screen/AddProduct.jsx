import React, { useState } from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import { Header } from "../../common/Header";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DropDown from "../../common/DropDown";
import SelectCategoryModal from "../items/SelectCategoryModal";
import SimpleBackdrop from "../../common/SimpleBackdrop";
import { API } from "../../../service/api";
import { handleApiErrors } from "../../../utils/handleApiErrors";
import { AlertComponent } from "../../common/AlertComponent";

function AddClient(params) {
    
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [buy_price, set_buy_price] = useState(0)
    const [category, set_category] = useState(null)
    const [store_id, set_store_id] = useState("1")
    const [count, setCount] = useState(0)
    const [description, setDescription] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");

    async function onSubmit() {
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
            const { data } = await API.post("business/product", productData);
            console.log("data : ", data);
            setMessage("errorMessage");
            setShowAlert(true);
        } catch (error) {
            console.log("error : ", error);
            const errorMessage = handleApiErrors(error);
            setMessage(errorMessage);
            setShowAlert(true);
        }
        setLoading(false)
    }

    return(
        <div className={"mainScreen"}>
            <Header/>
            <div className={"mainContainer"} >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="name"
                    autoFocus
                    onChange={e=>setName(e.target.value)}
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
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    type="number"
                    fullWidth
                    label="buy price"
                    onChange={e=>set_buy_price(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    type="number"
                    fullWidth
                    label="count"
                    onChange={e=>setCount(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="description"
                    onChange={e=>setDescription(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    // className={classes.submit}
                    onClick={onSubmit}
                >
                  {"Register"}
              </Button>
            </div>

            <SimpleBackdrop
                open={loading}
                setOpen={setLoading}
            />
            <AlertComponent
              open={showAlert}
              setOpen={setShowAlert}
              message={message}
            />
        </div>
    )
}

export default SceneWrapper(AddClient);