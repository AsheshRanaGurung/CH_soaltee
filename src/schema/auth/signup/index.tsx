import * as yup from "yup";
import { createPhoneNumberSchema } from "@src/utility/phoneValidation";

export const signupValidationSchema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phoneNumber: createPhoneNumberSchema(),
  nationalityId: yup
    .mixed()
    .test(
      "is-nationality-valid",
      "Please select nationality",
      function (value) {
        if (typeof value === "object") {
          return true;
        }
        return false;
      }
    )
    .required("Please select nationality"),

  dateOfBirth: yup
    .string()
    .required("DOB is required")
    .max(+new Date(), "Date of Birth cannot be in the future")
    .test("is-valid-dob", "Invalid DOB", function (value) {
      if (!value) {
        return false;
      }
      return true;
    }),
});
