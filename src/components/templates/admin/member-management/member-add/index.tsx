import { useState } from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import { useNationalityList } from "@src/constant/useNationalityList";

export const CreateMemberManagementForm = ({
  register,
  errors,
  id,
  propertyList,
  setValue,
}: any) => {
  const [isSwitchOpen, setIsSwitchOpen] = useState(false);
  const toggleSwitch = () => {
    setIsSwitchOpen((initialValue) => !initialValue);
  };
  const nationalityList = useNationalityList();
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
            control="reactSelect"
            register={register}
            name="nationalityId"
            placeholder="Choose your nationality"
            label="Nationality"
            required
            onChange={(e: any) => setValue("nationalityId", e.value)}
            error={errors.nationalityId?.message || ""}
            options={nationalityList || []}
            labelKey={"countryName"}
            valueKey={"id"}
          />
          <FormControl
            control="reactSelect"
            register={register}
            name="propertyId"
            placeholder="Choose Property Name"
            onChange={(e: any) => setValue("propertyId", e.value)}
            label="Property Name"
            labelKey={"name"}
            valueKey={"id"}
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
