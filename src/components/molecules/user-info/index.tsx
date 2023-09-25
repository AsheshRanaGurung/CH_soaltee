import { Box, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { GlobalIcon, MailIcon, PhoneIcon } from "@src/assets/svgs";
import { colors } from "@src/theme/colors";
import { font } from "@src/theme/font";

interface IMemberData {
  fullName: string;
  customerId: number;
  email: string;
  phoneNumber: string;
  nationality: string;
}
interface Member {
  data: IMemberData;
}
export const UserInfo = ({ data }: Member) => {
  return (
    <>
      <Box>
        <Text
          fontSize={"4xl"}
          textTransform={"capitalize"}
          fontFamily={font.cormorant}
          fontWeight="bold"
        >
          {data?.fullName}
        </Text>
        <Text
          fontSize={"md"}
          marginBottom={"10px"}
          textTransform={"capitalize"}
          fontFamily={font.josefin}
          fontWeight="400"
          color={colors.black_1}
        >
          MemberId : {data?.customerId}
        </Text>

        <Box
          bg={"none"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={"10px"}
        >
          <List spacing={4} mb={20}>
            <ListItem color={colors.black_1} display="flex" alignItems="center">
              <ListIcon as={MailIcon} fontSize="3xl" />
              Email : &nbsp;
              <Text fontSize={"16px"}>{data?.email}</Text>
            </ListItem>
            <ListItem color={colors.black_1} display="flex" alignItems="center">
              <ListIcon as={PhoneIcon} fontSize="3xl" />
              Phone Number : &nbsp;
              <Text fontSize={"16px"}>{data?.phoneNumber}</Text>
            </ListItem>
            <ListItem color={colors.black_1} display="flex" alignItems="center">
              <ListIcon as={GlobalIcon} fontSize="3xl" />
              Nationality : &nbsp;
              <Text fontSize={"16px"}> {data?.nationality}</Text>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};
