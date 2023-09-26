import * as yup from "yup";

export const serviceValidationSchema = yup.object().shape({
  serviceName: yup.string().required("serviceName is required"),
  serviceCode: yup.string().required("serviceCode is required"),
});
