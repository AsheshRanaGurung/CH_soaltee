import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useGetMemberTierid } from "@src/service/master-data/member-tier";
import { colors } from "@src/theme/colors";

interface IMemberTier {
  onClose: () => void;
  isViewOpen: boolean;
  viewId: string;
}
export const MemberPreview = ({ isViewOpen, onClose, viewId }: IMemberTier) => {
  const { data } = useGetMemberTierid(viewId);
  return (
    <>
      <Modal isOpen={isViewOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"16px"}
            fontWeight={"500"}
            borderBottom={"1px solid"}
          >
            Membership Tier
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={"15px"}>
            <Box
              background={`url(${data?.imageUrl}) center center/cover no-repeat`}
              p={"15px"}
              color={colors.white}
              h={"240px"}
            >
              <Heading fontSize={"16px"}>Tier Name</Heading>
              <Text fontSize={"21px"}>{data?.membershipName}</Text>
              <Flex marginTop={"20px"} justifyContent={"space-between"}>
                <Box>
                  <Heading fontSize={"16px"}>Points Required</Heading>
                  <Text fontSize={"21px"}>{data?.pointsFrom}</Text>
                </Box>
              </Flex>
              <Box>
                <Heading fontSize={"16px"}>Membership Name</Heading>
                <Text fontSize={"21px"}>{data?.pointsTo}</Text>
              </Box>
            </Box>{" "}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
