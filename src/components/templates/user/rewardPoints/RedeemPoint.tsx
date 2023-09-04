import { Box, Card, Heading, Image, Text } from "@chakra-ui/react";

interface IProps {
  title: string;
  desc: string;
  img: any;
}
export const RedeemPoint: React.FC<IProps> = ({ title, desc, img }) => {
  return (
    <Card bg={"#FFF3F3"} alignItems="center" p={"20px"} textAlign={"center"}>
      <Box
        w="100px"
        h="100px"
        bg="#FFDEDE"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={img} />
      </Box>
      <Box>
        <Heading color={"#3C3B3B"} fontSize={"24px"} marginTop={"10px"}>
          {title}
        </Heading>
        <Text color={"#696969"} marginTop={"15px"} fontSize={"16px"}>
          {desc}
        </Text>
      </Box>
    </Card>
  );
};
