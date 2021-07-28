import React, {  } from 'react';
import Container from '@material-ui/core/Container';
import {useAuthStyles} from "../auth.style"
import { LoginProvider } from './useLoginContext';
import { AuthButton, AuthIcon, AuthTitle, AuthUserNameTextInput, AuthPasswordTextInput, AuthLinkButton, AuthAlertComponent, AuthSimpleBackdrop, AuthNameTextInput } from '../items';
import { useAuth } from './useAuth';

function RegisterComponent({children}) {

    const classes = useAuthStyles();

    const {
      username, 
      password, 
      onUsernameChange, 
      onPasswordChange, 
      onRegister,
      showAlert, 
      setShowAlert, 
      message,
      loading,
      setLoading,
      name,
      onNameChange
    } = useAuth();
  

  return (
    <LoginProvider 
        value={{
            username, 
            password, 
            onUsernameChange, 
            onPasswordChange, 
            onSubmit: onRegister,
            showAlert, 
            setShowAlert, 
            message,
            loading,
            setLoading,
            name,
            onNameChange
        }} >
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
              {children}
          </div>
        </Container>
    </LoginProvider>
  );
}

RegisterComponent.RegisterIcon = AuthIcon;
RegisterComponent.RegisterButton = AuthButton;
RegisterComponent.RegisterLinkButton = AuthLinkButton;
RegisterComponent.RegisterTitle = AuthTitle;
RegisterComponent.RegisterUserNameTextInput = AuthUserNameTextInput;
RegisterComponent.RegisterPasswordTextInput = AuthPasswordTextInput;
RegisterComponent.RegisterAlertComponent = AuthAlertComponent;
RegisterComponent.RegisterSimpleBackdrop = AuthSimpleBackdrop;
RegisterComponent.RegisterNameTextInput = AuthNameTextInput;

export {RegisterComponent};