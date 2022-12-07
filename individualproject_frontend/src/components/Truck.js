import React from "react";
import { AuthContext } from "../App";
import TrucksAPI from "../apis/TrucksAPI";
import TruckCard from "./TruckCard";

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

function Truck() {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    //console.log("Starting dispatching!");
    dispatch({ type: "FETCH_ADV-REQUEST" });
    TrucksAPI.loadTrucks()
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
      <input
        className="form-control"
        id="myInput"
        type="text"
        placeholder="Search.."
      />
      {state.isFetching ? (
        <span className="loader">Loading...</span>
      ) : state.hasError ? (
        <span className="error">
          Error has occured when displaying our trucks. Sorry for the
          inconvenience!
        </span>
      ) : (
        <>
          {state.trucks.length > 0 ? (
            state.trucks.map((allTruckEntities) => (
              <TruckCard
                key={allTruckEntities.id}
                allTruckEntities={allTruckEntities}
              />
            ))
          ) : (
            <span className="noAdds">
              Sorry! We don't have any trucks for now...
            </span>
          )}
        </>
      )}
    </React.Fragment>
  );
}
export default Truck;
