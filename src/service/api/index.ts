export const api = {
  auth: {
    register: "/users/save-users",
    set_password: "/users/change-password",
    login: "/auth/login",
  },
  configuration: {
    service: {
      add: "/service-category/create-service",
      fetch: "/service-category/get-all-service",
      delete: "/service-category/delete-service-category/:id",
      update: "/service-category/update-service/:id",
    },
  },
  master_data: {
    member_tier: {
      add: "/membership/create-tier",
      fetch: "/membership/get-all-tier",
      delete: "/membership/delete-tier/:id",
    },
    property_list: {
      add: "/property/save-property",
      fetch: "/property/fetch-all",
      delete: "/property/delete-property/:id",
      update: "/property/update-property/:id",
    },
  },
  member_management: {
    add: "/auth/save-users",
    fetch: "/auth/get-users",
    update: "/auth/update-user/:id",
  },
};
export interface IResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
