import React from "react";
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import fa from "../../../translation/fa";
import { LoginComponent } from "./LoginComponent";

function Login() {
  return(
    <LoginComponent>
      <LoginComponent.LoginIcon/>
      <LoginComponent.LoginTitle/>
      <LoginComponent.LoginUserNameTextInput/>
      <LoginComponent.LoginPasswordTextInput/>
      <LoginComponent.LoginButton title={fa["login"]} />
      <LoginComponent.LoginLinkButton link={"/login"} title={fa["client"]}  />
      <LoginComponent.LoginAlertComponent/>
      <LoginComponent.LoginSimpleBackdrop/>
    </LoginComponent>
  )
}

export default SceneWrapper(Login);