import React, {useState, useEffect} from "react";
import AppRouter from "./AppRouter";
import AuthContext from "./AuthApi";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(()=>{
    readCookies();
  },[]);

  function readCookies() {
    const user = Cookies.get("token");
    if(user) setAuth(true);
    // Cookies.remove("token");
  }

  console.log(auth);

  return (
    //   <StoreProvider store={createStore(reducers, {}, applyMiddleware(reduxThunk))} >
        <AuthContext.Provider value={{auth, setAuth}} >
          <AppRouter/>
        </AuthContext.Provider>
    //   </StoreProvider>
  );
}
