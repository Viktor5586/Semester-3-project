import React from "react";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import{Route, Routes, BrowserRouter as Router} from "react-router-dom";
import UsersPage from './pages/UsersPage.js';
import NavBar from './components/NavBar';
import InputUser from './components/InputUser';
import Register from './pages/Register';
import Login from "./components/LogIn.js";
import Home from "./components/Home";
import Header from "./components/Header";
import jwtDecode from "jwt-decode";
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

        localStorage.setItem("username",decodeToken.sub);
        localStorage.setItem("roles", decodeToken.roles);
        localStorage.setItem("customerId", decodeToken.customerId);
      
        return {
          ...state,
          isAuthenticated: true,
          username: decodeToken.username,
          userId: decodeToken.customerId,
          role: decodeToken.roles,
          token: action.payload.token
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null
        };
      default:
        return state;
    }
  };
  

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return(
    /*<div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<UsersPage/>}/>
          <Route exact path='/Register' element={<Register/>}/>
        </Routes>
      </Router>
      
    </div>*/
    <AuthContext.Provider value={{state,dispatch}}>
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path='/Home' element={<Home/>}/>
          <Route exact path='/LogIn' element={<Login/>}/>
        </Routes>
      </Router>
      <Header />
    </AuthContext.Provider>
  );
}



export default App;

