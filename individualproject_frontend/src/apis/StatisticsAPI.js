import axios from "axios";
import axiosInterceptor from "../apis/axiosInterceptor.js";

const URL = "http://localhost:8080/statistics";

axiosInterceptor();
const GetStatistics = {
  loadStatistics: () => axios.get(URL).then((response) => response.data),
};

export default GetStatistics;
