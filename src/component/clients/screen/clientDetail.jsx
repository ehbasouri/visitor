import React from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import { Header } from "../../../common/Header";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MainScreen from "../../../common/MainScreen";
import { useSelector } from "react-redux";
import fa from "../../../translation/fa";
import Button from '@material-ui/core/Button';
import { 
    Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { API, HOST } from "../../../service/api";
import { ClientUserInfoItem } from "../../userInfo/items/ClientUserInfoItem";
import {useParams} from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

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
        backgroundColor: "#C1C1C1",
        width: 140,
        height: 140,
        borderRadius: 70
    }
}));

function ClientDetail(params) {

    let { id } = useParams();
    const [user_detailes, set_user_detailes] = useState({})

    console.log("id : ", id)

    useEffect(()=>{
        fetchUser();
    },[])

    async function fetchUser(params) {
        try {
            const {data} = await API.get("business/getusers",{_id: id});
            console.log("data : ", data);
            set_user_detailes(data.users[0]);
        } catch (error) {
            console.log("error : ", error)
        }
    }

    const classes = useStyles();

    return(
        <div className={"mainScreen"}>
            <Header/>
            <div className={"mainContainer"} >
                <MainScreen>
                    <CardMedia
                        component="img"
                        alt=""
                        height="140"
                        image={HOST + user_detailes.avatar}
                        title=""
                        className={classes.image}
                    />
                    <List>
                        <ClientUserInfoItem title={fa["name"]} value={user_detailes.name}/>
                        <Divider />
                        <ClientUserInfoItem title={fa["email"]} value={user_detailes.email}/>
                        <Divider />
                        <ClientUserInfoItem title={fa["address"]} value={user_detailes.address}/>
                        <Divider />
                        <ClientUserInfoItem title={fa["phone"]} value={user_detailes.phone}/>
                        <Divider />
                        <ClientUserInfoItem title={fa["mobile"]} value={user_detailes.mobile}/>
                    </List>
                    
                    <Link to={"/admin/addorderbusiness/" + user_detailes._id} >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            {fa["add order"]}
                        </Button>
                    </Link>
                </MainScreen>
            </div>
        </div>
    )
}

export default SceneWrapper(ClientDetail);