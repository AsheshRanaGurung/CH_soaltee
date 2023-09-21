import * as yup from "yup";

export const voucherValidationSchema = yup.object().shape({
  voucherName: yup.string().required("Voucher Name is required"),
  serviceId: yup
    .mixed()
    .test("is-service-valid", "Please select valid service", function (value) {
      if (typeof value === "object") {
        return true;
      }
      return false;
    })
    .required("Please select service"),

  discountPercentage: yup.string().required("Discount Percentage is required"),
  maximumAmounts: yup.string().required("Maximum Amount is required"),
  maximumLimits: yup.string().required("Maximum Limits is required"),
  voucherDescription: yup.string().required("Voucher description is required"),
  image: yup
    .mixed()
    .test(
      "is-valid-image",
      "Only PNG, JPEG, or JPG images are allowed",
      (value) => {
        if (!(value instanceof Blob)) {
          return false;
        }

        const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
        return allowedMimeTypes.includes(value.type);
      }
    ),
});
