import { render } from "@testing-library/react";
import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import styles from "./NavBar.css";

function NavBar() {
  const { state: authState, dispatch } = React.useContext(AuthContext);

  const handleLogOut = (event) => {
    {
      dispatch({
        type: "LOGOUT",
      });
    }
  };

  const authorize = (roles) => {
    console.log("Sth:" + roles);
    switch (roles) {
      case "CUSTOMER":
        console.log("I'm here");
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
        console.log(roles);
      case "EMPLOYEE":
        return (
          <div className="text-end">
            <Link to="/OrderReviewPage" className="btn btn-outline-light me-2">
              View orders
            </Link>
            <Link to="/SomePage" className="btn btn-outline-light me-2">
              notifications
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
        ) : (
          // <div className="text-end">
          //   <Link to="/Truck" className="btn btn-outline-light me-2">
          //     Trucks
          //   </Link>
          //   <Link className="btn btn-outline-light me-2" to={"/OrderPage"}>
          //     Order
          //   </Link>
          //   <Link className="btn btn-outline-light me-2" to={"/AccountPage"}>
          //     My account
          //   </Link>
          //   <Link
          //     className="btn btn-outline-light me-2"
          //     onClick={handleLogOut}
          //     to={"/"}
          //   >
          //     Log out
          //   </Link>
          // </div>
          //authorize(localStorage.getItem("roles"))
          <div className="text-end">
            <Link className="btn btn-outline-light me-2" to={"/Home"}>
              Home
            </Link>
            <Link className="btn btn-outline-light me-2" to={"/"}>
              Log In
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
