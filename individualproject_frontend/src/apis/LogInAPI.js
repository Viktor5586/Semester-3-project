import axios from "axios";

const URL = "http://localhost:8080/login";
const LogInAPI = {
    logInUser : (username, password) =>
    axios
        .post(URL, {username:username, password:password})
        .then((response) => response.data),
    };
export default LogInAPI;