import axios from "axios";

const URL = "http://localhost:8080/trucks";
const GetTrucksAPI = {
  loadTrucks: () => axios.get(URL).then((response) => response.data),
  deleteTruck: (truckId) =>
    //   console.log("'truckId' : " + truckId),
    axios
      .delete(URL + "/delete", {
        data: {
          truckId: truckId,
        },
        // truckId,
      })
      .then((response) => response.data),
  // axios.delete(URL + "/delete", { truckId }),
};

export default GetTrucksAPI;
