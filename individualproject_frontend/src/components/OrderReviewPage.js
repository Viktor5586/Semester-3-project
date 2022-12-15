import CargoAPI from "../apis/CargoAPI.js";
import { AuthContext } from "../App";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import React, { useState, useEffect } from "react";
import NotificationPanel from "./NotificationPanel.js";
// const [notificationsReceived, setNotificationsReceived] = useState([]);
// const [stompClient, setStompClient] = useState();
// const ENDPOINT = "http://localhost:8080/ws";
// useEffect(() => {
//   // use SockJS as the websocket client
//   const socket = SockJS(ENDPOINT);
//   // Set stomp to use websockets
//   const stompClient = Stomp.over(socket);
//   // connect to the backend
//   stompClient.connect({}, () => {
//     // subscribe to the backend
//     stompClient.subscribe("/employee/employeeNotifications", (data) => {
//       console.log("HELLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOO" + data);
//       onMessageReceived(data);
//       //onUsernameInformed();
//     });
//   });
//   // maintain the client for sending and receiving
//   setStompClient(stompClient);
// }, []);
// const onMessageReceived = (data) => {
//   const notification = JSON.parse(data.body);
//   console.log(notification);
//   setNotificationsReceived((notificationsReceived) => [
//     ...notificationsReceived,
//     notification,
//   ]);
// };

const initialState = {
  orders: [],
  isFetching: false,
  hasError: false,
};

// function displayFunctionality(){}

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
        orders: action.payload.cargoAllEntities, //винаги да казваш какво записваш от response-a
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

function OrderReviewPage() {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const checkIfApproved = (cargoAllEntities) => {
    if (cargoAllEntities.approved === false) {
      return (
        <td>
          <button type="button" className="btn btn-primary">
            <i className="fa fa-eye" aria-hidden="true">
              Additional information
            </i>
          </button>
          <button type="button" className="btn btn-danger">
            <i className="far fa-trash-alt">Delete</i>
          </button>
        </td>
      );
    } else {
      return <td>Will delete!</td>;
    }
  };

  React.useEffect(() => {
    //console.log("Starting dispatching!");
    dispatch({ type: "FETCH_ADV-REQUEST" });
    CargoAPI.loadOrders()
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
      {/* <NotificationPanel notificationsReceived={notificationsReceived} /> */}

      {state.isFetching ? (
        <span className="loader">Loading...</span>
      ) : state.hasError ? (
        <span className="error">
          Error has occured when displaying our orders. Sorry for the
          inconvenience!
        </span>
      ) : (
        <div className="container">
          <div className="py-4">
            {state.orders.length > 0 ? (
              state.orders.map((cargoAllEntities) => (
                <table className="table table-bordered border shadow">
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
                    <tr>
                      <td>{cargoAllEntities.id /*i should add key*/}</td>
                      <td>{cargoAllEntities.height}</td>
                      <td>{cargoAllEntities.width}</td>
                      <td>{cargoAllEntities.length}</td>
                      <td>{cargoAllEntities.weight}</td>
                      <td>{cargoAllEntities.startPoint}</td>
                      <td>{cargoAllEntities.endPoint}</td>
                      <td>{cargoAllEntities.date.substring(0, 10)}</td>
                      {checkIfApproved(cargoAllEntities)}
                    </tr>
                  </tbody>
                </table>
              ))
            ) : (
              <span className="noOrders">
                Sorry! We don't have any orders for now...
              </span>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default OrderReviewPage;
