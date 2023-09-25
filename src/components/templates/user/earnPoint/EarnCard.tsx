import { Box, Card, Heading, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { ICardData } from "@src/interface/user";
import { colors } from "@src/theme/colors";
import { font } from "@src/theme/font";

export const EarnCard = ({ img, title, desc }: ICardData) => {
  return (
    <>
      <Card
        bg={colors.white}
        borderRadius={12}
        boxShadow=" 0px 4px 24px 0px #0000001A"
        alignItems="center"
        textAlign="center"
        py={25}
        height={220}
      >
        <Box
          w="90px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src={img} />
        </Box>
        <Box marginTop={"20px"} paddingBottom={25}>
          <Heading
            color={"#3C3B3B"}
            fontSize={"26px"}
            fontFamily={font.cormorant}
          >
            {title}
          </Heading>
          <Text
            fontSize={"16px"}
            color={"#696969"}
            marginTop={"10px"}
            fontFamily={font.josefin}
          >
            {desc}
          </Text>
        </Box>
      </Card>
    </>
  );
};
