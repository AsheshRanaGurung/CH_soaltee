export const api = {
  auth: {
    register: "/users/save-users",
    set_password: "/users/change-password",
    login: "/auth/login",
    reset_password: "/users/reset-password",
  },
  configuration: {
    service: {
      add: "/service-category/create-service",
      fetch: "/service-category/get-all-service",
      delete: "/service-category/delete-service-category/:id",
      update: "/service-category/update-service-category/:id",
    },
  },
  master_data: {
    member_tier: {
      add: "/membership/create-tier",
      fetch: "/membership/get-all-tier",
      delete: "/membership/delete-tier/:id",
      update: "/membership/update-tier/:id",
    },
    property_list: {
      add: "/property/save-property",
      fetch: "/property/fetch-all",
      delete: "/property/delete-property/:id",
      update: "/property/update-property/:id",
    },
  },
  dashboard: {
    fetch: "/report/dashboard-report",
    fetchreward: "/report/top-reward-users",
  },
  member_management: {
    add: "/auth/save-users",
    fetch: "/auth/get-users",
    update: "/auth/update-user/:id",
    fetchById: "/users/get-all-user-details/:id",
    get_history: "/report/transaction-history",
  },
  profile: {
    manual: {
      add: "/loyalty/save-loyalty-points",
    },
    service: {
      add: "/loyalty/save-loyalty-points-servicewise",
    },
  },
  user: {
    fetch: "users/get-all-details",
    update: "users/update-profile/:id",
  },
  fetchImage: "/membership/get-tier-image/:id",
};
export interface IResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
