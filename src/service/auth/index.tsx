import { ILogin, ISetPassword, ISignup } from "@src/interface/auth";
import { api } from "../api";
import { HttpClient } from "../config/api";
// import axios from "axios";

export const signUpApi = (data: ISignup) => {
  return HttpClient.post(`${api.auth.register}`, {
    data: data,
  });
};
export const logoutApi = () => {
  return HttpClient.post(`${api.auth.logout}`);
};

export const setPasswordApi = (data: ISetPassword) => {
  return HttpClient.post(`${api.auth.set_password}`, {
    data: data,
  });
};

export const resetPasswordApi = (data: ILogin) => {
  return HttpClient.post(`${api.auth.reset_password}`, {
    data: data,
  });
};
export const loginApi = (data: ILogin) => {
  return HttpClient.post(`${api.auth.login}`, {
    data: data,
  });
};
