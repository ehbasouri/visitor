import React from "react";
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import fa from "../../../translation/fa";
import { RegisterComponent } from "./RegisterComponent";

function Register(params) {
  return(
    <RegisterComponent>
      <RegisterComponent.RegisterIcon/>
      <RegisterComponent.RegisterTitle/>
      <RegisterComponent.RegisterNameTextInput/>
      <RegisterComponent.RegisterUserNameTextInput/>
      <RegisterComponent.RegisterPasswordTextInput/>
      <RegisterComponent.RegisterButton title={fa["register"]} />
      <RegisterComponent.RegisterLinkButton link={"/admin/login"} title={fa["login"]}  />
      <RegisterComponent.RegisterAlertComponent/>
      <RegisterComponent.RegisterSimpleBackdrop/>
    </RegisterComponent>
  )
}

export default SceneWrapper(Register);