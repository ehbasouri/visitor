import React from "react";
import {useHistory} from "react-router-dom";
import { Header } from "../../../common/Header";
import BasketItem from "../items/BasketItem";
import ClientSceneWrapper from "../../../SceneWrapper/ClientSceneWrapper";
import { useSelector } from 'react-redux';
import MainScreen from "../../../common/MainScreen";
import TextField from '@material-ui/core/TextField';
import SimpleBackdrop from "../../../common/SimpleBackdrop";
import Button from '@material-ui/core/Button';
import fa from "../../../translation/fa";
import { useState } from "react";
import { API } from "../../../service/api";
import { useDispatch } from "react-redux"
import { updateGeneralProps } from "../../../redux/actions";
import { BASKET } from "../../../consts";
import initialState from "../../../redux/reducer/initialState.json"


function ClientBasket() {

    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");

    const basket = useSelector(state=>state.general_reducer.basket)
    const user_info = useSelector(state=>state.general_reducer.user_info)
    const business = useSelector(state=>state.general_reducer.business)
    const dispatch = useDispatch();
    const history = useHistory();

    function handleChange(e) {
        setComment(e.target.value);
    }

    async function onSubmit() {
        setLoading(true)
        const orderData = {
            ...basket,
            business_id: business._id,
            client_id: user_info._id,
            client: user_info,
            comment,
            business
        }
        if(comment.length === 0) delete orderData.comment
        try {
            const {data} = await API.post("order", orderData);
            dispatch(updateGeneralProps({
                key: BASKET, value: initialState.basket
            }))
            history.goBack()
        } catch (error) {
            console.log("error : ", error.response);
        }
        setLoading(false)
    }

    return(
        <div className={"mainScreen"}>
            <Header/>
            <MainScreen>
                {basket.products.map(product=>(
                    <BasketItem key={product._id} product={product} />
                ))}
                <TextField
                  id="filled-multiline-flexible"
                  multiline
                  variant="outlined"
                  rowsMax={4}
                  value={comment}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  label={fa["description"]}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    // className={classes.submit}
                    onClick={onSubmit}
                >
                    {fa["submit"]}
                </Button>
            </MainScreen>
          <SimpleBackdrop
            open={loading}
            setOpen={setLoading}
          />
        </div>
    )
}

export default ClientSceneWrapper(ClientBasket)