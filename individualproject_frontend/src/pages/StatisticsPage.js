import StaticsAPI from "../apis/StatisticsAPI.js";
import React from "react";
import { Chart } from "react-google-charts";
import style from "./StatisticsPage.css";

const initialState = {
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
  const ordersByDateData = [
    ["Type", "Value"],
    ["Orders today", state.ordersToday],
    ["Orders before", state.ordersBefore],
    ["Orders after", state.ordersAfter],
  ];

  const ordersByApproval = [
    ["Approved", "Value"],
    ["Orders approved", state.approved],
    ["Orders not approved", state.notApproved],
  ];

  const ordersOptions = {
    title: "Orders statistics",
    is3D: true,
  };

  const trucksEmployeeCustomerData = [
    ["Type", "Trucks", "Employees", "Customers"],
    ["2022", state.trucks, state.employees, state.customers],
  ];
  const options = {
    chart: {
      title: "Company Performance",
      subtitle: "Trucks, employees and customers ratio for 2022",
    },
  };
  return (
    <React.Fragment>
      <div className="statisticsSection d-flex row">
        <div className="col-6 ordersSection">
          <Chart
            chartType="PieChart"
            data={ordersByDateData}
            options={ordersOptions}
            width={"70%"}
            height={"200px"}
          />

          <Chart
            chartType="PieChart"
            data={ordersByApproval}
            options={ordersOptions}
            width={"70%"}
            height={"200px"}
          />
        </div>
        <div className="col-6 ratioSection">
          <Chart
            chartType="Bar"
            width="70%"
            height="400px"
            data={trucksEmployeeCustomerData}
            options={options}
          />
        </div>
      </div>
      {/* <div className="main-content">
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
      </div> */}
    </React.Fragment>
  );
};
export default StaticsPage;
