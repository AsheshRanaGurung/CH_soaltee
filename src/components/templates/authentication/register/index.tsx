import { Button, VStack, Link } from "@chakra-ui/react";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useEffect, useState } from "react";
import { colors } from "@src/theme/colors";
import Checkbox from "@src/components/atoms/Checkbox";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";
import Heading from "@src/components/atoms/Heading";
import { FormWrapper } from "../login";
import FormControl from "@src/components/atoms/FormControl";
import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import { usePropertyList } from "@src/constant/usePropertyList";
import { useNationalityList } from "@src/constant/useNationalityList";
import styled from "styled-components";

import { Link as RouterLink } from "react-router-dom";
import ReactSelect from "@src/components/atoms/Select";

export const AccountDetailStyle = styled.div`
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
  .signup {
    color: ${colors.primary};
    margin-left: 10px;
    cursor: pointer;
  }
`;
interface ISignupProps {
  mutate: any;
  isLoading: boolean;
}
const SignupTemplate: React.FC<ISignupProps> = ({ mutate, isLoading }) => {
  const [checked, setChecked] = useState({
    terms: false,
    offers: false,
  });
  const validationSchema = yup.object().shape({
    fullName: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    phoneNumber: createPhoneNumberSchema(),
    nationalityId: yup
      .mixed()
      .test(
        "is-nationality-valid",
        "Please select nationality",
        function (value) {
          if (typeof value === "object") {
            return true;
          }
          return false;
        }
      )
      .required("Please select nationality"),
    dateOfBirth: yup.string().required("DOB is required"),
  });
  const { handleSubmit, register, errors, control } = useFormHook({
    validationSchema,
  });
  const onSubmit = (data: any) => {
    const { propertyId, nationalityId, ...rest } = data;
    mutate({
      ...rest,
      roleId: 2,
      nationalityId: data.nationalityId?.value,
      propertyId: data.propertyId?.value,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setChecked((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const nationalityList = useNationalityList();
  const propertyList = usePropertyList();
  let isSubmitDisabled = !checked.terms;
  useEffect(() => {
    isSubmitDisabled = true;
  }, [isLoading]);
  return (
    <>
      <Heading title="Sign Up" text="Enter your details to sign up" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <FormControl
            control="input"
            name="fullName"
            required
            placeholder="Enter your full name"
            label="Full Name"
            register={register}
            error={errors.fullName?.message || ""}
          />
          <FormControl
            control="input"
            type="email"
            name="email"
            required
            placeholder="Enter your mail"
            label="Email"
            register={register}
            error={errors.email?.message || ""}
          />
          <FormControl
            control="input"
            name="dateOfBirth"
            defaultValue={"2023-09-07"}
            type="date"
            required
            label="Date of birth"
            color="black"
            padding="10px"
            height="40px"
            lineHeight="2"
            register={register}
            error={errors.dateOfBirth?.message || ""}
          />
          <FormControl
            control="input"
            type="number"
            name="phoneNumber"
            required
            placeholder="Enter your mobile number"
            label="Mobile Number"
            register={register}
            error={errors.phoneNumber?.message || ""}
          />

          <ReactSelect
            control={control}
            name="propertyId"
            placeholder="Choose Property Name"
            label="Property Name"
            error={errors.propertyId?.message || ""}
            labelKey={"name"}
            valueKey={"id"}
            required
            options={propertyList || []}
          />
          <ReactSelect
            control={control}
            name="nationalityId"
            placeholder="Choose your nationality"
            label="Nationality"
            required
            error={errors.nationalityId?.message || ""}
            options={nationalityList || []}
            labelKey={"countryName"}
            valueKey={"id"}
          />
          <FormControl
            control="input"
            name="referalCode"
            placeholder="Enter Referal Code (optional)"
            label="Referal Code"
            register={register}
            error={errors.referalCode?.message || ""}
          />
          <VStack alignItems="flex-start" mt={4} mb={12} fontWeight="600">
            <Checkbox
              name="terms"
              onChange={handleChange}
              control={control}
              colorScheme="red"
            >
              I agree the
              <Link
                as={RouterLink}
                to={NAVIGATION_ROUTES.CONFIGURATION}
                style={{
                  textDecoration: "underline",
                  color: colors.primary,
                  marginLeft: "7px",
                }}
              >
                Terms & Conditions
              </Link>
            </Checkbox>
            <Checkbox
              name="offers"
              onChange={handleChange}
              control={control}
              colorScheme="red"
            >
              I would like to receive emails about special offers.
            </Checkbox>
          </VStack>

          <Button
            type="submit"
            className="button"
            w="100%"
            borderRadius="none"
            isDisabled={isSubmitDisabled}
            isLoading={isLoading}
          >
            Sign Up
          </Button>
          <AccountDetailStyle>
            <span>{`Already have an account?`}</span>
            <Link as={RouterLink} to={NAVIGATION_ROUTES.LOGIN}>
              <span className="signup">SignIn</span>
            </Link>
          </AccountDetailStyle>
        </FormWrapper>
      </form>
    </>
  );
};
export { SignupTemplate };
