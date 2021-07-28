import React, {useState, useEffect} from "react";
import AppRouter from "./AppRouter";
import AuthContext from "./AuthApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { API, refreshToken } from "../service/api";
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
  },[]);

  function getFcmToken(params) {
    if(messaging){
      // Get registration token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      messaging.getToken({ vapidKey: 'BKTPkuME7U9KLkMNGJFWl-45Pxx-OErm1oWFLsQ4-lRsNXVsAFbKJUdNahSZNgv_OOYKMq0i00dFt42vTjVlfp0' }).then( async (currentToken) => {
        if (currentToken) {
          localStorage.setItem("fcm_token", currentToken); 
          try {
            const {data} = await API.post("fcm",{fcm_token:currentToken
              //  "dHGWC95nLDOEuHQD36VSMC:APA91bGWE7jm7fxQVZtS1B5CUWMH2wcQKQdEGlqOsQBZVLGwMNj6aaiEZKBHgH2rXRoCx3BpFt41oZHETmoBpj2k9Qx1juSISDXo1TVgT0rsSxfru4IJKfopyxX6O_3LQsn4hg80BZX9"
            });
          } catch (error) {
            console.error(error);
          }
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

  async function onRemoveFcmToken (){
    if(messaging){
      messaging.deleteToken();
      const fcm_token = localStorage.getItem("fcm_token"); 
      try {
        const {data} = await API.del("fcm",{fcm_token});
      } catch (error) {
        console.error(error);
      }
    }
  }

  function readCookies() {
    const user = localStorage.getItem("token"); 
    if(user) setAuth(true);
    setLoading(false);
  }

  function signIn(data) {
    localStorage.setItem("token", data.accessToken);
    refreshToken(data.accessToken);
    setAuth(true);
    getFcmToken();
  }

  function signOut(data) {
    localStorage.removeItem("token");
    setAuth(false);
    onRemoveFcmToken()
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
