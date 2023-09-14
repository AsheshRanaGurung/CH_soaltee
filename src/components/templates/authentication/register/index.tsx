import { Button, VStack } from "@chakra-ui/react";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    nationalityId: yup.string().required("Nationality is required"),
    dateOfBirth: yup.string().required("DOB is required"),
  });
  const { handleSubmit, register, errors, control, setValue } = useFormHook({
    validationSchema,
  });
  const onSubmit = (data: any) => {
    mutate({ ...data, roleId: 0 });
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

          <FormControl
            control="reactSelect"
            register={register}
            name="propertyId"
            placeholder="Choose Property (optional)"
            onChange={(e: any) => setValue("propertyId", e.value)}
            label="Property Name"
            labelKey={"name"}
            valueKey={"id"}
            required
            options={propertyList || []}
          />
          <FormControl
            control="reactSelect"
            register={register}
            name="nationalityId"
            placeholder="Choose your nationality"
            label="Nationality"
            onChange={(e: any) => setValue("nationalityId", e.value)}
            required
            error={errors.nationalityId?.message || ""}
            options={nationalityList || []}
            labelKey="countryName"
            valueKey="id"
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
        </FormWrapper>
      </form>
    </>
  );
};
export { SignupTemplate };
