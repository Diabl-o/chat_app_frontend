import axios from "axios";

const API = axios.create({
  baseURL: `http://localhost:5000/api-v2`,
  headers: {
    "Content-Type": "application/json",
  },
});

const authAPI = axios.create({
  baseURL: `http://localhost:5000/api-v2/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export { API, authAPI };
