// import './App.css';
// import { Nav, Navbar } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from "./Home.jsx"
// import About from "./About.jsx"
// import Users from "./Users.jsx"
// import { 
//   Link,
//   Switch,
//   BrowserRouter as Router,
//   Route
// } from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Navbar bg="primary" variant="dark">
//           <Navbar.Brand>Navbar</Navbar.Brand>
//           <Nav className="mr-auto">
//             <Nav.Link>
//               <Link to={"/"} >Home</Link>
//             </Nav.Link>
//             <Nav.Link>
//               <Link to={"/about"} >About</Link>
//             </Nav.Link>
//             <Nav.Link>
//               <Link to={"/users"} >Users</Link>
//             </Nav.Link>
//           </Nav>
//         </Navbar>
//         <Switch>
//           <Route path={"/about"} component={About} ></Route>
//           <Route path={"/users"} component={Users} ></Route>
//           <Route path={"/"} component={Home} ></Route>
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from "./About.jsx"
import Users from "./Users.jsx"
import { 
  Link,
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import OrderDetail from './component/orders/screen/OrderDetail';
import Login from './component/authentication/screen/Login';
import Home from './component/home/screen/Home';

const PrivateRoute = ({ component: Component, ...rest }) =>{
  const token = localStorage.getItem("token");
  return (
    <Route {...rest} render={(props) => (
      token != null
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )
}


const ProtectedLogin = ({ component: Component, ...rest }) => {
  const route = localStorage.getItem("ProtectedLogin");
  const Auth = useContext(AuthContext);
  return(
      <Route {...rest} render={(props) => (
        !Auth.auth
            ? <Component {...props} />
            : <Redirect to={ route ? route : "/"} />
        )} />
  );
};


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={"/users"} component={Users} ></Route>
          <Route path={"/orderdetail"} component={OrderDetail} ></Route>
          <Route path={"/login"} component={Login} ></Route>
          <PrivateRoute path={"/"} component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

