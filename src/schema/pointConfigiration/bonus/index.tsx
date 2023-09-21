import * as yup from "yup";

export const bonusValidationSchema = yup.object().shape({
  bonusName: yup.string().required("Bonus name is required"),
  validFrom: yup
    .string()
    .required("Valid from date is required")
    .test("is-valid-from", "Invalid Date", function (value) {
      if (!value) {
        return false;
      }
      return true;
    }),
  serviceId: yup
    .mixed()
    .test("is-service-valid", "Please select valid service", function (value) {
      if (typeof value === "object") {
        return true;
      }
      return false;
    })
    .required("Please select service"),
  validTo: yup
    .string()
    .required("Valid to date is required")
    .test("is-valid-to", "Invalid Date", function (value) {
      if (!value) {
        return false;
      }
      return true;
    }),
  bonusValue: yup.string().required("Bonus value is required"),
});
