import { Box } from "@chakra-ui/react";

export const BackgroundTextWithImage = ({
  img,
  height,
  children,
  styles,
}: any) => {
  return (
    <>
      <Box
        position={"relative"}
        background={`url(${img}) center center/cover no-repeat`}
        borderRadius="8px"
        height={height}
        sx={styles}
        _before={{
          content: `""`,
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          width: "100%",
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.91) 22.02%, rgba(0, 0, 0, 0) 100%)",
        }}
      >
        {/* {offer && (
          <Box
            h={"40px"}
            padding={"5px"}
            bg={"#811C31"}
            color={"white"}
            position={"absolute"}
            right={"0"}
            top="5%"
            display="flex"
            alignItems="center"
            borderRadius="3px"
            _before={{
              content: `""`,
              borderTop: "20px solid transparent",
              borderBottom: "20px solid transparent",
              borderRight: "20px solid #811C31",
              position: "absolute",
              top: 0,
              left: "-19px",
            }}
          >
            <Flex justifyContent={"center"}>
              <Heading
                fontSize={"16px"}
                marginRight={"10px"}
                marginLeft={"5px"}
                fontWeight="600"
                fontFamily={font.josefin}
              >
                {offer} Off
              </Heading>
            </Flex>
          </Box>
        )} */}
        {children}
      </Box>
    </>
  );
};
