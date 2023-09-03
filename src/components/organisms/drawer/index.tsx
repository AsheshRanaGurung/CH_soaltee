import {
  Drawer,
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IDrawer } from "@src/interface/product/product";
export const DrawerComponent = ({ title, children }: IDrawer) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Filter</Button>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
