import { Box, Card, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { ICardData } from "@src/interface/user";
import { colors } from "@src/theme/colors";
import { font } from "@src/theme/font";

export const StepCard = ({ img, title, desc, count }: ICardData) => {
  return (
    <>
      <Card
        borderRadius={12}
        alignItems="flex-start"
        textAlign="left"
        py={25}
        height={220}
        boxShadow="none"
      >
        <Flex width="100%" alignItems="center" justifyContent="space-between">
          <Image src={img} />
          <Heading
            color={colors.light_gray}
            fontSize={"40px"}
            fontFamily={font.cormorant}
          >
            {count}
          </Heading>
        </Flex>
        <Box marginTop={"20px"} paddingBottom={25} textAlign="left">
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
