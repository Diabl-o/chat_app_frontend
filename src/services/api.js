import axios from "axios";

const API = axios.create({
  baseURL: `http://localhost:5000/api-v2`,
  headers: {
    "Content-Type": "application/json",
  },
});

const authAPI = axios.create({
  baseURL: `http://localhost:5000/api-v2`,
  headers: {
    "Content-Type": "application/json",
  },
});

authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAPI = axios.create({
  baseURL: `http://localhost:5000/api-v2`,
  headers: {
    "Content-Type": "application/json",
  },
});

refreshAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("refreshToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const response = await refreshAPI.post("/auth/token");

    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
};

refreshAPI.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      error.response.logout = true;
      throw error;
    }
  }
);

authAPI.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return authAPI(originalRequest);
      } catch (refresherror) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { API, authAPI, refreshAPI };
