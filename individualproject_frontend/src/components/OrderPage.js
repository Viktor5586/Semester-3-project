import React from "react";
import styles from "./OrderPage.css";
import CargoAPI from "../apis/CargoAPI.js";
import { Navigate, useNavigate } from "react-router-dom";

export const OrderPage = () => {
  const navigateToPage = useNavigate();

  //const decodeToken = jwtDecode(action.payload);

  //localStorage.setItem("customerId", decodeToken.customerId);

  const initialState = {
    height: "",
    width: "",
    length: "",
    weight: "",
    startPoint: "",
    endPoint: "",
    date: "",
    customerId: localStorage.getItem("customerId"),
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    CargoAPI.order(
      data.height,
      data.width,
      data.length,
      data.weight,
      data.startPoint,
      data.endPoint,
      data.date,
      data.customerId
    )
      .then((response) => {
        navigateToPage("/Home");
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };
  return (
    <section className="order-form my-4 mx-4">
      <form onSubmit={handleFormSubmit}>
        <div className="container pt-4">
          <div className="row">
            <div className="col-12">
              <h1>Order Form</h1>
              {data.errorMessage && (
                <span className="form-error">{data.errorMessage}</span>
              )}
              <hr className="mt-1" />
            </div>
            <div className="col-12">
              <div className="row mx-4">
                <div className="col-12 mb-2">
                  <label className="order-form-label">Cargo height</label>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="order-form-input"
                    defaultValue={data.height}
                    onChange={handleInputChange}
                    name="height"
                  />
                </div>
              </div>

              <div className="row mx-4">
                <div className="col-12 mb-2">
                  <label className="order-form-label">Cargo width</label>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="order-form-input"
                    defaultValue={data.width}
                    onChange={handleInputChange}
                    name="width"
                  />
                </div>
              </div>

              <div className="row mx-4">
                <div className="col-12 mb-2">
                  <label className="order-form-label">Cargo length</label>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="order-form-input"
                    defaultValue={data.length}
                    onChange={handleInputChange}
                    name="length"
                  />
                </div>
              </div>

              <div className="row mx-4">
                <div className="col-12 mb-2">
                  <label className="order-form-label">Cargo weight</label>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="order-form-input"
                    defaultValue={data.weight}
                    onChange={handleInputChange}
                    name="weight"
                  />
                </div>
              </div>

              <div className="row mt-3 mx-4">
                <div className="col-12 mb-2">
                  <label className="order-form-label">
                    Information about delivery
                  </label>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="order-form-input"
                    placeholder="Start point address"
                    defaultValue={data.startPoint}
                    onChange={handleInputChange}
                    name="startPoint"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="order-form-input"
                    placeholder="End point address"
                    defaultValue={data.endPoint}
                    onChange={handleInputChange}
                    name="endPoint"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="order-form-input datepicker"
                    placeholder="Selected date"
                    type="date"
                    id="date-picker-example"
                    defaultValue={data.date}
                    onChange={handleInputChange}
                    name="date"
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    disabled={data.isSubmitting}
                  >
                    {data.isSubmitting ? "Loading..." : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
export default OrderPage;
