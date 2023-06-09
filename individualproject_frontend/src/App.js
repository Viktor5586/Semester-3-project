import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import AccountPage from "./pages/AccountPage";
import Login from "./pages/LogIn.js";
import Home from "./components/Home";
import jwtDecode from "jwt-decode";
import Truck from "./pages/Truck";
import OrderPage from "./pages/OrderPage";
import OrderReviewPage from "./pages/OrderReviewPage";
import SomePage from "./pages/SomePage";
import TrucksReviewPage from "./pages/TrucksReviewPage";
import Register from "./pages/Register";
import CreateTruckPage from "./pages/CreateTruckPage";
import StaticsPage from "./pages/StatisticsPage";

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
      localStorage.setItem("token", action.payload);
      localStorage.setItem("username", decodeToken.sub);
      localStorage.setItem("roles", decodeToken.roles);
      localStorage.setItem("customerId", decodeToken.customerId);
      localStorage.setItem("employeeId", decodeToken.employeeId);
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
          <Route exact path="/CreateTruckPage" element={<CreateTruckPage />} />
          <Route exact path="/StatisticsPage" element={<StaticsPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
