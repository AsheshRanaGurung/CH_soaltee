import { Box, Flex, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";

export const CreatePropertyForm = ({ register, errors }: any) => {
  return (
    <>
      <Box mx={{ base: "none", md: "auto" }}>
        <Flex direction="column" gap={4.5}>
          <FormControl
            control="input"
            name="name"
            register={register}
            placeholder={"Property Name"}
            label={"Property Name"}
            error={errors?.name?.message || ""}
            required
          />
          <FormControl
            control="input"
            name="code"
            register={register}
            placeholder={"Property Code"}
            label={"Property Code"}
            error={errors.code?.message || ""}
            required
          />
          <FormControl
            control="input"
            type="number"
            name="phoneNumber"
            register={register}
            placeholder={"Phone Number"}
            label={"Phone Number"}
            error={errors.phoneNumber?.message || ""}
            required
          />
          <FormControl
            control="input"
            name="contactPerson"
            register={register}
            placeholder={"Contact Person"}
            label={"Contact Person"}
            error={errors.contactPerson?.message || ""}
            required
          />
          <FormControl
            control="input"
            type="number"
            name="contactPersonPhoneNo"
            register={register}
            placeholder={"Contact Person Phone Number"}
            label={"Contact Person Phone Number"}
            error={errors.contactPersonPhoneNo?.message || ""}
            required
          />
        </Flex>
        <Spacer />
      </Box>
    </>
  );
};
