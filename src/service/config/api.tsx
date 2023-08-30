import axios from "axios";
import TokenService from "./service-token";
const THREE_MINUTES = 3 * 60 * 1000;
export const baseURL = import.meta.env.VITE_APP_BACKEND_API;
/**
 * Axios HTTP Client
 * {@link https://github.com/axios/axios#request-config Axios Request Config}
 */
const HttpClient = axios.create({
  baseURL,
  timeout: THREE_MINUTES,
});
HttpClient.interceptors.request.use(async (config) => {
  const token = TokenService.getToken()?.access;
  if (config && config.headers) {
    if (token && config.headers["Authorization"] !== "") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (config.headers["Authorization"] === "") {
      delete config.headers["Authorization"];
    }
  }
  return config;
});
export { HttpClient };
