import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../apis/UserAPI.js";
import EmployeeAPI from "../apis/EmployeeAPI.js";
import axiosInterceptor from "../apis/axiosInterceptor.js";

function Register() {
  const navigateToPage = useNavigate();
  const initialState = {
    firstName: "",
    lastName: "",
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
    if (
      localStorage.getItem("employeeId") === null ||
      localStorage.getItem("employeeId") === undefined
    ) {
      UserAPI.user(data.firstName, data.lastName, data.username, data.password)
        .then((response) => {
          navigateToPage("/");
        })
        .catch((error) => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message || error.statusText,
          });
        });
    } else {
      EmployeeAPI.create(
        data.firstName,
        data.lastName,
        data.username,
        data.password
      )
        .then((response) => {
          navigateToPage("/");
        })
        .catch((error) => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message || error.statusText,
          });
        });
    }
  };
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="register">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              ></img>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <form onSubmit={handleFormSubmit}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Register</h4>
                </div>
                {data.errorMessage && (
                  <span className="form-error">{data.errorMessage}</span>
                )}
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">First name</label>
                    <input
                      className="form-control"
                      placeholder="First name"
                      defaultValue={data.firstName}
                      onChange={handleInputChange}
                      name="firstName"
                    ></input>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Last name</label>
                    <input
                      className="form-control"
                      placeholder="Last name"
                      defaultValue={data.lastName}
                      onChange={handleInputChange}
                      name="lastName"
                    ></input>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Username</label>
                    <input
                      className="form-control"
                      placeholder="Username"
                      defaultValue={data.username}
                      onChange={handleInputChange}
                      name="username"
                    ></input>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      defaultValue={data.password}
                      onChange={handleInputChange}
                      name="password"
                    ></input>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary"
                    disabled={data.isSubmitting}
                  >
                    {data.isSubmitting ? "Loading..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
