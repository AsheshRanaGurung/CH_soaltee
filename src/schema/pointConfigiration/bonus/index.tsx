import * as yup from "yup";

export const bonusValidationSchema = yup.object().shape({
  bonusName: yup.string().required("Bonus Name is required"),
  validFrom: yup.string().required("valid from date is required"),
  validTo: yup.string().required("valid to date is required"),
  bonusValue: yup.string().required("bonus value is required"),
});
