import {
  Drawer,
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
interface IDrawer {
  title?: string;
  children?: string;
  leftIcon?: any;
  btnText?: any;
  onDrawerModalClose?: any;
  onDrawerModalOpen?: any;
  isDrawerOpen?: any;
}
export const DrawerComponent: React.FC<IDrawer> = ({
  title,
  children,
  leftIcon,
  btnText,
  onDrawerModalOpen,
  onDrawerModalClose,
  isDrawerOpen,
}) => {
  return (
    <>
      <Button onClick={onDrawerModalOpen} leftIcon={leftIcon}>
        {btnText}
      </Button>
      <Drawer isOpen={isDrawerOpen} onClose={onDrawerModalClose}>
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
