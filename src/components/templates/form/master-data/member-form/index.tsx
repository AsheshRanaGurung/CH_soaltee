import { Box, Flex, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ImageUpload from "@src/components/atoms/ImageUpload";

export const CreateMemberForm = ({ register, errors, setValue }: any) => {
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
          {/* <FormControl
            control="input"
            type="file"
            name="imageUrl"
            register={register}
            label={"Upload Image"}
            error={errors?.imageUrl?.message || ""}
            required
          /> */}
          <ImageUpload setValue={setValue} />
        </Flex>
        <Spacer />
      </Box>
    </>
  );
};
