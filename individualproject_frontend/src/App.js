import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import AccountPage from "./components/AccountPage";
import Login from "./components/LogIn.js";
import Home from "./components/Home";
import jwtDecode from "jwt-decode";
import Truck from "./components/Truck";
import OrderPage from "./components/OrderPage";
import OrderReviewPage from "./components/OrderReviewPage";
import SomePage from "./pages/SomePage";
import TrucksReviewPage from "./pages/TrucksReviewPage";
import Register from "./pages/Register";
/**
 return (
    <div className="App">
      <Router>
      <NavBar>
        <Routes>
          <Route path="/UsersPage" element={<UsersPage />} />
          <Route path="/Add user" element={<InputUser />} />
        </Routes>
        </NavBar>
        <UsersPage></UsersPage>
      </Router>
    </div>
  ); 
 */
export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  username: null,
  userId: null,
  role: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const decodeToken = jwtDecode(action.payload);

      localStorage.setItem("username", decodeToken.sub);
      localStorage.setItem("roles", decodeToken.roles);
      localStorage.setItem("customerId", decodeToken.customerId);
      localStorage.setItem("employee", decodeToken.employeeId);
      return {
        ...state,
        isAuthenticated: true,
        username: decodeToken.username,
        userId: decodeToken.customerId || decodeToken.employeeId,
        role: decodeToken.roles,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    /*<div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<UsersPage/>}/>
          <Route exact path='/Register' element={<Register/>}/>
        </Routes>
      </Router>

      // this one is working
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/Home' element={<Home/>}/>
        </Routes>
      </Router>
      <Header />
      
    </div>*/
    <AuthContext.Provider value={{ state, dispatch }}>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Truck" element={<Truck />} />
          <Route exact path="/OrderPage" element={<OrderPage />} />
          <Route exact path="/AccountPage" element={<AccountPage />} />
          <Route exact path="/OrderReviewPage" element={<OrderReviewPage />} />
          <Route
            exact
            path="/TrucksReviewPage"
            element={<TrucksReviewPage />}
          />
          <Route exact path="/SomePage" element={<SomePage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
