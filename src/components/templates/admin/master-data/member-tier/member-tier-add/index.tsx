import { Box, Flex, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ImageUpload from "@src/components/atoms/ImageUpload";
import { IMemberTierDetail } from "@src/interface/master-data/property";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface IMemberProps {
  register: UseFormRegister<IMemberTierDetail>;
  setValue: UseFormSetValue<IMemberTierDetail>;
  errors: FieldErrors;
  id?: number | string;
}
export const CreateMemberForm: React.FC<IMemberProps> = ({
  register,
  errors,
  setValue,
  id,
}: any) => {
  return (
    <>
      <Box mx={{ base: "none", md: "auto" }}>
        <Flex direction="column" gap={4.5}>
          <FormControl
            control="input"
            name="membershipName"
            register={register}
            placeholder={"Tier Name"}
            label={"Tier Name"}
            error={errors?.membershipName?.message || ""}
            required
          />
          <FormControl
            control="input"
            type="number"
            name="requiredPoints"
            register={register}
            placeholder={"Points to Tier"}
            label={"Points to Tier"}
            error={errors?.requiredPoints?.message || ""}
            required
          />
          <ImageUpload setValue={setValue} required={!id} />
        </Flex>
        <Spacer />
      </Box>
    </>
  );
};
