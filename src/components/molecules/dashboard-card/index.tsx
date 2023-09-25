import { Flex, GridItem, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface ICard {
  distributed: number;
  claimed: number;
}
export const DashboardCard: React.FC<ICard> = ({ distributed, claimed }) => {
  return (
    <Flex
      justifyContent={"space-between"}
      paddingBottom={"10px"}
      paddingTop={"20px"}
      padding={"10px"}
    >
      <GridItem>
        <Heading
          fontSize={"14px"}
          color={"#AB1D3F"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          Earning Points: &nbsp; <Text color={"#000000"}>{distributed}</Text>
        </Heading>
      </GridItem>
      <GridItem display={"flex"} justifyContent={"space-between"}>
        <Heading
          fontSize={"14px"}
          color={"#AB1D3F"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          Reedem Points: &nbsp; <Text color={"#000000"}>{claimed}</Text>
        </Heading>
      </GridItem>
    </Flex>
  );
};
