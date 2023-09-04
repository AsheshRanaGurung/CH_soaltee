import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import { colors } from "@src/theme/colors";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: space-between;
  div {
    flex: 0 0 20%;
  }
`;
export const CreateServiceForm = ({
  register,
  errors,
  setFormDataArray,
  setValue,
  watch,
}: any) => {
  const updatePercentValue = (
    array: any,
    idToUpdate: any,
    newPercentValue: any
  ) => {
    return array.map((item: any) => {
      if (item.id === idToUpdate) {
        return { ...item, rewardPercentage: newPercentValue };
      }
      return item;
    });
  };

  const handleInputChange = (e: any, item: any) => {
    const { value } = e.target;
    const dat = updatePercentValue(
      watch("membershipServiceResponseDtos"),
      item.id,
      value
    );
    setFormDataArray(dat);
    setValue("membershipServiceResponseDtos", dat);
  };
  return (
    <>
      <Box mx={{ base: "none", md: "auto" }}>
        <Flex direction="column" gap={4.5}>
          <FormControl
            control="input"
            name="serviceName"
            register={register}
            placeholder={"Service name"}
            label={"Service Name"}
            error={errors?.serviceName?.message || ""}
            required
          />
          <FormControl
            control="input"
            name="serviceCode"
            register={register}
            placeholder={"Service code"}
            label={"Service Code"}
            error={errors?.requiredPoints?.message || ""}
            required
          />
          <Text fontSize={"lg"}>Reward Point (in %) *</Text>

          <Wrapper>
            {" "}
            {watch("membershipServiceResponseDtos") &&
              watch("membershipServiceResponseDtos").map(
                (itm: any, index: number) => {
                  return (
                    <FormControl
                      key={itm.id}
                      control="input"
                      type="text"
                      name={`rewardPercentage${index}`}
                      register={register}
                      defaultValue={itm.rewardPercentage}
                      placeholder={""}
                      label={itm.membershipName}
                      error={errors?.membershipName?.message || ""}
                      label_color={colors.black_1}
                      onChange={(e: any) => handleInputChange(e, itm)}
                    />
                  );
                }
              )}
          </Wrapper>
        </Flex>
        <Spacer />
      </Box>
    </>
  );
};
