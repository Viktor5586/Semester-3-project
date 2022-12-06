import CargoAPI from "../apis/CargoAPI.js";
import React from "react";
import { AuthContext } from "../App";
import { useEffect, useState } from "react";

const initialState = {
  order: [],
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
        order: action.payload.cargoAllEntities, //винаги да казваш какво записваш от response-a
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

export const OrderReviewPage = () => {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    //console.log("Starting dispatching!");
    dispatch({ type: "FETCH_ADV-REQUEST" });
    CargoAPI.order()
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
          Error has occured when displaying our trucks. Sorry for the
          inconvenience!
        </span>
      ) : (
        <div className="container">
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Height</th>
                  <th scope="col">Width</th>
                  <th scope="col">Length</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Star point</th>
                  <th scope="col">End Point</th>
                  <th scope="col">Date of delivery</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {CargoAPI.order.map((order, index) => (
                  <tr>
                    <td>{order.id}</td>
                    <td>{order.height}</td>
                    <td>{order.width}</td>
                    <td>{order.length}</td>
                    <td>{order.weight}</td>
                    <td>{order.startPoint}</td>
                    <td>{order.endPoint}</td>
                    <td>{order.date}</td>
                    if (order.approved == false){" "}
                    {
                      <td>
                        <button type="button" class="btn btn-success">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="btn btn-danger">
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </td>
                    }
                    else{<td>Will delete!</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default OrderReviewPage;
