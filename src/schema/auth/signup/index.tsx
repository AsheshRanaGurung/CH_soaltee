import * as yup from "yup";
import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import { formatDateToYYYYMMDD } from "@src/utility/formatDateToYYYYMMDD";

const today = new Date();
const eighteenYearsAgo: any = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);
const validDate: any = formatDateToYYYYMMDD(eighteenYearsAgo);
export const signupValidationSchema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
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

  dateOfBirth: yup
    .date()
    .required("DOB is required")
    .max(validDate, "You must be at least 18 years old")
    .test("is-valid-dob", "Invalid DOB", function (value) {
      if (!value) {
        return false;
      }
      return true;
    }),
});
