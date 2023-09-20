import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import * as yup from "yup";

export const propertyValidation = yup.object().shape({
  name: yup.string().required("Property Name is required"),
  code: yup.string().required("Property Code is required"),
  phoneNumber: createPhoneNumberSchema(),
  contactPerson: yup.string().required("Contact Person Name is required"),
  contactPersonPhoneNo: createPhoneNumberSchema(),
});
