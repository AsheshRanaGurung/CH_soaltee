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
      fetch:
        "/service-category/get-all-service?pageIndex={page}&pageSize={limit}&name={name}",
      delete: "/service-category/delete-service-category/:id",
      update: "/service-category/update-service-category/:id",
    },
    bonus: {
      add: "/bonus/save-bonus",
      fetch:
        "/bonus/get-all-bonus?pageIndex={page}&pageSize={limit}&name={name}",
      delete: "/bonus/delete-bonus/:id",
      update: "/bonus/update-bonus/:id",
    },
  },
  report: {
    fetch:
      "/report/overall-report?pageIndex={page}&pageSize={limit}&tier={tier}&property={property}&nationality={nationality}&totalAmount={totalAmount}&fromDate={fromDate}&toDate={toDate}",
    fetch_earning:
      "/report/earning-report?pageIndex={page}&pageSize={limit}&tier={tier}&property={property}&nationality={nationality}&totalAmount={totalAmount}&fromDate={fromDate}&toDate={toDate}",
    export_user:
      "/excel/overall-report?pageIndex={page}&pageSize={limit}&tier={tier}&property={property}&nationality={nationality}&totalAmount={totalAmount}&fromDate={fromDate}&toDate={toDate}",
    export_earning:
      "/excel/earning-report?pageIndex={page}&pageSize={limit}&tier={tier}&property={property}&nationality={nationality}&totalAmount={totalAmount}&fromDate={fromDate}&toDate={toDate}",
  },
  master_data: {
    member_tier: {
      add: "/membership/create-tier",
      fetch:
        "/membership/get-all-tier?pageIndex={page}&pageSize={limit}&name={name}",
      fetchBYid: "/membership/get-tier-by-id",
      delete: "/membership/delete-tier/:id",
      update: "/membership/update-tier/:id",
    },
    property_list: {
      add: "/property/save-property",
      fetch:
        "/property/get-all-properties?pageIndex={page}&pageSize={limit}&name={name}",
      delete: "/property/delete-property/:id",
      update: "/property/update-property/:id",
      single_property: "/property/get-property/:id",
    },
  },
  dashboard: {
    fetch: "/dashboard/total-user-reward-report?type=",
    fetchreward: "/dashboard/top-reward-users?propertyId={propertyID}&tier=",
    fetchTotal: "/dashboard/total-members-mw?type=",
    fetchTier: "/dashboard/get-total-user-tier?propertyId={propertyID}&type=",
    fetchBlock: "/dashboard/total-active-block-user",
    update: "",
    fetchRecentActivity:
      "dashboard/get-recent-activity?propertyId={propertyID}",
  },
  staff_management: {
    qr_fetch: "/staff/get-property-link",
    fetch:
      "/users/get-staff-details?pageIndex={page}&pageSize={limit}&name={name}",
  },
  member_management: {
    add: "/master/save-users",
    fetch: "/auth/get-users?pageIndex={page}&pageSize={limit}&name={name}",
    update: "/auth/update-user/:id",
    fetchById: "/users/get-all-user-details/:id",
    get_history:
      "/report/transaction-history?pageIndex={page}&pageSize={limit}&userId={id}",
    add_by_staff: "/staff/save-users",
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
    fetch:
      "/voucher/get-all-voucher?pageIndex={page}&pageSize={limit}&name={name}",
    delete: "/voucher/delete-voucher-promo/:id",
    update: "/voucher/update-voucher-promo/:id",
    fetchID: "/voucher/get-voucher-promo",
  },
  offer: {
    fetch:
      "/offers/get-all-offers?pageIndex={page}&pageSize={limit}&name={name}",
    add: "/offers/save-offer",
    update: "/offers/update-offer/:id",
    delete: "/offers/delete-offer/:id",
    fetchID: "/offers/get-offer",
  },
  fetchImage: "/membership/get-tier-image/:id",
  nationality: "/nationality/fetch-all",
  referal_link: "/users/get-referral-link",
  send_email: "/email/send-ref-email",
  transcaction_history:
    "/users/user-txn-history?pageIndex={page}&pageSize={limit}&type={type}&propertyId={propertyId}&dates={dates}",
  decrypt_pid: "/users/decrypt-key?value={value}",
};
export interface IResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
