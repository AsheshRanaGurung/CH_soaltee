export interface ISignup {
  fullName?: string;
  email?: string;
  phoneNumber?: string | number;
  nationality?: string;
}

export interface ISetPassword {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ILogin {
  email?: string;
  password?: string;
}
