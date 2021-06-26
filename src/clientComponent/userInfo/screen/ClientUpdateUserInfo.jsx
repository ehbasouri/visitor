import React, { useState } from "react";
import ClientSceneWrapper from "../../../SceneWrapper/ClientSceneWrapper";
import { Header } from "../../../common/Header";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SimpleBackdrop from "../../../common/SimpleBackdrop";
import { API, HOST } from "../../../service/api";
import { handleApiErrors } from "../../../utils/handleApiErrors";
import { AlertComponent } from "../../../common/AlertComponent";
import { useDispatch } from "react-redux"
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import MainScreen from "../../../common/MainScreen";
import fa from "../../../translation/fa";
import { useSelector } from "react-redux";
import { USER_INFO } from "../../../consts";
import { updateGeneralProps } from "../../../redux/actions";
import { useContext } from "react";
import AuthContext from "../../../App/AuthApi";
import { MOBILE_REGEX } from "../../../consts/mobileRegex";

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

function ClientUpdateUserInfo({history}) {
    
    const user_info = useSelector(state=>state.general_reducer.user_info)
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(user_info.name)
    const [email, setEmail] = useState(user_info.email)
    const [address, setAddress] = useState(user_info.address)
    const [phone, setPhone] = useState(user_info.phone)
    const [mobile, setMobile] = useState(user_info.mobile)
    const [image, setImage] = useState("")
    const [localImage, setLocalImage] = useState(HOST + user_info.avatar);
    const [severity, setSeverity] = useState("error");
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();

    const Auth = useContext(AuthContext);

    async function updateProduct() {
        const isMobileValid = MOBILE_REGEX.test(mobile);
        if (!isMobileValid || mobile.length !== 11) {
            setMessage(fa["please enter valid mobile"]);
            setShowAlert(true);
            setSeverity("error")
            return 
        }
        setLoading(true);
        const userData = {
            name,
            email,
            address,
            phone,
            mobile
        }
        try {
            if(image){
                const imageUploadResponse = await API.multipartPost(image);
                userData.avatar = imageUploadResponse.data.filename;
            }
            const { data } = await API.put("user", userData);
            Auth.signIn(data);
            dispatch(updateGeneralProps({
                key: USER_INFO,
                value: data.user
            }))
            setMessage("updated");
            setShowAlert(true);
            setSeverity("success");
            setTimeout(()=>{
                history.goBack()
            },1000)
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
                            alt=""
                            height="140"
                            image={localImage}
                            title=""
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label={fa["email"]}
                        onChange={e=>setEmail(e.target.value)}
                        value={email}
                        defaultValue={email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label={fa["address"]}
                        onChange={e=>setAddress(e.target.value)}
                        value={address}
                        defaultValue={address}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="number"
                        fullWidth
                        label={fa["phone"]}
                        onChange={e=>setPhone(e.target.value)}
                        value={phone}
                        defaultValue={phone}
                        helperText={"021XXXXXXXX"}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        type="number"
                        required
                        fullWidth
                        label={fa["mobile"]}
                        onChange={e=>setMobile(e.target.value)}
                        value={mobile}
                        defaultValue={mobile}
                        helperText={"0912XXXXXXX"}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        // className={classes.submit}
                        onClick={updateProduct}
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

export default ClientSceneWrapper(ClientUpdateUserInfo);