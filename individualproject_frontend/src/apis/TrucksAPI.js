import axios, { AxiosHeaders } from "axios";

const URL = "http://localhost:8080/trucks";
const GetTrucksAPI = {
  loadTrucks: () => axios.get(URL).then((response) => response.data),
  loadFilteredTrucks: (param, value) =>
    axios.get(URL + `?${param}=${value}`).then((response) => response.data),

  deleteTruck: (truckId) =>
    axios
      .delete(URL + "/delete", {
        data: {
          truckId: truckId,
        },
        // truckId,
      })
      .then((response) => response.data),
  createTruck: (
    licencePlate,
    location,
    height,
    width,
    length,
    maxWeight,
    tankVolume,
    fuelConsumptionPerKm
  ) =>
    axios.post(URL + "/add", {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      licencePlate: licencePlate,
      location: location,
      height: height,
      width: width,
      length: length,
      maxWeight: maxWeight,
      tankVolume: tankVolume,
      fuelConsumptionPerKm: fuelConsumptionPerKm,
    }),
};

export default GetTrucksAPI;
