import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import SimpleBackdrop from '../../../common/SimpleBackdrop';
import { API } from '../../../service/api';
import { handleApiErrors } from '../../../utils/handleApiErrors';
import {Link} from "react-router-dom";
import { AlertComponent } from '../../../common/AlertComponent';
import fa from '../../../translation/fa';
import { useSelector } from "react-redux";
import { Header } from '../../../common/Header';
import MainScreen from '../../../common/MainScreen';
import {useParams} from "react-router-dom";

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
}));

function AddStore({history}) {
  
    let { id, storeName } = useParams();

    console.log("id : ", id, storeName);

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState(storeName ? storeName : "");
  const classes = useStyles();

  async function onSubmit(params) {
    if(name.length < 1){
      setShowAlert(true);
      setMessage(fa["please enter name"])
      return;
    }
    setLoading(true);
    try {
      const {data} = id ?  await API.put("business/store",{name}, {id}) : 
      await API.post("business/store",{name})
      history.goBack();
    } catch (error) {
      const errorMessage = handleApiErrors(error);
      setMessage(errorMessage);
      setShowAlert(true);
    }
    setLoading(false);
  }

  function onNameChange(value) {
    setName(value.target.value)
  }

  return (
        <MainScreen >
          <Header/>
          <div className={classes.paper}>
              {/* <form className={classes.form} > */}
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label={fa["name"]}
                  autoFocus
                  onChange={onNameChange}
                  defaultValue={name}
                  value={name}
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSubmit}
              >
                  {fa["submit"]}
              </Button>
              {/* </form> */}
          </div>
          <AlertComponent
            open={showAlert}
            setOpen={setShowAlert}
            message={message}
          />
          <SimpleBackdrop
            open={loading}
            setOpen={setLoading}
          />
        </MainScreen>
  );
}

export default SceneWrapper(AddStore)