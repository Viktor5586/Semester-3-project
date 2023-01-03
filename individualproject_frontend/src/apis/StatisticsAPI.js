import axios from "axios";
const URL = "http://localhost:8080/statistics";

const GetStatistics = {
  loadTruckStatistics: () =>
    axios.get(URL + "/trucks").then((response) => response.data),
  loadOrderStatisticsByApproval: (approved) =>
    axios.get(URL + `/orders/${approved}`).then((response) => response.data),
  loadOrderStatisticsByDate: (date) =>
    axios.get(URL + `/ordersDate/${date}`).then((response) => response.data),
  loadUserStatisticsByRole: (role) =>
    axios.get(URL + `/users/${role}`).then((response) => response.data),
};

export default GetStatistics;
