import axios from "axios";
import axiosInterceptor from "../apis/axiosInterceptor.js";

const URL = "http://localhost:8080/employees";
axiosInterceptor();
const EmployeeAPI = {
  create: (firstName, lastName, username, password) =>
    axios
      .post(URL + "/add", {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      })
      .then((response) => response.data),
};

export default EmployeeAPI;
