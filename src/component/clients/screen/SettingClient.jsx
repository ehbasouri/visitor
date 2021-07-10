import React, { useEffect } from 'react' 
import SceneWrapper from '../../../SceneWrapper/SceneWrapper'
import {useParams} from "react-router-dom";
import { Header } from "../../../common/Header";
import MainScreen from "../../../common/MainScreen";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import fa from '../../../translation/fa';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { API } from '../../../service/api';
import { useSelector } from 'react-redux';
import SimpleBackdrop from '../../../common/SimpleBackdrop';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column"
    },
    content: {
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }
}));

function SettingClient () {
    const history = useHistory();

    const classes = useStyles();

    let { id } = useParams();
    const [loading, set_loading] = React.useState(true);
    const [cbr_id, set_cbr_id] = React.useState(null);
    const [show_price, set_show_price] = React.useState(false);
    const [show_private_products, set_show_private_products] = React.useState(false);
    const user_info = useSelector(state=>state.general_reducer.user_info)

    useEffect(()=>{
        fetchCbr();
    },[])

    async function fetchCbr() {
        set_loading(true);
        try {
            const {data} = await API.get("cbr",{client_id: id, business_id: user_info._id })
            if(data.length > 0){
                set_show_price(data[0].show_price)
                set_show_private_products(data[0].show_private_products)
                set_cbr_id(data[0]._id)
            }
        } catch (error) {
            console.log("error : ", error);
        }
        set_loading(false)
    }

    async function onUpdate() {
        set_loading(true);
        try {
            const {data} = await API.put("business/cbr",{
                show_price, show_private_products
            },{
                id: cbr_id
            })
            history.goBack();
        } catch (error) {
            console.log("error : ", error);
        }
        set_loading(false);
    }

    async function onCreate() {
        set_loading(true);
        try {
            const {data} = await API.post("business/cbr",{
                show_price, show_private_products,
                client_id: id
            },{
                id: cbr_id
            })
            history.goBack();
        } catch (error) {
            console.log("error : ", error);
        }
        set_loading(false);
    }

    function onSubmit() {
        if (cbr_id) {
            onUpdate()
        } else {
            onCreate();
        }
    }

    function handleChange(value) {
        set_show_price(value.target.checked)
    }

    function handleChange2(value) {
        set_show_private_products(value.target.checked)
    }

    return(
        <div className={"mainScreen"}>
            <Header/>
            <div className={"mainContainer"} >
                <MainScreen>
                    <div className={classes.content} >
                        <div className={classes.container} >
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={show_price}
                                    onChange={handleChange}
                                    color="primary"
                                />
                                }
                                label={fa["show price"]}
                            />
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={show_private_products}
                                    onChange={handleChange2}
                                    color="primary"
                                />
                                }
                                label={fa["show private products"]}
                            />
                        </div>
                        <Button
                            onClick={onSubmit}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            {fa["submit"]}
                        </Button>
                    </div>
                </MainScreen>
            </div>

            <SimpleBackdrop
                open={loading}
                setOpen={set_loading}
            />
        </div>
    )
}

export default SceneWrapper(SettingClient);