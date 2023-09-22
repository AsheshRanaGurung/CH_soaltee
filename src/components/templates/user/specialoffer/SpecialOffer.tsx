import { Button, Heading, Text, Box } from "@chakra-ui/react";
import React from "react";
import parse from "html-react-parser";
import { BackgroundTextWithImage } from "@src/components/molecules/bg-text-image";
import { font } from "@src/theme/font";

interface IProps {
  title: string;
  desc: string;
  buttonText?: string;
  img?: any;
  viewDetail: () => void;
}
export const SpecialOffer: React.FC<IProps> = ({
  title,
  desc,
  buttonText,
  img,
  viewDetail,
}) => {
  return (
    <>
      <BackgroundTextWithImage offer="30%" img={img} height="440px">
        <Box
          color={"#FFFFFF"}
          w={"90%"}
          p={["40px 20px"]}
          position="absolute"
          bottom={0}
        >
          <Heading
            fontSize="x-large"
            marginBottom={3}
            fontFamily={font.cormorant}
            textTransform="capitalize"
          >
            {title}
          </Heading>
          <Text marginBottom={"15px"} as="div" fontFamily={font.josefin}>
            {parse(desc)}
          </Text>
          <Button type="submit" variant="ghost" onClick={viewDetail}>
            {buttonText}
          </Button>
        </Box>
      </BackgroundTextWithImage>
    </>
  );
};
