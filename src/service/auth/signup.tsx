import { api } from "../api";
import { axiosClient } from "../config/api";
import { ISignup } from "~/src/interface/auth/signup";
import axios from "axios";
// export const signUpApi = (data: ISignup) => {
//   console.log("data is", data);
//   // return data;
//   return axiosClient.post(`${api.auth.register}`, data);
// };
export const signUpApi = async (data: ISignup) => {
  console.log("data s", data);
  const response = await axios.post("https://fakestoreapi.com/carts");
  return response.data;
};
