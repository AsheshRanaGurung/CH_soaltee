import * as yup from "yup";
export const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  //   phone: yup.string().required("Phone no is required"),
});
