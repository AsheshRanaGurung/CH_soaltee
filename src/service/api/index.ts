export const api = {
  auth: {
    register: "/api/v1/users/register/",
  },
};
export interface IResponse<T = unknown> {
  data: T;
  status: 0 | 1;
  message: string;
}
