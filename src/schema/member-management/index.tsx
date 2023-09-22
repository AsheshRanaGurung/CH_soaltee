import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import * as yup from "yup";

export const memberManagementValidation = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().required("Email is required"),
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
  propertyId: yup
    .mixed()
    .test("is-property-valid", "Please select Property", function (value) {
      if (typeof value === "object") {
        return true;
      }
      return false;
    }),
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
