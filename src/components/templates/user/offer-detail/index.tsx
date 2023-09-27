import { Container, Heading, Stack, Text, Box } from "@chakra-ui/react";
import { BackgroundTextWithImage } from "@src/components/molecules/bg-text-image";
import { colors } from "@src/theme/colors";
import { font } from "@src/theme/font";

interface IOffer {
  title: string;
  heading: string;
  subtitle: string;
  image: string;
  description: string;
}
export const OfferTemplate = ({
  title,
  heading,
  subtitle,
  image,
  description,
}: IOffer) => {
  return (
    <>
      <BackgroundTextWithImage
        img={image}
        height="500px"
        styles={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <Box
          color={"#FFFFFF"}
          p={["40px 20px"]}
          position="absolute"
          textAlign="center"
        >
          <Stack>
            <Text
              marginBottom={"15px"}
              as="div"
              fontFamily={font.cormorant}
              fontSize="md"
            >
              {heading}
            </Text>
            <Heading
              fontSize={60}
              marginBottom={3}
              fontFamily={font.cormorant}
              textTransform="capitalize"
              fontWeight="bold"
              position="relative"
              _after={{
                content: `""`,
                position: "absolute",
                height: "2px",
                width: "40%",
                background: `${colors.white}`,
                bottom: "-7px",
                left: 0,
                right: 0,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {subtitle}
            </Heading>
          </Stack>
        </Box>
      </BackgroundTextWithImage>
      <Container maxW={"1400px"} marginBottom={50}>
        <Stack>
          <Heading fontFamily={font.cormorant} fontSize={44}>
            {title}
          </Heading>

          <Text
            fontFamily={font.josefin}
            padding={"16px"}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </Stack>
      </Container>
    </>
  );
};
