import { Box, Card, Heading, Image, Text } from "@chakra-ui/react";
import { ICardData } from "@src/interface/user";
import { colors } from "@src/theme/colors";
import { font } from "@src/theme/font";

export const RedeemPoint = ({ title, desc, img }: ICardData) => {
  return (
    <Card
      alignItems="center"
      p={"20px"}
      textAlign={"center"}
      background="transparent"
      boxShadow="none"
    >
      <Box
        w="100px"
        h="100px"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        position="relative"
        justifyContent="center"
        _after={{
          content: '""',
          position: "absolute",
          background: colors.primary_light_500,
          width: " 50px",
          height: "50px",
          right: 0,
          top: "10px",
          borderRadius: "50%",
        }}
      >
        <Image src={img} zIndex={1} />
      </Box>
      <Box>
        <Heading
          color={"#3C3B3B"}
          fontSize={"24px"}
          marginTop={"10px"}
          fontFamily={font.cormorant}
        >
          {title}
        </Heading>
        <Text
          color={"#696969"}
          marginTop={"15px"}
          fontSize={"16px"}
          fontFamily={font.josefin}
        >
          {desc}
        </Text>
      </Box>
    </Card>
  );
};
