import StaticsAPI from "../apis/StatisticsAPI.js";
import React, { useState, useEffect } from "react";

const initialState = {
  stats: [],
  role: "",
  approved: "",
  notApproved: "",
  date: "",
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
        stats: action.payload,
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
const StaticsPage = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    //console.log("Starting dispatching!");
    dispatch({ type: "FETCH_ADV-REQUEST" });
    StaticsAPI.loadOrderStatisticsByApproval("approved")
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
  });
  //   var myData = {
  //     chart: {
  //       caption: "Orders ratio",
  //       subCaption: "Downloads (In Millions)",
  //       canvasBgAlpha: "0",
  //       bgColor: "#ffffff",
  //       bgAlpha: "70",
  //       baseFont: "Roboto",
  //       baseFontSize: "14",
  //       showAlternateVGridColor: "1",
  //       alternateVGridAlpha: "5",
  //       labelFontSize: "15",
  //       captionFontSize: "20",
  //       subCaptionFontSize: "16",
  //       toolTipColor: "#000000",
  //       toolTipBgColor: "#ffffff",
  //       toolTipAlpha: "90",
  //       captionFontBold: "0",
  //       subCaptionFontBold: "0",
  //       paletteColors: "#8E24AA",
  //       valueFontSize: "13",
  //       valueFontBold: "0",
  //       animation: "0",
  //       divLineAlpha: "15",
  //       divLineDashed: "0",
  //       plotFillAlpha: "90",
  //       theme: "ocean",
  //     },
  //     data: [
  //       {
  //         label: "Approved",
  //         value: `${StaticsAPI.loadOrderStatisticsByApproval("approved")}`,
  //       },
  //       {
  //         label: "Approved",
  //         value: `${StaticsAPI.loadOrderStatisticsByApproval("notApproved")}`,
  //       },
  //     ],
  //   };
  //   var barChartConfigs = {
  //     id: "bar-chart",
  //     renderAt: "chart-container",
  //     type: "bar2d",
  //     width: "100%",
  //     height: 400,
  //     dataFormat: "json",
  //     dataSource: myData,
  //   };
  return (
    <div className="container">
      {/* if(state.stats.length > ?0){

        } */}
      {state.stats.length > 0 ? (
        <label defaultValue={state.stats}></label>
      ) : (
        <span className="noTrucks">
          Sorry! We don't have any trucks for now...
        </span>
      )}
    </div>
  );
};
export default StaticsPage;
