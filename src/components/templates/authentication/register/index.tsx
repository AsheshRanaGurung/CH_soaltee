import { Button, VStack, Link } from "@chakra-ui/react";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useEffect, useState } from "react";
import { colors } from "@src/theme/colors";
import Checkbox from "@src/components/atoms/Checkbox";
import { useFormHook } from "@src/hooks/useFormhook";
import Heading from "@src/components/atoms/Heading";
import { FormWrapper } from "../login";
import FormControl from "@src/components/atoms/FormControl";
import { usePropertyList } from "@src/constant/usePropertyList";
import { useNationalityList } from "@src/constant/useNationalityList";
import styled from "styled-components";

import { Link as RouterLink } from "react-router-dom";
import ReactSelect from "@src/components/atoms/Select";
import { signupValidationSchema } from "@src/schema/auth/signup";
import { formatDateToYYYYMMDD } from "@src/utility/formatDateToYYYYMMDD";

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

  const { handleSubmit, register, errors, control, setValue } = useFormHook({
    validationSchema: signupValidationSchema,
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
  const changeDateOfBirth = (date: any) => {
    setValue("dateOfBirth", formatDateToYYYYMMDD(date));
  };
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
            control="date"
            register={register}
            required
            name="dateOfBirth"
            label="Date of birth"
            endIcons="true"
            changeDate={changeDateOfBirth}
            color="black"
            padding="10px"
            height="40px"
            lineHeight="2"
            bg_color={colors.secondary}
            error={errors.dateOfBirth?.message || ""}
            maxDate={new Date()}
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
