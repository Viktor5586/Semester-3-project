import axios from "axios";

const URL = "http://localhost:8080/trucks";
const GetTrucksAPI = {
    loadTrucks: () =>
    axios
        .get(URL)
        .then((response) => response.data),

};

export default GetTrucksAPI;