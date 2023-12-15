import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://houseservice.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;
