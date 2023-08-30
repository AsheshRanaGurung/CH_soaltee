export const api = {
  auth: {
    register: "/users/save-users",
    set_password: "/users/change-password",
    login: "/auth/login",
  },
};
export interface IResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
