import React, { useState } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import UserAPI from "../apis/UserAPI";
import styles from "../components/AccountCard.css";
export const AccountCard = ({ firstName, lastName, username }) => {
  const refreshPage = () => {
    window.location.reload(false);
  };
  const navigateToPage = useNavigate();
  const initialState = {
    id: localStorage.getItem("customerId"),
    firstName: firstName,
    lastName: lastName,
    username: username,
    oldPassword: "",
    newPassword: "",
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
    if (data.firstName != "" && data.lastName != "") {
      UserAPI.updateUser(
        data.id,
        data.firstName,
        data.lastName,
        data.username,
        data.oldPassword,
        data.newPassword
      )
        .then((response) => {
          navigateToPage("/Truck");
        })
        .catch((error) => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message || error.statusText,
          });
        });
    } else if (data.firstName === "" || data.lastName === "") {
      if (data.firstName === "") {
        data.firstName = firstName;
        if (data.lastName === "") {
          data.lastName = lastName;
        }
        UserAPI.updateUser(
          data.id,
          data.firstName,
          data.lastName,
          data.username,
          data.oldPassword,
          data.newPassword
        )
          .then((response) => {
            navigateToPage("/Truck");
          })
          .catch((error) => {
            setData({
              ...data,
              isSubmitting: false,
              errorMessage: error.message || error.statusText,
            });
          });
      }
      if (data.firstName !== "" && data.lastName !== "") {
        UserAPI.updateUser(
          data.id,
          data.firstName,
          data.lastName,
          data.username,
          data.oldPassword,
          data.newPassword
        )
          .then((response) => {
            navigateToPage("/Home");
          })
          .catch((error) => {
            setData({
              ...data,
              isSubmitting: false,
              errorMessage: error.message || error.statusText,
            });
          });
      }
    }
  };

  const handleDeleteProfile = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    UserAPI.deleteUser(data.id) //localStorage.getItem("customerId")
      .then((response) => {
        localStorage.clear();
        navigateToPage("/");
        refreshPage();
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
    <div className="container rounded bg-white mt-5 mb-5">
      <form className="profileForm" onSubmit={handleFormSubmit}>
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
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>

              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    defaultValue={firstName}
                    onChange={handleInputChange}
                    name="firstName"
                  ></input>
                </div>
                <div className="col-md-12">
                  <label className="labels">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    defaultValue={lastName}
                    onChange={handleInputChange}
                    name="lastName"
                  ></input>
                </div>
                <div className="col-md-12">
                  <label className="labels">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    defaultValue={username}
                    onChange={handleInputChange}
                    name="username"
                  ></input>
                </div>
                <div className="col-md-12">
                  <label className="labels">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Old password"
                    defaultValue={data.oldPassword}
                    onChange={handleInputChange}
                    name="oldPassword"
                  ></input>
                </div>
                <div className="col-md-12">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New password"
                    defaultValue={data.newPassword}
                    onChange={handleInputChange}
                    name="newPassword"
                  ></input>
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary"
                  disabled={data.isSubmitting}
                >
                  {data.isSubmitting ? "Loading..." : "Save profile "}
                </button>
                <br />
                <button
                  className="btn btn-danger"
                  disabled={data.isSubmitting}
                  onClick={handleDeleteProfile}
                >
                  {data.isSubmitting ? "Loading..." : "Delete profile "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountCard;
