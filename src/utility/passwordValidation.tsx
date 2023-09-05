import * as yup from "yup";

export const createPasswordSchema = () => {
  const passwordRegExp = /(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])/;

  return yup
    .string()
    .required("Password is required")
    .matches(
      passwordRegExp,
      "Password must contain one uppercase, one lowercase, and a special character."
    )
    .min(8, "Password must be at least 8 digits");
};
