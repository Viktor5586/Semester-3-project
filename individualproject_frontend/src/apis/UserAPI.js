import axios from "axios";

const URl = "http://localhost:8080/users";
const GetUsersAPI = {
  loadUsers: () => axios.get(URl).then((response) => response.data),
};

export default GetUsersAPI;
