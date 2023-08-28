// import { ISignup } from "@soaltee-loyalty/interface/auth/signup";
// import { api } from "../api";
// import { axiosClient } from "../config/api";
import axios from "axios";
// export const signUpApi = (data: ISignup) => {
//   // return data;
//   return axiosClient.post(`${api.auth.register}`, data);
// };
export const signUpApi = async () => {
  const response = await axios.post("https://fakestoreapi.com/carts");
  return response.data;
};
