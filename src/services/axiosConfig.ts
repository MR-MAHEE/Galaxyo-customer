import { API_BASE_URL } from "@/config/config";
import { errorToast } from "@/utils/notificationHelper";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] =
      config.data instanceof FormData
        ? "multipart/form-data"
        : "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

export const handleUnauthorizedError = (error) => {
  if (error.response?.status === 403) {
    errorToast({
      errorMsg: error.response?.data?.message || "Session expired",
    });
    localStorage.removeItem("token");
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      console.error("Request Timeout! Please try again.");
      errorToast("Request Timeout! Please try again.");
    } else {
      return handleUnauthorizedError(error);
    }
  }
);

export default axiosInstance;
