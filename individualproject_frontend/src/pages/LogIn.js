import React from "react";
import { AuthContext } from "../App.js";
import LogInAPI from "../apis/LogInAPI.js";
import { Navigate, useNavigate } from "react-router-dom";
export const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const navigateToPage = useNavigate();
  const initialState = {
    username: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    LogInAPI.logInUser(data.username, data.password)
      .then((response) => {
        console.log(response);
        console.log(response.accessToken);
        dispatch({
          type: "LOGIN",
          payload: response.accessToken,
        });
        navigateToPage("/Home");
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };
  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <h1>Login</h1>
            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}
            <label htmlFor="username">
              Email Address
              <input
                type="text"
                value={data.username}
                onChange={handleInputChange}
                name="username"
                id="username"
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>
            <button className="btn btn-primary" disabled={data.isSubmitting}>
              {data.isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>
          <div className="goToRegister">
            <p className="small fw-bold mt-2 pt-1 mb-0">
              Don't have an account?{" "}
              <a href="/Register" className="link-danger">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
