import { api } from "../api";
import { HttpClient } from "../config/api";

export const getImage = async (id: any) => {
  const response = await HttpClient.get(api.fetchImage.replace(":id", id), {
    responseType: "blob",
  });
  return response;
};
