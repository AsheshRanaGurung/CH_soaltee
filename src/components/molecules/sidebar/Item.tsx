import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ListItem, Link, Flex, Text } from "@chakra-ui/react";
import { colors } from "@src/theme/colors";

const Item = ({
  name,
  to,
  icon,
  active,
  isCollapse,
  isChild,
}: {
  name: string;
  to?: string;
  icon?: React.ReactNode;
  active: boolean;
  isCollapse?: boolean;
  isChild?: boolean;
}) => {
  const { t } = useTranslation();
  if (location.pathname === to) active = true;
  return (
    <Link
      as={RouterLink}
      to={to || "#"}
      color={colors.white}
      _hover={{ textDecoration: "none" }}
    >
      <ListItem
        display={"flex"}
        mr={4}
        ml={isChild ? 10 : 4}
        p={2}
        mb={3}
        borderRadius={9}
        bgColor={active ? (isChild ? colors.secondary : colors.primary) : ""}
        transition="all ease-in-out"
        height={"50px"}
        fontWeight={active ? (isChild ? "500" : "500") : "400"}
        color={
          active
            ? isChild
              ? colors.text_secondary
              : colors.white
            : colors.text_secondary
        }
        sx={{
          svg: {
            background: `${
              active ? (isChild ? colors.white : colors.white) : ""
            }`,
            padding: `${active ? (isChild ? "5px" : "5px") : ""}`,
            borderRadius: `${active ? (isChild ? "45%" : "45%") : ""}`,
            height: `${active ? (isChild ? "30px" : "30px") : "15px"}`,
            width: `${active ? (isChild ? "30px" : "30px") : "15"}`,
          },
          "svg path": {
            transition: "all ease-in-out",
            fill: `${
              active
                ? isChild
                  ? colors.primary
                  : colors.primary
                : colors.primary
            }`,
          },
          "&:hover": {
            transition: "all ease-in-out",
            color: active
              ? isChild
                ? colors.text_secondary
                : colors.white
              : "",
            bgColor: active
              ? isChild
                ? colors.secondary
                : colors.primary
              : colors.secondary,
            "svg path": {
              transition: "all ease-in-out",
              fill: `${
                active
                  ? isChild
                    ? colors.primary
                    : colors.primary
                  : colors.primary
              }`,
            },
          },
        }}
        fontSize="15px"
      >
        <Flex alignItems="center" justify={isCollapse ? "center" : "left"}>
          {icon}
          {!isCollapse && (
            <Text ml={3} whiteSpace="nowrap">
              {t(name)}
            </Text>
          )}
        </Flex>
      </ListItem>
    </Link>
  );
};

export default Item;
