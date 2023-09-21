import * as yup from "yup";

export const voucherValidationSchema = yup.object().shape({
  voucherName: yup.string().required("Voucher Name is required"),
  serviceId: yup
    .mixed()
    .test(
      "is-service-valid",
      "Please select a valid service",
      function (value) {
        if (typeof value === "string") {
          return true;
        } else if (typeof value === "object") {
          return true;
        }
        return false;
      }
    )
    .required("Please select service"),

  discountPercentage: yup.string().required("percentage is required"),
});
