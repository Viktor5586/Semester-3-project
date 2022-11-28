import React, { useState } from "react";
import { AuthContext } from "../App";
import UserAPI from "../apis/UserAPI";
import AccountCard from "./AccountCard";

/*have to fix problem*/

const initialState = {
  user: [],
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
      //console.log(action.payload);
      return {
        ...state,
        isFetching: false,
        user: action.payload.allUserEntities, //винаги да казваш какво записваш от response-a
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
    //console.log("Starting dispatching!");
    dispatch({ type: "FETCH_ADV-REQUEST" });
    UserAPI.loadUsers()
      .then((response) => {
        // console.log(response);
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
          {state.user.length > 0 ? (
            state.user.map((allUserEntities) => (
              <AccountCard
                key={allUserEntities.id}
                allUserEntities={allUserEntities}
              />
            ))
          ) : (
            <span className="noInfo">Sorry, sth went wrong...</span>
          )}
        </>
      )}
    </React.Fragment>
  );
}

export default AccountPage;
