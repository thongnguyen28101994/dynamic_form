import { message } from "antd";
import axios from "axios";

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.headers = {
    Token: sessionStorage.getItem("token"),
  };
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export const axiosClientPostFormData = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "multipart/form-data",
  },
});
axiosClientPostFormData.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.headers = {
    Token: sessionStorage.getItem("token"),
  };
  return config;
});

export const axiosClientKhaosat7 = axios.create({
  baseURL: "https://apigateway.hcm.edu.vn",
  headers: {
    "content-type": "application/json",
  },
});
axiosClientKhaosat7.customRequest = () => {};
axiosClientKhaosat7.customResponse = (selectedURL) => {};
axiosClientKhaosat7.interceptors.request.use(async (config) => {
  // Handle token here ...
  axiosClientKhaosat7.customRequest();
  config.headers = {
    Token: sessionStorage.getItem("token"),
  };
  return config;
});

axiosClientKhaosat7.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      axiosClientKhaosat7.customResponse(response.data);
      return response.data;
    }
    return response;
  },
  (error) => {
    setTimeout(() => {
      message.error("Máy chủ đang bận, Vui lòng quay lại sau!");
    }, 300);
    axiosClientKhaosat7.customResponse();
    throw error;
  }
);

export const axiosClientAdminToken = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

axiosClientAdminToken.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.headers = {
    Token: "%8hKj909*nm",
  };
  return config;
});

axiosClientAdminToken.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export const axiosApiGateway = axios.create({
  baseURL: "https://apigateway.hcm.edu.vn/WAPINetCore",
  headers: {
    "content-type": "application/json",
  },
});

axiosApiGateway.interceptors.request.use(async (config) => {
  // Handle token here ...
  if (config.url.includes("http")) {
    config.baseURL = "";
  }
  config.headers = {
    Token: sessionStorage.getItem("token"),
  };
  // axiosClient.customRequest();
  return config;
});
axiosApiGateway.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    axiosClient.customResponse();
    throw error;
  }
);

export default axiosClient;
