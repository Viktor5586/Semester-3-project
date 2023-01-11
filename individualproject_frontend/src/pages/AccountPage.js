import React, { useState } from "react";
import { AuthContext } from "../App";
import UserAPI from "../apis/UserAPI";
import AccountCard from "../components/AccountCard";
import axiosInterceptor from "../apis/axiosInterceptor.js";

/*have to fix problem*/

const initialState = {
  id: localStorage.getItem("customerId"),
  //user: [],
  firstName: "",
  lastName: "",
  // email: localStorage.getItem("username"),
  isFetching: false,
  hasError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ADV-REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case "FETCH_ADV_SUCCESS":
      return {
        ...state,
        isFetching: false,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName, //винаги да казваш какво записваш от response-a
      };
    case "FETCH_ADV_FAILURE":
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    default:
      return state;
  }
};

function AccountPage() {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    axiosInterceptor();
    UserAPI.loadUser(localStorage.getItem("customerId"))

      .then((response) => {
        dispatch({
          type: "FETCH_ADV_SUCCESS",
          payload: response,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "FETCH_ADV_FAILURE",
        });
      });
  }, [authState.token]);
  return (
    <React.Fragment>
      {state.isFetching ? (
        <span className="loader">Loading...</span>
      ) : state.hasError ? (
        <span className="error">
          Error has occured when displaying your account information. Sorry for
          the inconvenience!
        </span>
      ) : (
        <>
          <AccountCard
            key={state.id}
            firstName={state.firstName}
            lastName={state.lastName}
            username={localStorage.getItem("username")}
          />
        </>
      )}
    </React.Fragment>
  );
}

export default AccountPage;
