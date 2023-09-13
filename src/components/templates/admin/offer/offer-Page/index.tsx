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
import { useGetAllOfferId } from "@src/service/offer";
import { colors } from "@src/theme/colors";

interface IMemberTier {
  onClose: () => void;
  isOpen: boolean;
  viewId: string;
}
export const OfferPage = ({ onClose, isOpen, viewId }: IMemberTier) => {
  const { data: offerData } = useGetAllOfferId(viewId);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom={`1px solid ${colors.model_bottom}`}>
            Offer{" "}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={offerData?.offerImage} w={"100%"} height={"240px"} />
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
                    Offer Title
                  </Heading>
                  <Text fontSize={"16px"}>{offerData?.offerName}</Text>
                </GridItem>
                <GridItem>
                  <Heading
                    color={colors.voucher_heading}
                    fontSize={"14px"}
                    fontWeight={"400"}
                  >
                    Offer Sub-Title
                  </Heading>
                  <Text fontSize={"16px"}>{offerData?.serviceName}</Text>
                </GridItem>
              </SimpleGrid>
              <Box marginTop={"20px"} paddingBottom={"20px"}>
                <Heading
                  color={colors.voucher_heading}
                  fontSize={"14px"}
                  fontWeight={"400"}
                >
                  Offer Description
                </Heading>
                <UnorderedList marginTop={"15px"}>
                  <ListItem>
                    {offerData?.description.replace(/(<([^>]+)>)/gi, "")}
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
