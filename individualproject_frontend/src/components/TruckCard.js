import React from "react";
import styles from './Truck.css'
export const TruckCard = ({allTruckEntities}) =>{
    return(
        <div className="truck-container">
            <div className="truck-card" style={{width: "width: 18rem"}}>
                <h2>{allTruckEntities.location}</h2>
                <div className="card-body">
                        <ul>Height: {allTruckEntities.height}</ul>
                        <ul>Width: {allTruckEntities.width}</ul>
                        <ul>Length: {allTruckEntities.length}</ul>
                        <ul>Max weight: {allTruckEntities.maxWeight}</ul>
                        <ul>Tank volume: {allTruckEntities.tankVolume}</ul>
                        <ul>Fuel consumption per km: {allTruckEntities.fuelConsumptionPerKm}</ul>
                </div>
            </div>
        </div>
    )
}

export default TruckCard;