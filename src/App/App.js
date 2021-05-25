import React, {useState, useEffect} from "react";
import AppRouter from "./AppRouter";
import AuthContext from "./AuthApi";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import { refreshToken } from "../service/api";

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(()=>{
    readCookies();
  },[]);

  function readCookies() {
    const user = Cookies.get("token"); 
    if(user) setAuth(true);
  }

  function signIn(data) {
    Cookies.set("token", data.accessToken);
    refreshToken(data.accessToken);
    setAuth(true);
  }

  function signOut(data) {
    Cookies.remove("token");
    setAuth(false);
  }

  return (
    //   <StoreProvider store={createStore(reducers, {}, applyMiddleware(reduxThunk))} >
        <AuthContext.Provider value={{auth, signIn, signOut}} >
          <AppRouter/>
        </AuthContext.Provider>
    //   </StoreProvider>
  );
}