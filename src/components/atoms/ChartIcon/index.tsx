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
    <Flex p={"20px"}>
      <Box
        width="52px"
        height="52px"
        borderRadius={"50%"}
        bg={bg ? bg : "transparent"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {icon}
      </Box>
      <Box marginLeft={"15px"}>
        <Text>{title}</Text>
        <Heading fontSize={"24px"}>{value}</Heading>
      </Box>
    </Flex>
  );
};
