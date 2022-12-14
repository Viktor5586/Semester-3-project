import TruckAPI from "../apis/TrucksAPI.js";
import { AuthContext } from "../App";
import React, { useState, useEffect } from "react";

const initialState = {
  trucks: [],
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
        trucks: action.payload.allTruckEntities, //винаги да казваш какво записваш от response-a
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
export const TruckReviewPage = () => {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const checkIfApproved = (allTruckEntities) => {
    return (
      <td>
        {/* <button type="button" className="btn btn-primary">
            <i className="fa fa-eye" aria-hidden="true">
                Info
            </i>
            </button> */}
        <button type="button" className="btn btn-danger">
          <i className="far fa-trash-alt">Delete</i>
        </button>
      </td>
    );
  };

  React.useEffect(() => {
    //console.log("Starting dispatching!");
    dispatch({ type: "FETCH_ADV-REQUEST" });
    TruckAPI.loadTrucks()
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
          Error has occured when displaying our trucks. Sorry for the
          inconvenience!
        </span>
      ) : (
        <div className="container">
          <div className="py-4">
            {state.trucks.length > 0 ? (
              state.trucks.map((allTruckEntities) => (
                <table className="table table-bordered border shadow">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Height</th>
                      <th scope="col">Width</th>
                      <th scope="col">Length</th>
                      <th scope="col">Max weight</th>
                      <th scope="col">Tank volume</th>
                      <th scope="col">Fuel consumption(per km)</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{allTruckEntities.id /*i should add key*/}</td>
                      <td>{allTruckEntities.height}</td>
                      <td>{allTruckEntities.width}</td>
                      <td>{allTruckEntities.length}</td>
                      <td>{allTruckEntities.maxWeight}</td>
                      <td>{allTruckEntities.tankVolume}</td>
                      <td>{allTruckEntities.fuelConsumptionPerKm}</td>
                      {checkIfApproved(allTruckEntities)}
                    </tr>
                  </tbody>
                </table>
              ))
            ) : (
              <span className="noTrucks">
                Sorry! We don't have any trucks for now...
              </span>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TruckReviewPage;
