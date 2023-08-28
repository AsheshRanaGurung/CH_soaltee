import { IProduct } from "@soaltee-loyalty/interface/product/product";
import axios from "axios";
import { useQuery } from "react-query";

const getProducts = () => {
  return axios.get<IProduct[]>("https://fakestoreapi.com/products");
};

const useGetProducts = () => {
  return useQuery(["products"], () => getProducts(), {
    select: ({ data }) => data,
  });
};
export { useGetProducts };
