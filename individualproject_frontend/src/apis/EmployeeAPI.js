import axios from "axios";

const URL = "http://localhost:8080/employees";
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
