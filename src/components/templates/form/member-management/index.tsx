import { useState } from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import { nationality } from "@src/constant/index";

export const CreateMemberManagementForm = ({
  register,
  errors,
  id,
  propertyList,
}: any) => {
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
            isDisabled={id ? true : false}
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
            required
            error={errors.nationality?.message || ""}
            options={nationality}
          />
          <FormControl
            control="select"
            register={register}
            name="propertyId"
            placeholder="Choose Property Name"
            label="Property Name"
            required
            options={propertyList || []}
          />
          {id && (
            <FormControl
              control="switch"
              name="isBlocked"
              variant="red"
              value={isSwitchOpen}
              toggleSwitch={toggleSwitch}
              register={register}
              label={"Is Blocked ?"}
            />
          )}
        </Flex>
        <Spacer />
      </Box>
    </>
  );
};
