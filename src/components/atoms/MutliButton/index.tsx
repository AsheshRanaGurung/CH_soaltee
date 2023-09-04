import { Button, ButtonGroup } from "@chakra-ui/react";
interface Ibutton {
  LeftName: string;
  rightName: string;
  onClick?: () => void;
}

export const GroupButton = ({ LeftName, rightName, onClick }: Ibutton) => {
  return (
    <ButtonGroup gap="2" w={"full"} marginTop={5}>
      <Button
        border={"1px solid #AB1D3F "}
        bg={"white"}
        color={"#AB1D3F"}
        borderRadius={"0"}
        flex={1}
        py={6}
        onClick={onClick}
      >
        {LeftName}
      </Button>
      <Button
        py={6}
        borderRadius={"0"}
        flex={1}
        onClick={onClick}
        // type="submit"
      >
        {rightName}
      </Button>
    </ButtonGroup>
  );
};
