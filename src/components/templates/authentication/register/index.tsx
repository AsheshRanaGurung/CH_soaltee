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
import { nationality } from "@src/constant/index";
import { createPhoneNumberSchema } from "@src/utility/phoneValidation";

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
    nationality: yup.string().required("Nationality is required"),
  });
  const { handleSubmit, register, errors, control } = useFormHook({
    validationSchema,
  });
  const onSubmit = (data: any) => {
    mutate({ ...data, referalCode: "abc" });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setChecked((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

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
            type="number"
            name="phoneNumber"
            required
            placeholder="Enter your mobile number"
            label="Mobile Number"
            register={register}
            error={errors.phoneNumber?.message || ""}
          />
          <FormControl
            control="select"
            register={register}
            name="nationality"
            placeholder="Choose your nationality"
            label="Nationality"
            required
            error={errors.nationality?.message || ""}
            options={nationality}
          />
          <VStack alignItems="flex-start" mb={12} fontWeight="600">
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
