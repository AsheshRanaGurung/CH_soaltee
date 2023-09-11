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
import FormControl from "@src/components/atoms/FormControl";
import { nationality } from "@src/constant/index";
import { colors } from "@src/theme/colors";
import { useForm } from "react-hook-form";
const tier = [
  {
    fullName: "Santosh Rumba",
    rewardPoints: 1720.0,
    tier: "Gold",
  },
  {
    fullName: "Soaltee Loyalty",
    rewardPoints: 2304.0,
    tier: "Silver",
  },
];
const colorCode: { [key: string]: string } = {
  Gold: "#ECC16F",
  Silver: "gray",
  platinum: "platinum",
  Elite: "#A13B3B",
  Member: "#CE8135",
};
export const EarnPoint = () => {
  const { register } = useForm();

  return (
    <Card borderRadius={"14px"}>
      <CardHeader fontSize={"18px"} fontWeight={"800"}>
        <Flex justifyContent={"space-between"} w="100%">
          <Heading width={"100%"}> Top Users</Heading>
          <Box w="150px">
            <FormControl
              control="CustomSelect"
              options={nationality}
              size="sm"
              register={register}
              name="Platinum Tier"
              placeholder={"platinum Tier"}
            />
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        {tier?.map((item: any, index: number) => {
          const isLastItem = index == tier?.length - 1;

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
                      <span style={{ color: colorCode[item?.tier] }}>
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
