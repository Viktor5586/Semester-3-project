import axios from "axios";

const URL = "http://localhost:8080/cargos";
const CargoAPI = {
  order: (height, width, length, weight, startPoint, endPoint, date) =>
    axios
      .post(URL + "/add", {
        height: height,
        width: width,
        length: length,
        weight: weight,
        startPoint: startPoint,
        endPoint: endPoint,
        date: date,
      })
      .then((response) => response.data),
};

export default CargoAPI;
