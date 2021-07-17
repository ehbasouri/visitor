import React, { useContext, useEffect } from "react";
import "../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, 
} from "react-router-dom";
import AuthContext from "./AuthApi";
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
import UserInfo from "../component/userInfo/screen/UserInfo";
import UpdateUserInfo from "../component/userInfo/screen/UpdateUserInfo";
import ClientUserInfo from "../clientComponent/userInfo/screen/ClientUserInfo";
import ClientUpdateUserInfo from "../clientComponent/userInfo/screen/ClientUpdateUserInfo";
import AddOrderBusiness from "../component/clients/screen/AddOrderBusiness";
import StoreList from "../component/store/screen/StoreList";
import AddStore from "../component/store/screen/AddStore";
import StoreDetail from "../component/store/screen/StoreDetail";
import ClientProducts from "../clientComponent/products/screen/ClientProducts";
import NotFound from "../common/NotFound";
import Analytics from "../component/analytics/screen/Analytics";
import { useState } from "react";
import SettingClient from "../component/clients/screen/SettingClient";
import Packages from "../component/package/screen/Packages";
import AddPackage from "../component/package/screen/AddPackage";
import PackageDetailes from "../clientComponent/products/screen/PackageDetailes";
import ClientOrderList from "../component/clients/screen/ClientOrderList";
import DebtClient from "../component/clients/screen/DebtClient";
import OrderDetail from "../component/orders/screen/OrderDetail";
import DebtScreen from "../component/debt/screen/DebtScreen";


function BusinessRouter(params) {
  return(
    <Switch>
      <PrivateBusinessRoute path={"/admin/storedetail/:id"} component={StoreDetail} />
      <PrivateBusinessRoute path={"/admin/clientdetail/:id"} component={ClientDetail} />
      <PrivateBusinessRoute path="/admin/settingclient/:id" children={<SettingClient />} />
      <PrivateBusinessRoute path={"/admin/stores"} component={StoreList} />
      <PrivateBusinessRoute path={"/admin/packages"} component={Packages} />
      <PrivateBusinessRoute path={"/admin/addstore"} component={AddStore} />
      <PrivateBusinessRoute path={"/admin/addpackage"} component={AddPackage} />
      <PrivateBusinessRoute path={"/admin/debts"} component={DebtScreen} />
      <PrivateBusinessRoute path={"/admin/editpackage/:id"} component={AddPackage} />
      <PrivateBusinessRoute path={"/admin/clientorderlist/:client_name/:id"} component={ClientOrderList} />
      <PrivateBusinessRoute path={"/admin/debtclient/:client_name/:id"} component={DebtClient} />
      <PrivateBusinessRoute path={"/admin/updateStore/:storeName/:id"} component={AddStore} />
      <PrivateBusinessRoute path={"/admin/addorderbusiness/:id"} component={AddOrderBusiness} />
      <PrivateBusinessRoute path={"/admin/addproduct"} component={AddProduct} />
      <PrivateBusinessRoute path="/admin/editproduct/:id" children={<AddProduct />} />
      <PrivateBusinessRoute path={"/admin/categories"} component={Categories} />
      <PrivateBusinessRoute path={"/admin/addclient"} component={AddClient} />
      <PrivateBusinessRoute path={"/admin/products"} component={Products} />
      <PrivateBusinessRoute path={"/admin/invoice"} component={Invoice} />
      <PrivateBusinessRoute path={"/admin/userinfo"} component={UserInfo} />
      <PrivateBusinessRoute path={"/admin/updateuserinfo"} component={UpdateUserInfo} />
      <PrivateBusinessRoute path={"/admin/archiveorderdetail/:id"} component={ArchiveOrderDetail} />
      <PrivateBusinessRoute path={"/admin/activeorderdetail/:id"} component={OrderDetail} />
      <PrivateBusinessRoute path={"/admin/analytics"} component={Analytics} />
      <ProtectedLogin path={"/admin/login"} component={Login} />
      <ProtectedLogin path={"/admin/register"} component={Register} />
      <PrivateBusinessRoute path={"/admin"} component={Home} />
      <Route component={NotFound} />
    </Switch>
  )
}


function ClientRouter() {
  return(
    <Switch>
      <PrivateClientRoute path={"/basket"} component={ClientBasket} />
      <PrivateClientRoute path={"/userinfo"} component={ClientUserInfo} />
      <PrivateClientRoute path={"/products/package/:id"} component={PackageDetailes} />
      <PrivateClientRoute path={"/products/:id"} component={ClientProducts} />
      <PrivateClientRoute path={"/updateuserinfo"} component={ClientUpdateUserInfo} />
      <PrivateClientRoute path={"/archiveorderdetail/:id"} component={ClientArchiveOrderDetailes} />
      <ProtectedLogin path={"/login"} component={ClientLogin} />
      <ProtectedLogin path={"/register"} component={ClientRegister} />
      <PrivateClientRoute path={"/"} component={ClientHome} />
      <Route component={NotFound} />
    </Switch>
  )
}

export const PrivateClientRoute = ({ component: Component, ...rest }) => {
  
  const Auth = useContext(AuthContext);
  let user_info = {}
  if (Auth) {
    const user = Cookies.get("token"); 
    user_info = parseJwt(user);
  }
    return(
        <Route {...rest} render={(props) => (
          Auth.auth
              ? (user_info.role === "admin" ? <Redirect to={"/admin/orders/active"} /> : <Component {...props} />  )

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
              :(user_info.role === "admin" ? <Component {...props} /> : <Redirect to={"/business"} /> )
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
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    getUserInfoToken()
  },[Auth]);

  function getUserInfoToken() {
    try {
      const user_token = Cookies.get("token")
      const user_info = parseJwt(user_token);
      dispatch(updateGeneralProps({
        key: USER_INFO,
        value: user_info
      }))
    } catch (error) {
      console.log("error : ", error);
    }
    setLoading(false)
  }

  return (
    loading ? null :
    <Router>
        <Switch>
          <Route path={"/admin"} component={BusinessRouter} />
          <Route path={"/"} component={ClientRouter} />
        </Switch>
    </Router>
  );
}

export default AppRouter;
