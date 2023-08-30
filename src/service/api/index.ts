export const api = {
  auth: {
    register: "/users/save-users",
    set_password: "/users/change-password",
    login: "/auth/login",
  },
  master_data: {
    member_tier: {
      fetch: "/membership/get-all-tier",
      delete: "membership/delete-tier/:id",
    },
    property_list: {
      fetch: "/property/fetch-all",
      delete: "/property/delete-property/:id",
    },
  },
  member_management: {
    fetch: "/auth/get-users",
    add: "/auth/save-users",
  },
};
export interface IResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
