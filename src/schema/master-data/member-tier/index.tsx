import * as yup from "yup";

export const memberTierValidationSchema = yup.object().shape({
  membershipName: yup.string().required("Membership Name is required"),
  pointsFrom: yup
    .number()
    .required("Point is required")
    .typeError("Points must be a number"),
  pointsTo: yup
    .number()
    .required("Point is required")
    .test(
      "is-greater",
      "Point To must be greater than Point From",
      function (value: any) {
        const { pointsFrom } = this.parent;
        return value && value > pointsFrom;
      }
    )
    .typeError("Points must be a number"),
  description: yup.string().required("Description is required"),
});
