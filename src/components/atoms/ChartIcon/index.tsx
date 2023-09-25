import { Box, Text, Heading, Flex } from "@chakra-ui/layout";
import { ReactElement } from "react";
interface IChartIcon {
  bg: string;
  icon: ReactElement;
  title: string;
  value: string;
}

export const ChartIcon: React.FC<IChartIcon> = ({ icon, bg, title, value }) => {
  return (
    <Flex p={"10px"}>
      <Box
        width="38px"
        height="38px"
        borderRadius={"50%"}
        bg={bg ? bg : "transparent"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {icon}
      </Box>
      <Box marginLeft={"14px"}>
        <Text fontSize={"14px"}>{title}</Text>
        <Heading fontSize={"18px"}>{value}</Heading>
      </Box>
    </Flex>
  );
};
