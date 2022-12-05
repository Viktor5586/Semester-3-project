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

      return {
        ...state,
        isAuthenticated: true,
        username: decodeToken.username,
        userId: decodeToken.customerId,
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
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Truck" element={<Truck />} />
          <Route exact path="/OrderPage" element={<OrderPage />} />
          <Route exact path="/AccountPage" element={<AccountPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
