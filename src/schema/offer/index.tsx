import * as yup from "yup";

export const offerValidationSchema = yup.object().shape({
  offerName: yup.string().required("Offer Name is required"),
  description: yup.string().required("Description is required"),
  subTitle: yup.string().required("Subtitle is required"),
  image: yup
    .mixed()
    .test(
      "is-valid-image",
      "Only PNG, JPEG, or JPG images are allowed",
      (value) => {
        if (typeof value === "string") {
          const isUrl = /^http?:\/\/.*/.test(value);
          return isUrl;
        } else if (value instanceof Blob) {
          // If the value is a Blob, check its MIME type
          const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
          return allowedMimeTypes.includes(value.type);
        }
        return false;
      }
    ),
});
