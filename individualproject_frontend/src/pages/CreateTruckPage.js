import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TRUCKAPI from "../apis/TrucksAPI.js";
import axiosInterceptor from "../apis/axiosInterceptor.js";
import style from "./CreateTruckPage.css";

export const CreateTruckPage = () => {
  const navigateToPage = useNavigate();
  const initialState = {
    licencePlate: "",
    location: "",
    height: "",
    width: "",
    length: "",
    maxWeight: "",
    tankVolume: "",
    fuelConsumptionPerKm: "",
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
    axiosInterceptor();
    TRUCKAPI.createTruck(
      data.licencePlate,
      data.location,
      data.height,
      data.width,
      data.length,
      data.maxWeight,
      data.tankVolume,
      data.fuelConsumptionPerKm
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
    <section className="truck-form my-4 mx-4">
      <form onSubmit={handleFormSubmit}>
        <div className="container pt-4">
          <div className="row">
            <div className="col-12">
              <h1>Truck Form</h1>
              {data.errorMessage && (
                <span className="form-error">{data.errorMessage}</span>
              )}
              <hr className="mt-1" />
            </div>
            <div className="col-12">
              <div className="row mx-4">
                <div className="col-12 mb-2">
                  <label className="truck-form-label">Truck licencePlate</label>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="truck-form-input"
                    defaultValue={data.licencePlate}
                    onChange={handleInputChange}
                    name="licencePlate"
                  />
                </div>
              </div>

              <div className="row mx-4">
                <div className="col-12 mb-2">
                  <label className="truck-form-label">Truck location</label>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="truck-form-input"
                    defaultValue={data.location}
                    onChange={handleInputChange}
                    name="location"
                  />
                </div>
              </div>

              <div className="row mx-4">
                <div className="col-12 mb-2">
                  <label className="truck-form-label">Truck height</label>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="truck-form-input"
                    defaultValue={data.height}
                    onChange={handleInputChange}
                    name="height"
                  />
                </div>
              </div>

              <div className="row mx-4">
                <div className="col-12 mb-2">
                  <label className="truck-form-label">Truck width</label>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="truck-form-input"
                    defaultValue={data.width}
                    onChange={handleInputChange}
                    name="width"
                  />
                </div>
              </div>

              <div className="row mx-4">
                <div className="col-12 mb-2">
                  <label className="truck-form-label">Truck length</label>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="truck-form-input"
                    defaultValue={data.length}
                    onChange={handleInputChange}
                    name="length"
                  />
                </div>
              </div>

              <div className="row mx-4">
                <div className="col-12 mb-2">
                  <label className="truck-form-label">Truck weight</label>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="truck-form-input"
                    defaultValue={data.maxWeight}
                    onChange={handleInputChange}
                    name="maxWeight"
                  />
                </div>
              </div>

              <div className="row mt-3 mx-4">
                <div className="col-12 mb-2">
                  <label className="truck-form-label">
                    Additional information about the truck
                  </label>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="truck-form-input"
                    placeholder="Tank volume"
                    defaultValue={data.tankVolume}
                    onChange={handleInputChange}
                    name="tankVolume"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="truck-form-input"
                    placeholder="Fuel consumption per km"
                    defaultValue={data.fuelConsumptionPerKm}
                    onChange={handleInputChange}
                    name="fuelConsumptionPerKm"
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

export default CreateTruckPage;
