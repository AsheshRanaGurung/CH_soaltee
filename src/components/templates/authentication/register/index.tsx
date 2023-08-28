import { Button, VStack } from "@chakra-ui/react";
import { NAVIGATION_ROUTES } from "@soaltee-loyalty/routes/routes.constant";
import { useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "@soaltee-loyalty/theme/colors";
import Checkbox from "@soaltee-loyalty/components/atoms/Checkbox";
import { useFormHook } from "@soaltee-loyalty/hooks/useFormhook";
import * as yup from "yup";
import Heading from "@soaltee-loyalty/components/atoms/Heading";
import { FormWrapper } from "../login";
import FormControl from "@soaltee-loyalty/components/atoms/FormControl";
import { nationality } from "@soaltee-loyalty/constant/index";

interface ISignupProps {
  mutate: any;
  isLoading: boolean;
}
const SignupTemplate: React.FC<ISignupProps> = ({ mutate }) => {
  const [checked, setChecked] = useState({
    terms: false,
    offers: false,
  });
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    mobile_number: yup.string().required("Mobile number is required"),
    nationality: yup.string().required("Nationality is required"),
  });
  const { handleSubmit, register, errors, control } = useFormHook({
    validationSchema,
  });
  const onSubmit = (data: any) => {
    mutate(data);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setChecked((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const isSubmitDisabled = !checked.terms || !checked.offers;
  return (
    <>
      <Heading title="Sign Up" text="Enter your details to sign up" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <FormControl
            control="input"
            name="name"
            required
            placeholder="Enter your full name"
            label="Full Name"
            register={register}
            error={errors.name?.message || ""}
          />
          <FormControl
            control="email"
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
            name="mobile_number"
            required
            placeholder="Enter your mobile number"
            label="Mobile Number"
            register={register}
            error={errors.mobile_number?.message || ""}
          />
          <FormControl
            control="select"
            register={register}
            name="nationality"
            placeholder="Choose your nationality"
            label="Nationality"
            isRequired
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
            disabled={isSubmitDisabled}
          >
            Sign Up
          </Button>
        </FormWrapper>
      </form>
    </>
  );
};
export { SignupTemplate };
