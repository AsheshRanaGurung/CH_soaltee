import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import Item from "./Item";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { colors } from "@src/theme/colors";
import { FaMinus, FaPlus } from "react-icons/fa";

interface INavItem {
  visible: boolean;
  name: string;
  to?: string;
  child?: INavItemChild[];
  icon?: React.ReactNode;
  isCollapse?: boolean;
  openIndex?: any;
  setOpenIndex?: any;
  index?: any;
}

interface INavItemChild {
  visible: boolean;
  name: string;
  to: string;
  icon?: React.ReactNode;
}

const Wrapper = styled(Box)`
  text-decoration: none;
  transition: transform 0.5s ease;
`;

const ItemsWrapper = styled(Item)`
  text-decoration: none;
`;

const NavItem = ({
  name,
  to,
  child,
  icon,
  isCollapse,
  visible,
  openIndex,
  setOpenIndex,
  index,
}: INavItem) => {
  const location = useLocation();
  const activeParent = child?.some((item) => item.to === location.pathname);
  const [active, setActive] = useState(false);
  const isDropdownOpen =
    localStorage.getItem(`dropdown_${index}`) === String(activeParent);
  useEffect(() => {
    if (to) {
      setActive(location.pathname.startsWith(to));
    }
  }, [location.pathname, to]);
  const handleToggleDropdown = () => {
    if (openIndex === index) {
      setOpenIndex(-1);
      localStorage.setItem(`dropdown_${index}`, "false");
    } else {
      setOpenIndex(index);
      localStorage.setItem(`dropdown_${index}`, "true");
    }
  };
  useEffect(() => {
    if (isDropdownOpen) {
      setOpenIndex(index);
    }
  }, []);

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
              color={activeParent ? colors.white : colors.text_secondary}
              transition="all ease-in-out"
              cursor="pointer"
              sx={{
                svg: {
                  background: `${activeParent ? colors.white : ""}`,
                  padding: `${activeParent ? "5px" : ""}`,
                  borderRadius: `${activeParent ? "45%" : ""}`,
                  height: `${activeParent ? "30px" : "15px"}`,
                  width: `${activeParent ? "30px" : "15px"}`,
                },
                "svg path": {
                  transition: "all ease-in-out",
                  fill: `${activeParent ? colors.primary : colors.primary}`,
                },
                "&:hover": {
                  transition: "all ease-in-out",
                  textDecoration: "none",
                  bgColor: `${
                    activeParent ? colors.primary : colors.secondary
                  }`,
                  color: `${activeParent ? colors.white : colors.primary}`,
                  "svg path": {
                    transition: "all ease-in-out",
                    // fill: colors.primary,
                  },
                },
              }}
              fontSize="15px"
              fontWeight={activeParent ? 500 : 400}
              onClick={handleToggleDropdown}
            >
              <Flex
                alignItems="center"
                justify={isCollapse ? "center" : "left"}
                sx={{
                  "& *": {
                    "&:hover": {
                      transition: "all ease-in-out",
                      color: `${activeParent ? colors.white : colors.primary}`,
                      textDecoration: "none",
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
                  as={openIndex === index ? FaMinus : FaPlus}
                  fontSize="xs"
                  sx={{
                    transition: "0.1s",
                    height: `${activeParent ? "25px" : "12px"} !important`,
                    bgColor: `${activeParent ? colors.primary : ""} !important`,
                    fill: `${
                      activeParent ? colors.white : colors.text_secondary
                    } !important`,
                    "&:hover": {
                      cursor: "pointer",
                      transition: "0.1s",
                      textDecoration: "none",
                    },
                    path: {
                      fill: `${
                        activeParent ? colors.white : colors.text_secondary
                      } !important`,
                    },
                  }}
                />
              )}
            </Flex>
            {!isCollapse && openIndex === index && (
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
