import axios from "axios";
import { message } from "antd";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    console.log("!!! request error", error)
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
     if (res.status === 200) {
        console.log('Posted Successfully');
     }
     if (res.status === 400) {
      message.error(`ERR400: There was an error in your request`);
     }
     if (res.status === 500) {
      message.error(`ERR400: There was an error in your request`);
     }
     return res;
  },
  (err) => {
    message.error(`There was an error in your request`);
    return Promise.reject(err);
  }
);