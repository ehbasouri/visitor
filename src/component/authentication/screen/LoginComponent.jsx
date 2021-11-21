import React from "react";
import Container from "@material-ui/core/Container";
import { useAuthStyles } from "../auth.style";
import { LoginProvider } from "./useLoginContext";
import {
  AuthButton,
  AuthIcon,
  AuthTitle,
  AuthUserNameTextInput,
  AuthPasswordTextInput,
  AuthLinkButton,
  AuthAlertComponent,
  AuthSimpleBackdrop,
} from "../items";
import { useAuth } from "./useAuth";

function LoginComponent({ children }) {
  const classes = useAuthStyles();

  const {
    username,
    password,
    onUsernameChange,
    onPasswordChange,
    onLogin,
    showAlert,
    setShowAlert,
    message,
    loading,
    setLoading,
  } = useAuth();

  return (
    <LoginProvider
      value={{
        username,
        password,
        onUsernameChange,
        onPasswordChange,
        onSubmit: onLogin,
        showAlert,
        setShowAlert,
        message,
        loading,
        setLoading,
      }}
    >
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>{children}</div>
      </Container>
    </LoginProvider>
  );
}

LoginComponent.LoginIcon = AuthIcon;
LoginComponent.LoginButton = AuthButton;
LoginComponent.LoginLinkButton = AuthLinkButton;
LoginComponent.LoginTitle = AuthTitle;
LoginComponent.LoginUserNameTextInput = AuthUserNameTextInput;
LoginComponent.LoginPasswordTextInput = AuthPasswordTextInput;
LoginComponent.LoginAlertComponent = AuthAlertComponent;
LoginComponent.LoginSimpleBackdrop = AuthSimpleBackdrop;

export { LoginComponent };
