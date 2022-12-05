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

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          Find cargo Inc.
        </a>
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
        ) : (
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
