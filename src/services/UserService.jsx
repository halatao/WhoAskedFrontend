import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "https://localhost:7129/api/Users/ByUsername?username=";

class UserService {
  getUserBoard() {
    return axios.get(API_URL + localStorage.getItem("username"), {
      headers: authHeader(),
    });
  }
}

export default new UserService();
