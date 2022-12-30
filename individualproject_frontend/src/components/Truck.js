import React from "react";
import { useState } from "react";
import { AuthContext } from "../App";
import TrucksAPI from "../apis/TrucksAPI";
import TruckCard from "./TruckCard";

const initialState = {
  trucks: [],
  filterValue: "",
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
  const [data, setData] = React.useState(initialState);
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [filter, setFilter] = useState(false);
  const ref = React.useRef(null);

  const handleChange = (event) => {
    setFilter(event.target.checked);
    ref.current = event.target;
  };

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    // console.log(event.target.value);
  };

  // const handleClick = () => {
  //   console.log(ref.current.id);
  //   // TrucksAPI.loadTrucks();
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    console.log(data.filterValue);

    console.log("TUK" + ref.current.id + "A tova: " + data.filterValue);
    TrucksAPI.loadFilteredTrucks(ref.current.id, data.filterValue)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

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
      <form onSubmit={handleFormSubmit}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="filter"
            id="location"
            onChange={handleChange}
            // disabled={filter}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Location
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="filter"
            id="height"
            onChange={handleChange}
            // disabled={filter}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Height
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="filter"
            id="width"
            onChange={handleChange}
            // disabled={filter}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Width
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="filter"
            id="length"
            onChange={handleChange}
            // disabled={filter}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Length
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="filter"
            id="maxWeight"
            onChange={handleChange}
            // disabled={filter}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Max weight
          </label>
        </div>
        <input
          className="form-control"
          id="myInput"
          type="text"
          name="filterValue"
          placeholder="Search.."
          disabled={!filter}
          defaultValue={data.filterValue}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-primary"
          disabled={!filter}
          // onClick={handleClick}
        >
          Search
        </button>
      </form>
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
