import { render } from "@testing-library/react";
import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import styles from "./NavBar.css";

function NavBar() {
  const { state: authState, dispatch } = React.useContext(AuthContext);

  const handleLogOut = () => {
    {
      dispatch({
        type: "LOGOUT",
      });
    }
  };

  const authorize = (roles) => {
    switch (roles) {
      case "CUSTOMER":
        return (
          <div className="text-end">
            <Link to="/Truck" className="btn btn-outline-light me-2">
              Trucks
            </Link>
            <Link className="btn btn-outline-light me-2" to={"/OrderPage"}>
              Order
            </Link>
            <Link className="btn btn-outline-light me-2" to={"/AccountPage"}>
              My account
            </Link>
            <Link
              className="btn btn-outline-light me-2"
              onClick={handleLogOut}
              to={"/"}
            >
              Log out
            </Link>
          </div>
        );
      case "EMPLOYEE":
        return (
          <div className="text-end">
            <Link to="/OrderReviewPage" className="btn btn-outline-light me-2">
              Manage orders
            </Link>
            <Link
              to={"/TrucksReviewPage"}
              className="btn btn-outline-light me-2"
            >
              Manage trucks
            </Link>
            <Link to="/SomePage" className="btn btn-outline-light me-2">
              notifications
            </Link>
            <Link to="/CreateTruckPage" className="btn btn-outline-light me-2">
              Create truck
            </Link>
            <Link to="/Register" className="btn btn-outline-light me-2">
              Create employee account
            </Link>
            <Link to="/StatisticsPage" className="btn btn-outline-light me-2">
              Statistics
            </Link>
            <Link
              className="btn btn-outline-light me-2"
              onClick={handleLogOut}
              to={"/"}
            >
              Log out
            </Link>
          </div>
        );
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand">Find cargo Inc.</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {authState.isAuthenticated ? (
          authorize(localStorage.getItem("roles"))
        ) : localStorage.getItem("token") === null ||
          localStorage.getItem("token") === undefined ? (
          <div className="text-end">
            <Link className="btn btn-outline-light me-2" to={"/Home"}>
              Home
            </Link>
            <Link className="btn btn-outline-light me-2" to={"/"}>
              Log In
            </Link>
          </div>
        ) : (
          authorize(localStorage.getItem("roles"))
        )}
      </nav>
    </div>
  );
}

export default NavBar;
