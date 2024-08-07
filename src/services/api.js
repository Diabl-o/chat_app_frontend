import axios from "axios";
import toast from "react-hot-toast";

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
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(
      "http://localhost:5000/api-v2/auth/token",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
  }
};

authAPI.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 || error.response.status === 403) {
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return authAPI(originalRequest);
      } catch (refresherror) {
        console.error("Failed to refresh token", refresherror);
        toast.error("Session Expired!");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { API, authAPI };
