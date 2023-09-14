import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { imageList } from "@src/assets/images";
import { SelectCustom } from "@src/components/atoms/Select/SelectCustom";
import { usePropertyList } from "@src/constant/usePropertyList";
import { useGetTopTier } from "@src/service/dashboard";
import { getAllMemberTier } from "@src/service/master-data/member-tier";
import { colors } from "@src/theme/colors";
import { useState } from "react";
import { FieldErrorsImpl, useForm } from "react-hook-form";
import { useQuery } from "react-query";
export const EarnPoint = () => {
  const {
    control,
    formState: { errors },
  } = useForm();
  const [prov, setProv] = useState("-1");
  const [tiers, setTiers] = useState("-1");

  const propertyList = usePropertyList();
  const { data: tierData } = useQuery("member_tier", getAllMemberTier, {
    select: ({ data }) => data.datalist,
  });
  const tierOprtion = tierData?.map((item: any) => ({
    label: item?.membershipName,
    value: item?.id,
  }));

  const {
    data: userData,
    isLoading,
    isError,
  } = useGetTopTier({
    proverty: prov,
    tier: tiers,
  });
  console.log("prov", prov);
  return (
    <Card borderRadius={"14px"}>
      <CardHeader fontSize={"18px"} fontWeight={"800"}>
        <Flex justifyContent={"space-between"} w="100%">
          <Heading width={"100%"} fontSize={"17px"}>
            Top Members
          </Heading>
          <Flex direction={"row"} gap={2}>
            <SelectCustom
              name="property"
              errors={errors as Partial<FieldErrorsImpl<any>>}
              placeholder="All"
              control={control}
              isLoading={isLoading}
              isError={isError}
              selectOptions={propertyList || []}
              onAdditionalOnChange={(e) => setProv(e.target.value || "-1")}
            />
            <SelectCustom
              name="tier"
              errors={errors as Partial<FieldErrorsImpl<any>>}
              placeholder="tier"
              control={control}
              isLoading={isLoading}
              isError={isError}
              selectOptions={tierOprtion || []}
              onAdditionalOnChange={(e) => setTiers(e.target.value || "-1")}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        {userData?.map((item: any, index: number) => {
          const isLastItem = index == userData?.length - 1;

          return (
            <Flex
              justifyContent={"space-between"}
              key={index}
              borderBottom={isLastItem ? "none" : "1px solid #EDF2F7"}
              alignItems={"center"}
              paddingBottom={"30px"}
              marginTop={index === 0 ? "15px" : "0"}
              marginBottom={index === 0 ? "0" : "15px"}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box>
                  <Image
                    src={imageList.DashProfile}
                    w={"40px"}
                    height={"40px"}
                    borderRadius={"50%"}
                  />
                </Box>
                <Box>
                  <Heading fontSize={"16px"} marginLeft={"25px"}>
                    {item?.fullName}
                    <Text
                      fontSize={"13px"}
                      color={colors.black_1}
                      fontWeight={"400"}
                      marginTop={"10px"}
                    >
                      Tier -&nbsp;
                      <span style={{ color: item?.colorCode }}>
                        {item.tier}
                      </span>
                    </Text>
                  </Heading>
                </Box>
              </Box>
              <Text fontSize={"14px"}>{item?.rewardPoints} pt</Text>
            </Flex>
          );
        })}
      </CardBody>
    </Card>
  );
};
