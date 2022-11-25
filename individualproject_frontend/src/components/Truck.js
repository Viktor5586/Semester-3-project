import React, {useState} from "react";
import { useEffect} from "react";
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


function Truck(){
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

    // const [trucks, setTrucks] = useState([]);

    // useEffect(() => {
    //     loadTrucks();
    // }, []);

    // const loadTrucks = () =>{
    //         TrucksAPI.loadTrucks()
    //     .then((response) => response.data)
    // };
    return(
        <React.Fragment>
        <input className="form-control" id="myInput" type="text" placeholder="Search.." />
        {state.isFetching ? (
          <span className="loader">Loading...</span>
        ) : state.hasError ? (
          <span className="error">
            Error has occured when displaying our trucks. Sorry for the
            inconvenience!
          </span>
        ) : (
          <>
            {/* {console.log("Displaying Adds!")}
            {console.log("Adds arr")}
            {console.log(state.advertisements)} */}
            {state.trucks.length > 0 ? (
              state.trucks.map((allTruckEntities) => (
                <TruckCard key={allTruckEntities.id} allTruckEntities={allTruckEntities} />
              ))
            ) : (
              <span className="noAdds">
                Sorry we dont have any adds here...
              </span>
            )}
          </>
        )}
        {
        /* <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">Truck</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
         <div className="card">
         <div className="card-body">
             <h5 className="card-title">Truck</h5>
             <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
         </div>
     </div>
     <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">Truck</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">Truck</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">Truck</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div> */}
     </React.Fragment>
        
    );

}
export default Truck;