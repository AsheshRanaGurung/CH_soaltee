import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import * as yup from "yup";

export const memberManagementValidation = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().required("Email is required"),
  phoneNumber: createPhoneNumberSchema(),
  nationalityId: yup.string().required("Nationality is required"),
  propertyId: yup.string().required("Property Name is required"),
  dateOfBirth: yup.string().required("DOB is required"),
});
