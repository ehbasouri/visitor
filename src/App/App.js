import React, {useState, useEffect} from "react";
import AppRouter from "./AppRouter";
import AuthContext from "./AuthApi";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import { refreshToken } from "../service/api";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "../redux/reducer";
import { firebaseAnalytics, messaging } from "../firebase"

export default function App() {
  
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    readCookies();
    firebaseAnalytics.logEvent("app_is_started");
    getFcmToken();
  },[]);

  function getFcmToken(params) {
    if(messaging){
      // Get registration token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      messaging.getToken({ vapidKey: 'BKTPkuME7U9KLkMNGJFWl-45Pxx-OErm1oWFLsQ4-lRsNXVsAFbKJUdNahSZNgv_OOYKMq0i00dFt42vTjVlfp0' }).then((currentToken) => {
        if (currentToken) {
          console.log("fcmToken : ", currentToken);
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
    }
  }

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
