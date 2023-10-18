import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_URL,
  timeout: 5000,
});

apiInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (err) {
    return Promise.reject(err);
  }
);

export default apiInstance;
