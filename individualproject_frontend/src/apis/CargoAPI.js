import axios from "axios";

const URL = "http://localhost:8080/cargos";
const CargoAPI = {
  order: (
    height,
    width,
    length,
    weight,
    startPoint,
    endPoint,
    date,
    customerId
  ) =>
    axios
      .post(URL + "/add", {
        height: height,
        width: width,
        length: length,
        weight: weight,
        startPoint: startPoint,
        endPoint: endPoint,
        date: date,
        customerId: customerId,
      })
      .then((response) => response.data),

  loadOrders: () => axios.get(URL).then((response) => response.data),
};

export default CargoAPI;
