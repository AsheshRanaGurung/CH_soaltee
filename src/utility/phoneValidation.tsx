import * as yup from "yup";

export const createPhoneNumberSchema = () => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return yup
    .string()
    .required("Phone number is required!")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter a 10-digit phone number")
    .max(10, "Please enter a 10-digit phone number");
};
