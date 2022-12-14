import axios from "axios";

const URl = "http://localhost:8080/users";
const URL_OneUser = "http://localhost:8080/users?id=";
const GetUsersAPI = {
  loadUsers: () => axios.get(URl).then((response) => response.data),
  loadUser: (id, firstName, lastName) =>
    axios.get(URL_OneUser + id).then((response) => response.data),

  updateUser: (id, firstName, lastName, username, oldPassowrd, newPassword) =>
    axios.put(URl, {
      id: id,
      firstName: firstName,
      lastName: lastName,
      username: username,
      oldPassowrd: oldPassowrd,
      newPassword: newPassword,
    }),
};

const GetUserAPI = {
  // loadUser: () => axios.get(URL + "/" + id).then((response) => response.data),
};

export default GetUsersAPI;
