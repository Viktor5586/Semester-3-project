import StaticsAPI from "../apis/StatisticsAPI.js";
import React, { useState, useEffect } from "react";

const initialState = {
  // stats: [],
  trucks: "",
  approved: "",
  notApproved: "",
  ordersToday: "",
  ordersBefore: "",
  ordersAfter: "",
  employees: "",
  customers: "",
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
        // stats: action.payload,
        approved: action.payload.approved,
        notApproved: action.payload.notApproved,
        trucks: action.payload.trucks,
        ordersToday: action.payload.ordersToday,
        ordersBefore: action.payload.ordersBefore,
        ordersAfter: action.payload.ordersAfter,
        employees: action.payload.employees,
        customers: action.payload.customers,
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
    console.log(StaticsAPI.loadStatistics());
    StaticsAPI.loadStatistics()
      .then((response) => {
        dispatch({
          type: "FETCH_ADV_SUCCESS",
          payload: response,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "FETCH_ADV_FAILURE",
        });
      });
  }, []);
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
    <React.Fragment>
      <div className="main-content">
        <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8">
          <div className="container-fluid">
            <h2 className="mb-5 text-white">Statistics summary</h2>
            <div className="header-body">
              <div className="row">
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Approved orders
                          </h5>
                          <label className="h2 font-weight-bold mb-0">
                            {state.approved}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Not approved orders
                          </h5>
                          <label className="h2 font-weight-bold mb-0">
                            {state.notApproved}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Customers
                          </h5>
                          <label className="h2 font-weight-bold mb-0">
                            {state.customers}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Employees
                          </h5>
                          <label className="h2 font-weight-bold mb-0">
                            {state.employees}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Trucks
                          </h5>
                          <label className="h2 font-weight-bold mb-0">
                            {state.trucks}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Orders today
                          </h5>
                          <label className="h2 font-weight-bold mb-0">
                            {state.ordersToday}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Orders before today
                          </h5>
                          <label className="h2 font-weight-bold mb-0">
                            {state.ordersBefore}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Orders after today
                          </h5>
                          <label className="h2 font-weight-bold mb-0">
                            {state.ordersAfter}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default StaticsPage;
