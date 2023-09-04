import { IMember } from "@src/interface/member-management";
import { api } from "../api";
import { HttpClient } from "../config/api";

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

export const fetchOneMember = ({ id }: { id: string }) => {
  return HttpClient.get(api.member_management.fetchById.replace(":id", id));
};
