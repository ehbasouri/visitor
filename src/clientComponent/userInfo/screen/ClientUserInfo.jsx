import React from "react";
import ClientSceneWrapper from "../../../SceneWrapper/ClientSceneWrapper";
import { Header } from "../../../common/Header";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { ClientUserInfoItem } from "../items/ClientUserInfoItem";
import MainScreen from "../../../common/MainScreen";
import { useSelector } from "react-redux";
import fa from "../../../translation/fa";
import Button from '@material-ui/core/Button';
import { 
    Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { HOST } from "../../../service/api";

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

function ClientUserInfo(params) {
    const user_info = useSelector(state=>state.general_reducer.user_info)
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
                        image={HOST + user_info.avatar}
                        title=""
                        className={classes.image}
                    />
                    <List>
                        <ClientUserInfoItem title={fa["name"]} value={user_info.name}/>
                        <Divider />
                        <ClientUserInfoItem title={fa["email"]} value={user_info.email}/>
                        <Divider />
                        <ClientUserInfoItem title={fa["address"]} value={user_info.address}/>
                        <Divider />
                        <ClientUserInfoItem title={fa["phone"]} value={user_info.phone}/>
                        <Divider />
                        <ClientUserInfoItem title={fa["mobile"]} value={user_info.mobile}/>
                        <Divider />
                        <Link to={"updateuserinfo"} style={{color: "#fff"}} >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                // className={classes.submit}
                                // onClick={updateProduct}
                            >
                                {fa["edit"]}
                            </Button>
                        </Link>
                    </List>
                </MainScreen>
            </div>
        </div>
    )
}

export default ClientSceneWrapper(ClientUserInfo);