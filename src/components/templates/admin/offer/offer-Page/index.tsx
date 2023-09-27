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
  Image,
} from "@chakra-ui/react";
import { useGetAllOfferId } from "@src/service/offer";
import { colors } from "@src/theme/colors";

interface IMemberTier {
  onClose: () => void;
  isOpen: boolean;
  viewId: string;
}
export const OfferViewPage = ({ onClose, isOpen, viewId }: IMemberTier) => {
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
                  <Heading fontSize={"18px"} fontWeight={"600"} py={"3px"}>
                    Offer Title
                  </Heading>
                  <Text color={colors.voucher_heading} fontSize={"16px"}>
                    {offerData?.offerName}
                  </Text>
                </GridItem>
                <GridItem>
                  <Heading fontSize={"18px"} fontWeight={"600"} py={"3px"}>
                    Offer Sub-Title
                  </Heading>
                  <Text color={colors.voucher_heading} fontSize={"16px"}>
                    {offerData?.subTitle}
                  </Text>
                </GridItem>
              </SimpleGrid>
              <Box marginTop={"20px"} paddingBottom={"20px"}>
                <Heading fontSize={"18px"} fontWeight={"600"} py={"3px"}>
                  Offer Description
                </Heading>
                <Text
                  padding={"16px"}
                  dangerouslySetInnerHTML={{ __html: offerData?.description }}
                />
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
