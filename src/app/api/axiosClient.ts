import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const BASE_URL = "https://data-northwind.indigo.design";

interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      resolve(axiosClient(config));
    }
  });
  failedQueue = [];
};

export const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//
// REQUEST INTERCEPTOR
//
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//
// RESPONSE INTERCEPTOR
//
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;

        localStorage.setItem("access_token", accessToken);

        axiosClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // optional: redirect to login
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    //
    // Global error handling
    //
    if (error.response) {
      switch (error.response.status) {
        case 403:
          console.error("Forbidden");
          break;
        case 404:
          console.error("Not Found");
          break;
        case 500:
          console.error("Server Error");
          break;
      }
    }

    return Promise.reject(error);
  }
);

//
// OPTIONAL HELPERS
//
export const get = <T>(url: string, config?: AxiosRequestConfig) =>
  axiosClient.get<T>(url, config).then((res) => res.data);

export const post = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => axiosClient.post<T>(url, data, config).then((res) => res.data);

export const put = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => axiosClient.put<T>(url, data, config).then((res) => res.data);

export const del = <T>(url: string, config?: AxiosRequestConfig) =>
  axiosClient.delete<T>(url, config).then((res) => res.data);
