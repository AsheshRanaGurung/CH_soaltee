import { useState } from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import FormControl from "@soaltee-loyalty/components/atoms/FormControl";
import { nationality } from "@soaltee-loyalty/constant/index";

export const CreateMemberManagementForm = ({ register, errors }: any) => {
  const [isSwitchOpen, setIsSwitchOpen] = useState(false);
  const toggleSwitch = () => {
    setIsSwitchOpen((initialValue) => !initialValue);
  };
  return (
    <>
      <Box mx={{ base: "none", md: "auto" }}>
        <Flex direction="column" gap={4.5}>
          <FormControl
            control="input"
            name="fullName"
            register={register}
            placeholder={"Full Name"}
            label={"Full Name"}
            error={errors?.fullName?.message || ""}
            required
          />
          <FormControl
            control="input"
            name="email"
            register={register}
            placeholder={"Email"}
            label={"Email"}
            error={errors?.email?.message || ""}
            required
          />
          <FormControl
            control="input"
            type="number"
            name="phoneNumber"
            register={register}
            placeholder={"Mobile Number"}
            label={"Mobile Number"}
            error={errors?.phoneNumber?.message || ""}
            required
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
          <FormControl
            control="select"
            register={register}
            name="propertyName"
            placeholder="Choose Property Name"
            label="Property Name"
            // isRequired
            // error={errors.propertyName?.message || ""}
            options={nationality}
          />
          <FormControl
            control="switch"
            name="isActive"
            variant="red"
            value={isSwitchOpen}
            toggleSwitch={toggleSwitch}
            register={register}
            label={"Is Blocked ?"}
          />
        </Flex>
        <Spacer />
      </Box>
    </>
  );
};
