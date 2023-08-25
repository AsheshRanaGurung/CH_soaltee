import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { styled } from "styled-components";
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;
type IChildItem = {
  key: string;
  name: string;
  route: string;
};
type IItem = {
  name: string;
  key: string;
  children?: IChildItem[];
  route?: string;
};

interface IProps {
  items: IItem[];
}

export const MenuGenerator: React.FC<IProps> = ({ items }) => {
  const menuItem = items.map((item, i) => {
    if (item.children && item.children?.length > 0) {
      return (
        <Menu key={item.name}>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            border={"solid 1px #ccc"}
            background={"transparent"}
            _hover={{ bg: "transparent", border: "solid 1px #ccc" }}
            _active={{ bg: "transparent" }}
            fontWeight={"normal"}
            padding={"10px"}
            width={"350px"}
            textAlign={"left"}
          >
            {item.name}
          </MenuButton>
          <MenuList width={"350px"}>
            {item.children.map((child, index) => {
              return (
                <MenuItem
                  key={child.name}
                  _hover={{ bg: "#edf2f7", border: "none", borderRadius: "0" }}
                >
                  {child.name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      );
    } else {
      return <span key={item.name}>{item.name}</span>;
    }
  });
  return <Wrapper>{menuItem}</Wrapper>;
};
