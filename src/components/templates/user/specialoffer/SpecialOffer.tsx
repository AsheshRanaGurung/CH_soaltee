import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import parse from "html-react-parser";

interface IProps {
  title: string;
  desc: string;
  ButtonText?: string;
  img?: any;
}
export const SpecialOffer: React.FC<IProps> = ({
  title,
  desc,
  // ButtonText,
  img,
}) => {
  return (
    <>
      <Box
        position={"relative"}
        background={`url(${img}) center center/cover no-repeat`}
        borderRadius="8px"
        height={"300px"}
        _before={{
          content: `""`,
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          background: "linear-gradient(45deg, #000000 0%, #ffffff 100%)",
        }}
      >
        <Box
          w={"180px"}
          h={"40px"}
          padding={"5px"}
          bg={"#811C31"}
          color={"white"}
          position={"absolute"}
          right={"0"}
          top={"10%"}
          _before={{
            content: `""`,
            borderTop: "20px solid transparent",
            borderBottom: "20px solid transparent",
            borderRight: "20px solid #811C31",
            position: "absolute",
            top: 0,
            left: "-20px",
          }}
        >
          <Flex justifyContent={"center"}>
            <Heading fontSize={"16px"} marginRight={"10px"} marginLeft={"5px"}>
              30%
            </Heading>
            <Text
              style={{
                fontSize: "12px",
                lineHeight: "1",
              }}
              display={"inline-block"}
            >
              Discount on boating and rafting.
            </Text>
          </Flex>
        </Box>
        <Box color={"#FFFFFF"} w={"50%"} p={["40px 20px"]}>
          <Heading fontSize={"18px"} marginBottom={"20px"}>
            {title}
          </Heading>
          <Text marginBottom={"15px"}> {parse(desc)}</Text>
          {/* <Button fontSize={"14px"}>{ButtonText}</Button> */}
        </Box>
      </Box>
    </>
  );
};
