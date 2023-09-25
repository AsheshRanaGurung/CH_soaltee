import { Box, Heading } from "@chakra-ui/react";
import { colors } from "@src/theme/colors";
import { font } from "@src/theme/font";

interface IHeadingText {
  heading: string;
  maintitle: string;
  titletext?: string;
}
export const HeadingText = ({
  heading,
  maintitle,
  titletext,
}: IHeadingText) => {
  return (
    <>
      <Box textAlign="center">
        <Heading
          textTransform="uppercase"
          fontSize="medium"
          color={colors.primary}
          fontFamily={font.cormorant}
          fontWeight="bold"
        >
          {heading}
        </Heading>
        <Heading
          color={colors.gray_900}
          fontSize={"44px"}
          fontFamily={font.cormorant}
        >
          {maintitle}
        </Heading>
        <Heading
          fontSize="medium"
          fontFamily={font.josefin}
          mb={7}
          color={colors.light_gray_text}
        >
          {titletext}
        </Heading>
      </Box>
    </>
  );
};
