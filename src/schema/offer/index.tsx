import * as yup from "yup";

export const offerValidationSchema = yup.object().shape({
  offerName: yup.string().required("Offer Name is required"),
  description: yup.string().required("Description is required"),
  subTitle: yup.string().required("Subtitle is required"),
});
