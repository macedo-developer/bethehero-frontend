import axios from "axios";

const api = axios.create({
  baseURL: "https://bethehero-sm-backend.herokuapp.com/",
});

export default api;
