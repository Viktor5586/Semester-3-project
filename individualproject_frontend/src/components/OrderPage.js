import React from "react";
import styles from "./OrderPage.css";
export const OrderPage = () => {
  return (
    <section className="order-form my-4 mx-4">
      <div className="container pt-4">
        <div className="row">
          <div className="col-12">
            <h1>Order Form</h1>
            <hr className="mt-1" />
          </div>
          <div className="col-12">
            <div className="row mx-4">
              <div className="col-12 mb-2">
                <label className="order-form-label">Cargo height</label>
              </div>
              <div className="col-12 col-sm-6">
                <input className="order-form-input" />
              </div>
            </div>

            <div className="row mx-4">
              <div className="col-12 mb-2">
                <label className="order-form-label">Cargo width</label>
              </div>
              <div className="col-12 col-sm-6">
                <input className="order-form-input" />
              </div>
            </div>

            <div className="row mx-4">
              <div className="col-12 mb-2">
                <label className="order-form-label">Cargo length</label>
              </div>
              <div className="col-12 col-sm-6">
                <input className="order-form-input" />
              </div>
            </div>

            <div className="row mx-4">
              <div className="col-12 mb-2">
                <label className="order-form-label">Cargo weight</label>
              </div>
              <div className="col-12 col-sm-6">
                <input className="order-form-input" />
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
                />
              </div>
              <div className="col-12 col-sm-6">
                <input
                  className="order-form-input"
                  placeholder="End point address"
                />
              </div>
              <div className="col-12 col-sm-6">
                <input
                  className="order-form-input datepicker"
                  placeholder="Selected date"
                  type="date"
                  id="date-picker-example"
                />
              </div>
            </div>

            <div className="mt-5 text-center">
              <div className="col-12">
                <button
                  type="button"
                  id="btnSubmit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
