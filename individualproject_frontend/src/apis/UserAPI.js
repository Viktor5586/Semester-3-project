import axios from "axios";

const URl = "http://localhost:8080/users";
const URL_OneUser = "http://localhost:8080/users?id=";
const GetUsersAPI = {
  loadUsers: () => axios.get(URl).then((response) => response.data),
  loadUser: (id, firstName, lastName) =>
    axios.get(URL_OneUser + id).then((response) => response.data),

  updateUser: (id, firstName, lastName, username, oldPassword, newPassword) =>
    axios.put(URl, {
      id: id,
      firstName: firstName,
      lastName: lastName,
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }),
  user: (firstName, lastName, username, password) =>
    axios
      .post(URl + "/add", {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      })
      .then((response) => response.data),
};

export default GetUsersAPI;
