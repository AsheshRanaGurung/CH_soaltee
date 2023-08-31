import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import FormControl from "@soaltee-loyalty/components/atoms/FormControl";
import { getAllMemberTier } from "@soaltee-loyalty/service/master-data/member-tier";
import { colors } from "@soaltee-loyalty/theme/colors";
import { useEffect } from "react";
import { useQuery } from "react-query";
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
  formDataArray,
  setFormDataArray,
  setValue,
  watch,
}: any) => {
  const { data } = useQuery("member_tier", getAllMemberTier, {
    select: ({ data }) => data.datalist,
  });
  const handleInputChange = (e: any, index: number, id: number) => {
    const { value } = e.target;
    const newFormDataArray = [...formDataArray];

    // Initialize the array with empty objects if it doesn't exist yet
    while (newFormDataArray.length <= index) {
      newFormDataArray.push({ id: "", rewardPercentage: "" });
    }

    newFormDataArray[index] = {
      ...newFormDataArray[index],
      id: id,
      rewardPercentage: value,
    };
    console.log("lulu", newFormDataArray);
    setFormDataArray(newFormDataArray);
  };
  useEffect(() => {
    setValue("membershipServiceResponseDtos", data);
  }, [data]);
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
                      value={itm.rewardPercentage}
                      placeholder={""}
                      label={itm.membershipName}
                      error={errors?.membershipName?.message || ""}
                      label_color={colors.black_1}
                      onChange={(e: any) => handleInputChange(e, index, itm.id)}
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
