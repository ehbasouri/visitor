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
import Cookies from "js-cookie";
import { parseJwt } from "../utils/parsJwt";
import ClientLogin from "../clientComponent/authentication/screen/ClientLogin";
import ClientRegister from "../clientComponent/authentication/screen/ClientRegister";
import ClientHome from "../clientComponent/home/screen/ClientHome";
import ClientBasket from "../clientComponent/basket/screen/ClientBasket";
import { useDispatch } from "react-redux"
import { USER_INFO } from "../consts";
import { updateGeneralProps } from "../redux/actions";
import Invoice from "../component/invoice/screen/Invoice";
import ArchiveOrderDetail from "../component/orders/screen/ArchiveOrderDetailes";
import ClientArchiveOrderDetailes from "../clientComponent/orders/screen/ClientArchiveOrderDetailes";


function BusinessRouter(params) {
  return(
    <Switch>
      <PrivateBusinessRoute path={"/admin/clientdetail"} component={ClientDetail} />
      <PrivateBusinessRoute path={"/admin/addproduct"} component={AddProduct} />
      <PrivateBusinessRoute path="/admin/editproduct/:id" children={<AddProduct />} />
      <PrivateBusinessRoute path={"/admin/categories"} component={Categories} />
      <PrivateBusinessRoute path={"/admin/addclient"} component={AddClient} />
      <PrivateBusinessRoute path={"/admin/products"} component={Products} />
      <PrivateBusinessRoute path={"/admin/invoice"} component={Invoice} />
      <PrivateBusinessRoute path={"/admin/archiveorderdetail/:id"} component={ArchiveOrderDetail} />
      <ProtectedLogin path={"/admin/login"} component={Login} />
      <ProtectedLogin path={"/admin/register"} component={Register} />
      <PrivateBusinessRoute path={"/admin"} component={Home} />
    </Switch>
  )
}


function ClientRouter(params) {
  return(
    <Switch>
      <ProtectedLogin path={"/login"} component={ClientLogin} />
      <ProtectedLogin path={"/register"} component={ClientRegister} />
      <PrivateClientRoute path={"/basket"} component={ClientBasket} />
      <PrivateClientRoute path={"/archiveorderdetail/:id"} component={ClientArchiveOrderDetailes} />
      <PrivateClientRoute path={"/"} component={ClientHome} />
    </Switch>
  )
}

export const PrivateClientRoute = ({ component: Component, ...rest }) => {
  const Auth = useContext(AuthContext);
    return(
        <Route {...rest} render={(props) => (
          Auth.auth
              ? <Component {...props} />
              : <Redirect to={"/login"} />
          )} />
    );
};

export const PrivateBusinessRoute = ({ component: Component, ...rest }) => {
  const Auth = useContext(AuthContext);
  let user_info = {}
  if (Auth) {
    const user = Cookies.get("token"); 
    user_info = parseJwt(user);
  }

    return(
        <Route {...rest} render={(props) => (
          !Auth.auth
              ?<Redirect to={"/admin/login"} />
              :(user_info.role === "admin" ? <Component {...props} /> : <Redirect to={"/products"} /> )
          )} />
    );
};

const ProtectedLogin = ({ component: Component, ...rest }) => {
  const Auth = useContext(AuthContext);
  return(
      <Route {...rest} render={(props) => (
        !Auth.auth
            ? <Component {...props} />
            : <Redirect to={"/admin/orders"} />
        )} />
  );
};


function AppRouter() {

  const Auth = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(()=>{
    getUserInfo();
  },[Auth]);

  const getUserInfo = async () => {
    const user_token = Cookies.get("token");
    const user_info = parseJwt(user_token);
      dispatch(updateGeneralProps({
        key: USER_INFO,
        value: user_info
      }))
  } 

  return (
    <Router>
        <Switch>
          <Route path={"/admin"} component={BusinessRouter} />
          <Route path={"/"} component={ClientRouter} />
        </Switch>
    </Router>
  );
}

export default AppRouter;
