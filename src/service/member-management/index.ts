import { IMember } from "@src/interface/member-management";
import { api } from "../api";
import { HttpClient } from "../config/api";

export const getAllMembers = (pageParams: any) => {
  const pageIndex = pageParams.queryKey[1]?.page;
  const pageSize = pageParams.queryKey[1]?.limit;
  const name = pageParams.queryKey[1]?.name;
  return HttpClient.get(
    api.member_management.fetch.replace(
      `pageIndex={page}&pageSize={limit}&name={name}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&name=${name}`
    )
  );
};

export const createMember = (data: IMember) => {
  return HttpClient.post(`${api.member_management.add}`, {
    data: data,
  });
};
export const createMemberByStaff = (data: IMember) => {
  return HttpClient.post(`${api.member_management.add_by_staff}`, {
    data: data,
  });
};

export const fetchOneMember = ({ id }: { id: string }) => {
  return HttpClient.get(api.member_management.fetchById.replace(":id", id));
};

export const getAllMemberHistory = ({ id }: { id: string }) => {
  const pageIndex = 1;
  const pageSize = 10;
  return HttpClient.get(
    api.member_management.get_history.replace(
      `pageIndex={page}&pageSize={limit}&userId={id}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${id}`
    )
  );
};
