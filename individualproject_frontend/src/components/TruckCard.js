import React from "react";
export const TruckCard = ({ allTruckEntities }) => {
  return (
    <div className="row">
      <div className="col-sm-7">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{allTruckEntities.location}</h5>
            <ul>Height: {allTruckEntities.height}</ul>
            <ul>Width: {allTruckEntities.width}</ul>
            <ul>Length: {allTruckEntities.length}</ul>
            <ul>Max weight: {allTruckEntities.maxWeight}</ul>
            <ul>Tank volume: {allTruckEntities.tankVolume}</ul>
            <ul>
              Fuel consumption: {allTruckEntities.fuelConsumptionPerKm}L per km
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckCard;
