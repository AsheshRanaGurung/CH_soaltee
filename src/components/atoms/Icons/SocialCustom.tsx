import { Box } from "@chakra-ui/react";
import React from "react";

interface IPropIcons {
  icon?: React.ReactNode;
}
export const SocialCustom: React.FC<IPropIcons> = ({ icon }) => {
  return (
    <Box
      w="30px"
      h="30px"
      background={"#A1233D"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {icon}
    </Box>
  );
};
