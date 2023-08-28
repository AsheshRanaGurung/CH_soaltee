import axios from "axios";

import TokenService from "./service-token";
import { isTokenExpired } from "@soaltee-loyalty/utility/isTokenExpired";

export const baseURL = "https://fakestoreapi.com";
const THREE_MINUTES = 3 * 60 * 1000;

const axiosClient = axios.create({
  baseURL,
  timeout: THREE_MINUTES,
});
axiosClient.interceptors.request.use(async (config: any) => {
  const token = TokenService.getToken()?.access_token;
  if (config && config.headers) {
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
  }

  config.headers["Accept"] = "application/json";
  config.headers["Content-Type"] = "application/json";
  return config;
});

const clearCache = () => {
  localStorage.remove(`auth`);
  window.location.href = `${window.location.origin}/login`;
};

axiosClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    const isExpired = isTokenExpired(TokenService.getToken()?.refresh_token);
    if (isExpired) clearCache();

    // Backed batw error aye pachi chage garnu parcha
    if (error?.response?.status === 401) {
      const payload = {
        refresh: TokenService.getToken()?.refresh_token,
      };
      axiosClient
        .post(`/api/token/refresh/`, payload)
        .then((response: any) => {
          TokenService.setToken({
            access_token: response?.data?.access,
            refresh_token: TokenService.getToken()?.refresh_token,
          });
        })
        .catch(() => {
          clearCache();
        });
    }
    return Promise.reject(error);
  }
);

const axiosServer = (token: any) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + token?.access_token,
      acccept: "application/json",
      "content-type": "application/json",
    },
  });
};

export { axiosClient, axiosServer };
