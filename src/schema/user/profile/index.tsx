import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import * as yup from "yup";

export const userProfileValidationSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phoneNumber: createPhoneNumberSchema(),
  nationalityId: yup
    .mixed()
    .test("is-nationality-valid", "Please select country", function (value) {
      if (typeof value === "object") {
        return true;
      }
      return false;
    })
    .required("Please select country"),
});
