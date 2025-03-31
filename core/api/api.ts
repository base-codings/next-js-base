import axios from 'axios';
import { API_ROOT, TIMEOUT } from './config';

const instance = axios.create({
  baseURL: API_ROOT,
  timeout: TIMEOUT,
  headers: {},
});

export function setDefaultHeaders(headers: object) {
  Object.keys(headers).forEach((key) => {
    instance.defaults.headers.common[key] = headers[key];
  });
}

instance.interceptors.response.use(
  (response) => {
    return response;
  }
  // (error) => {
  //   // if (error?.response?.status === 401) {
  //   //   deleteCookie("auth_access_token");
  //   // }
  //   // router.push("/login");
  // }
);

export default instance;
