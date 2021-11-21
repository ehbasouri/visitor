import { useContext, useState } from 'react';
import AuthContext from '../../../App/AuthApi';
import { API } from '../../../service/api';
import { handleApiErrors } from '../../../utils/handleApiErrors';
import fa from '../../../translation/fa';

function useAuth() {

    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const Auth = useContext(AuthContext);
  
    async function onRegister() {
      if(username.length < 1 || password.length < 1){
        setShowAlert(true);
        setMessage(fa["please enter name and username and password"])
        return;
      }
      setLoading(true);
      try {
        const {data} = await API.post("business/register",{
          username,
          password,
          name
        })
        Auth.signIn(data);
      } catch (error) {
        handleErrors(error)
      }
      setLoading(false);
    }

    async function onLogin() {
        if(username.length < 1 || password.length < 1){
          setShowAlert(true);
          setMessage(fa["please enter username and password"])
          return;
        }
        setLoading(true);
        try {
          const {data} = await API.post("business/login",{
            username,
            password
          })
          Auth.signIn(data);
        } catch (error) {
            handleErrors(error)
        }
        setLoading(false);
    }

    function handleErrors(error) {
        const errorMessage = handleApiErrors(error);
        setMessage(errorMessage);
        setShowAlert(true);
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

    return {
        //stat
        username, 
        password, 
        showAlert, 
        message,
        loading,
        name,
        // functions
        onUsernameChange, 
        onPasswordChange, 
        onRegister,
        onLogin,
        setShowAlert, 
        setLoading,
        onNameChange
    }

}

export {useAuth};