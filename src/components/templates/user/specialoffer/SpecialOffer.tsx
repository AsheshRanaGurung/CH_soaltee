import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import parse from "html-react-parser";
import { BackgroundTextWithImage } from "@src/components/molecules/bg-text-image";
import { font } from "@src/theme/font";

interface IProps {
  title: string;
  desc: string;
  buttonText?: string;
  img?: any;
}
export const SpecialOffer: React.FC<IProps> = ({
  title,
  desc,
  // buttonText,
  img,
}) => {
  return (
    <>
      <BackgroundTextWithImage offer="30%" img={img} height="440px">
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
      </BackgroundTextWithImage>
    </>
  );
};
