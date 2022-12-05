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
    /*<section className="vh-100 gradient-custom">
  <div className="container py-7 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white">
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your username and password!</p>

              <div className="form-outline form-white mb-4">
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
              </div>

              <div className="form-outline form-white mb-4">
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
            <button type="submit" disabled={data.isSubmitting}>
              {data.isSubmitting ? (
                "Loading..."
              ) : (
                "Login"
              )}
            </button>
              </div>
              
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  </section>*/
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
            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
