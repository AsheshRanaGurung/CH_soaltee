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

export const EarnPoint = ({ rewardData }: any) => {
  return (
    <Card borderRadius={"14px"}>
      <CardHeader>Top Users</CardHeader>
      <CardBody>
        {rewardData?.map((item: any, index: number) => {
          const isLastItem = index === rewardData.length - 1;

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
                <Image
                  src={imageList.DashProfile}
                  w={"40px"}
                  height={"40px"}
                  borderRadius={"50%"}
                />
                <Heading fontSize={"16px"} marginLeft={"25px"}>
                  {item?.fullName}
                </Heading>
              </Box>
              <Text fontSize={"14px"}>{item?.rewardPoints} pt</Text>
            </Flex>
          );
        })}
      </CardBody>
    </Card>
  );
};
