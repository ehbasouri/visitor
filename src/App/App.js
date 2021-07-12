import React, {useState, useEffect} from "react";
import AppRouter from "./AppRouter";
import AuthContext from "./AuthApi";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import { refreshToken } from "../service/api";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "../redux/reducer";
import { firebaseAnalytics } from "../service/firebase";

export default function App() {
  
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    readCookies();
    firebaseAnalytics.logEvent("app_is_started");
  },[]);

  function readCookies() {
    const user = Cookies.get("token"); 
    if(user) setAuth(true);
    setLoading(false);
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
      loading ? null :
      <Provider store={createStore(reducers, {})} >
        <AuthContext.Provider value={{auth, signIn, signOut}} >
          <AppRouter/>
        </AuthContext.Provider>
      </Provider>
  );
}
