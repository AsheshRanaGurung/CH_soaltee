import { IMember } from "@soaltee-loyalty/interface/member-management";
import { api } from "../api";
import { HttpClient } from "../config/api";
// import axios from "axios";

//get all member management
export const getAllMembers = () => {
  return HttpClient.get(api.member_management.fetch);
};

//create member management
export const createMember = (data: IMember) => {
  return HttpClient.post(`${api.member_management.add}`, {
    data: data,
  });
};

//update property management
export const updateMember = ({ id, data }: { id: string; data: IMember }) => {
  return HttpClient.post(api.member_management.update.replace(":id", id), {
    data: {
      ...data,
    },
  });
};