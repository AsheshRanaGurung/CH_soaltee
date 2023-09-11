import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import Item from "./Item";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { colors } from "@src/theme/colors";
import { RightArrowIcon } from "@src/assets/svgs";
interface INavItem {
  visible: boolean;
  name: string;
  to?: string;
  child?: INavItemChild[];
  icon?: React.ReactNode;
  isCollapse?: boolean;
}

interface INavItemChild {
  visible: boolean;
  name: string;
  to: string;
  icon?: React.ReactNode;
}
const Wrapper = styled(Box)`
  position: relative;
  &::before {
    content: "";
    border-left: solid 1px #e9e9e9;
    position: absolute;
    height: 100%;
    left: 41px;
    top: -13px;
  }
  li {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      height: 13px;
      left: 0.5px;
      top: 13px;
      width: 14px;
      border: Solid 1px #e9e9e9;
      border-top: none;
      border-right: none;
      border-radius: 0 0 0 9px;
    }
  }
`;
const ItemsWrapper = styled(Item)`
  position: relative;
  &li::before {
    content: "";
    border-left: solid 1px #e9e9e9;
    position: absolute;
    height: 100%;
    left: 41px;
    top: -13px;
  }
`;
const NavItem = ({ name, to, child, icon, isCollapse, visible }: INavItem) => {
  const location = useLocation();

  const activeParent = child?.some((item) => item.to === location.pathname);

  const [active, setActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(activeParent);

  useEffect(() => {
    setActive(to === location.pathname);
  }, [location.pathname]);
  return (
    <>
      {visible ? (
        child ? (
          <>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p={2}
              mx={4}
              mb={3}
              borderRadius={8}
              bgColor={activeParent ? colors.primary : ""}
              color={activeParent ? colors.white : colors.text_black}
              transition="all ease-in-out"
              cursor="pointer"
              sx={{
                "svg path": {
                  transition: "all ease-in-out",
                  fill: `${activeParent ? colors.white : colors.primary}`,
                },
                "&:hover": {
                  transition: "all ease-in-out",
                  bgColor: colors.secondary,
                  color: colors.primary,
                  "svg path": {
                    transition: "all ease-in-out",
                    fill: colors.primary,
                  },
                },
              }}
              fontSize="15px"
              fontWeight="600"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Flex
                alignItems="center"
                justify={isCollapse ? "center" : "left"}
                sx={{
                  "& *": {
                    "&:hover": {
                      transition: "all ease-in-out",
                      color: colors.primary,
                    },
                  },
                }}
              >
                {icon}
                {!isCollapse && (
                  <Text ml={3} whiteSpace="nowrap">
                    {name}
                  </Text>
                )}
              </Flex>
              {!isCollapse && (
                <Icon
                  as={RightArrowIcon}
                  fontSize="xs"
                  sx={{
                    transform: showDropdown ? "rotate(90deg)" : "",
                    transition: "0.1s",
                    "&:hover": {
                      cursor: "pointer",
                      transition: "0.1s",
                    },
                  }}
                />
              )}
            </Flex>
            {showDropdown && !isCollapse && (
              <Wrapper>
                {child.map((c: INavItemChild) => {
                  return (
                    <React.Fragment key={c.name}>
                      {c.visible ? (
                        <ItemsWrapper
                          active={active}
                          name={c.name}
                          to={c.to}
                          icon={c?.icon}
                          isCollapse={isCollapse}
                          isChild={true}
                        />
                      ) : (
                        <></>
                      )}
                    </React.Fragment>
                  );
                })}
              </Wrapper>
            )}
          </>
        ) : (
          <Item
            active={active}
            name={name}
            to={to}
            icon={icon}
            isCollapse={isCollapse}
          />
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default NavItem;
