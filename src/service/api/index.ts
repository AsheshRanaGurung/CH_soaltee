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
    bonus: {
      add: "/bonus/save-bonus",
      fetch: "/bonus/get-all-bonus",
      delete: "/bonus/delete-bonus/:id",
      update: "/bonus/update-bonus/:id",
    },
  },
  report: {
    fetch: "/report/overall-report",
  },
  master_data: {
    member_tier: {
      add: "/membership/create-tier",
      fetch: "/membership/get-all-tier",
      fetchBYid: "/membership/get-tier-by-id",
      delete: "/membership/delete-tier/:id",
      update: "/membership/update-tier/:id",
    },
    property_list: {
      add: "/property/save-property",
      // fetch: "/property/fetch-all?pageIndex={page}&pageSize={limit}",
      fetch: "/property/fetch-all",
      delete: "/property/delete-property/:id",
      update: "/property/update-property/:id",
    },
  },
  dashboard: {
    fetch: "/dashboard/total-user-reward-report?type=",
    fetchreward: "/dashboard/top-reward-users?propertyId={provertyID}&tier=",
    fetchTotal: "/dashboard/total-members-mw?type=",
    fetchTier: "/dashboard/get-total-user-tier?propertyId={provertyID}&type=",
    fetchBlock: "/dashboard/total-active-block-user",
    update: "",
  },
  member_management: {
    add: "/auth/save-users",
    fetch: "/auth/get-users",
    update: "/auth/update-user/:id",
    fetchById: "/users/get-all-user-details/:id",
    get_history:
      "/report/transaction-history?pageIndex={page}&pageSize={limit}&userId={id}",
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
  voucher: {
    add: "/voucher/create-voucher",
    fetch: "/voucher/get-all-voucher",
    delete: "/voucher/delete-voucher-promo/:id",
    update: "/voucher/update-voucher-promo/:id",
    fetchID: "/voucher/get-voucher-promo",
  },
  offer: {
    fetch: "/offers/get-all-offers",
    add: "/offers/save-offer",
    update: "/offers/update-offer/:id",
    delete: "/offers/delete-offer/:id",
    fetchID: "/offers/get-offer",
  },
  fetchImage: "/membership/get-tier-image/:id",
  nationality: "/nationality/fetch-all",
};
export interface IResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
