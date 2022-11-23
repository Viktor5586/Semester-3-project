import React from "react";
import axios from "axios";
import { AuthContext } from "../App.js";
import LogInAPI from "../apis/LogInAPI.js";
import { Navigate } from "react-router-dom";
export const Login = () => {
  const {dispatch} = React.useContext(AuthContext);
    const initialState = {
        username: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
      };
    const [data, setData] = React.useState(initialState);
    const handleInputChange = event => {
        setData({
          ...data,
          [event.target.name]: event.target.value
        });
      };
      const handleFormSubmit = event => {
        event.preventDefault();
        setData({
          ...data,
          isSubmitting: true,
          errorMessage: null
        });

        LogInAPI.logInUser(data.username, data.password)
          .then((response) => {
            console.log(response);
            console.log(response.accessToken);
            dispatch({
              type: "LOGIN",
              payload: response.accessToken
          });
          })
          .catch((error) =>{
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
			{data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}

            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? (
                "Loading..."
              ) : (
                "Login"
              )}
            </button>
          
    	  </form>
        </div>
      </div>
    </div>
);
};
export default Login;