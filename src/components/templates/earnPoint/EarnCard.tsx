import { Box, Card, Heading, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

interface IPropIcons {
  img: any;
  title: string;
  desc: string;
}
export const EarnCard: React.FC<IPropIcons> = ({ img, title, desc }) => {
  return (
    <>
      <Card bg={"none"} boxShadow={"none"}>
        <Box
          w="90px"
          h="100px"
          bg="#FFDEDE"
          borderRadius="40px 80px 50px 40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src={img} />
        </Box>
        <Box marginTop={"20px"} paddingBottom={"10px"}>
          <Heading color={"#3C3B3B"} fontSize={"26px"} paddingBottom={"10px"}>
            {title}
          </Heading>
          <Text fontSize={"16px"} color={"#696969"} marginTop={"10px"}>
            {desc}
          </Text>
        </Box>
      </Card>
    </>
  );
};
