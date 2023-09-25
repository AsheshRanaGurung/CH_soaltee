import { Box, Card, Center, Divider, Flex } from "@chakra-ui/react";
import { ChartIcon } from "@src/components/atoms/ChartIcon";
import { FaUser } from "react-icons/fa";

export const GraphUser = ({ data }: any) => {
  return (
    <Box marginBottom={"20px"}>
      <Card
        boxShadow="4px 4px 24px rgba(0, 0, 0, 0.05)"
        marginBottom={"20px"}
        borderRadius={"14px"}
        py={"10px"}
        // padding={"10px"}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <ChartIcon
            bg={"#EBFFF1"}
            icon={<FaUser color="#48BB78" />}
            title={"Active Users"}
            value={data?.totalActiveUsers || 0}
          />
          <Center height="70px" marginTop={"10px"}>
            <Divider orientation="vertical" />
          </Center>{" "}
          <ChartIcon
            bg={"rgba(247, 205, 31, 0.15);"}
            icon={<FaUser color="#F7CD1F" />}
            title={"Inactive Users"}
            value={data?.totalInActiveUsers || 0}
          />
          <Center height="70px" marginTop={"10px"}>
            <Divider orientation="vertical" />
          </Center>{" "}
          <ChartIcon
            bg={"#FEDFDF"}
            icon={<FaUser color="#C70808" />}
            title={"Blocked Uers"}
            value={data?.totalBlockUsers || 0}
          />
        </Flex>
      </Card>
    </Box>
  );
};
