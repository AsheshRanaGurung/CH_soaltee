import {
  Box,
  GridItem,
  Heading,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  ListItem,
  UnorderedList,
  Image,
} from "@chakra-ui/react";
import { useGetVoucherID } from "@src/service/voucher";
import { colors } from "@src/theme/colors";

interface IMemberTier {
  onClose: () => void;
  isOpen: boolean;
  viewId: string;
}
export const VoucherViewPage = ({ onClose, isOpen, viewId }: IMemberTier) => {
  const { data: voucherData } = useGetVoucherID(viewId);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom={`1px solid ${colors.model_bottom}`}>
            Voucher & Promocode
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={voucherData?.imageUrl}
              w={"100%"}
              height={"240px"}
              objectFit={"cover"}
            />
            <Box marginTop={"20px"}>
              <SimpleGrid
                columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
                columnGap={6}
                rowGap={4}
              >
                <GridItem>
                  <Heading
                    color={colors.voucher_heading}
                    fontSize={"14px"}
                    fontWeight={"400"}
                  >
                    Voucher Name
                  </Heading>
                  <Text fontSize={"16px"}>{voucherData?.voucherName}</Text>
                </GridItem>
                <GridItem>
                  <Heading
                    color={colors.voucher_heading}
                    fontSize={"14px"}
                    fontWeight={"400"}
                  >
                    Service
                  </Heading>
                  <Text fontSize={"16px"}>{voucherData?.serviceName}</Text>
                </GridItem>

                <GridItem>
                  <Heading
                    color={colors.voucher_heading}
                    fontSize={"14px"}
                    fontWeight={"400"}
                  >
                    Discount Percentage
                  </Heading>
                  <Text fontSize={"16px"}>
                    {voucherData?.discountPercentage}
                  </Text>
                </GridItem>
                <GridItem>
                  <Heading
                    color={colors.voucher_heading}
                    fontSize={"14px"}
                    fontWeight={"400"}
                  >
                    Maximum Amounts
                  </Heading>
                  <Text fontSize={"16px"}> {voucherData?.maximumAmounts}</Text>
                </GridItem>
                <GridItem>
                  <Heading
                    color={colors.voucher_heading}
                    fontSize={"14px"}
                    fontWeight={"400"}
                  >
                    Maximum Limit
                  </Heading>
                  <Text fontSize={"16px"}>{voucherData?.maximumLimits}</Text>
                </GridItem>
              </SimpleGrid>
              <Box marginTop={"20px"} paddingBottom={"20px"}>
                <Heading
                  color={colors.voucher_heading}
                  fontSize={"14px"}
                  fontWeight={"400"}
                >
                  Voucher Details
                </Heading>
                <UnorderedList marginTop={"15px"}>
                  <ListItem>
                    {voucherData?.voucherDescription.replace(
                      /(<([^>]+)>)/gi,
                      ""
                    )}
                  </ListItem>
                </UnorderedList>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
