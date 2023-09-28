import { formatDateToYYYYMMDD } from "@src/utility/formatDateToYYYYMMDD";
import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import * as yup from "yup";

const today = new Date();
const eighteenYearsAgo: any = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);
const validDate: any = formatDateToYYYYMMDD(eighteenYearsAgo);
export const memberManagementValidation = yup.object().shape({
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
  propertyId: yup
    .mixed()
    .test("is-property-valid", "Please select Property", function (value) {
      if (typeof value === "object") {
        return true;
      }
      return false;
    }),
  dateOfBirth: yup
    .date()
    .required("DOB is required")
    .max(validDate, "Member must be at least 18 years old")
    .test("is-valid-dob", "Invalid DOB", function (value) {
      if (!value) {
        return false;
      }
      return true;
    }),
});
