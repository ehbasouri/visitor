import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ClientSceneWrapper from '../../../SceneWrapper/ClientSceneWrapper';
import AuthContext from '../../../App/AuthApi';
import SimpleBackdrop from '../../../common/SimpleBackdrop';
import { API, HOST } from '../../../service/api';
import { handleApiErrors } from '../../../utils/handleApiErrors';
import {Link} from "react-router-dom";
import { AlertComponent } from '../../../common/AlertComponent';
import fa from '../../../translation/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component'; 
import { firebsaeAnalyticsLogEvent } from '../../../utils/firebaseAnalyticsLogEvent';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      
      <Link to={"login"}>
        {fa["login"]}
      </Link>
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 20
  }
}));

function ClientRegister({history}) {

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const Auth = useContext(AuthContext);

  async function onSubmit() {
    if(username.length < 1 || password.length < 1){
      setShowAlert(true);
      setMessage(fa["please enter name and username and password"])
      return;
    }
    setLoading(true);
    try {
      const {data} = await API.post("register",{
        username,
        password,
        name
      })
      firebsaeAnalyticsLogEvent("client_register_success")
      firebsaeAnalyticsLogEvent(username + "_register_success")
      Auth.signIn(data);
    } catch (error) {
      firebsaeAnalyticsLogEvent("client_register_error")
      firebsaeAnalyticsLogEvent("client_register_error")
      const errorMessage = handleApiErrors(error);
      setMessage(errorMessage);
      setShowAlert(true);
    }
    setLoading(false);
  }

  function onUsernameChange(value) {
    setUsername(value.target.value)
  }

  function onNameChange(value) {
    setName(value.target.value)
  }

  function onPasswordChange(value) {
    setPassword(value.target.value)
  }
  return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
              <LazyLoadImage
                alt="Contemplative Reptile"
                height="140"
                src={HOST + "6621061752611b4ac8a58b4985e71f9e"} 
                width="100%" 
                className={classes.icon}
              />
              <Typography align={"left"} component="h5" variant="h6">
                {fa["Client register page"]}
              </Typography>
              {/* <form className={classes.form} > */}
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label={fa["name"]}
                  autoFocus
                  onChange={onNameChange}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label={fa["username"]}
                  onChange={onUsernameChange}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={fa["password"]}
                  type="password"
                  // id="password"
                  autoComplete="current-password"
                  onChange={onPasswordChange}
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSubmit}
              >
                  {fa["register"]}
              </Button>
              {/* </form> */}
          </div>
          <Box mt={8}>
              <Copyright />
          </Box>
          <AlertComponent
            open={showAlert}
            setOpen={setShowAlert}
            message={message}
          />
          <SimpleBackdrop
            open={loading}
            setOpen={setLoading}
          />
        </Container>
  );
}

export default ClientSceneWrapper(ClientRegister)