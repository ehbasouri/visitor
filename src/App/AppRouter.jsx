import React, { useContext, useEffect } from "react";
import "../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AuthContext from "./AuthApi";
import OrderDetail from "../component/orders/screen/OrderDetail";
import Login from "../component/authentication/screen/Login";
import Home from "../component/home/screen/Home";
import ClientDetail from "../component/clients/screen/clientDetail";
import AddClient from "../component/clients/screen/AddClient";
import Products from "../component/products/screen/Products";
import Categories from "../component/categories/screen/Categories";
import AddProduct from "../component/products/screen/AddProduct";
import Register from "../component/authentication/screen/Register";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const Auth = useContext(AuthContext);
    return(
        <Route {...rest} render={(props) => (
          Auth.auth
              ? <Component {...props} />
              : <Redirect to={"/login"} />
          )} />
    );
};

const ProtectedLogin = ({ component: Component, ...rest }) => {
  const Auth = useContext(AuthContext);
  return(
      <Route {...rest} render={(props) => (
        !Auth.auth
            ? <Component {...props} />
            : <Redirect to={"/orders"} />
        )} />
  );
};

function AppRouter() {

  const Auth = useContext(AuthContext);

  useEffect(()=>{
    getUserInfo();
  },[Auth]);

  const getUserInfo = async () => {

  } 

  return (
    <Router>
        <Switch>
        <PrivateRoute path={"/clientdetail"} component={ClientDetail} />
        <PrivateRoute path={"/addproduct"} component={AddProduct} />
        <Route path="/editproduct/:id" children={<AddProduct />} />
        <PrivateRoute path={"/categories"} component={Categories} />
        <PrivateRoute path={"/addclient"} component={AddClient} />
        <PrivateRoute path={"/products"} component={Products} />
        <ProtectedLogin path={"/login"} component={Login} />
        <ProtectedLogin path={"/register"} component={Register} />
        <PrivateRoute path={"/"} component={Home} />
        </Switch>
    </Router>
  );
}

export default AppRouter;
