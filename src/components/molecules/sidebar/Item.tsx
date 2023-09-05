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
    <Link as={RouterLink} to={to || "#"} color={colors.white}>
      <ListItem
        display={"flex"}
        mr={4}
        ml={isChild ? 10 : 4}
        p={2}
        mb={3}
        borderRadius={9}
        bgColor={active ? (isChild ? colors.secondary : colors.secondary) : ""}
        transition="all ease-in-out"
        height={"50px"}
        fontWeight={active ? (isChild ? "600" : "600") : "400"}
        color={
          active
            ? isChild
              ? colors.primary
              : colors.primary
            : colors.secondary_black
        }
        sx={{
          svg: {
            background: `${
              active ? (isChild ? colors.primary : colors.primary) : ""
            }`,
            padding: `${active ? "5px" : ""}`,
            borderRadius: `${active ? "45%" : ""}`,
            height: `${active ? "30px" : "15px"}`,
            width: `${active ? "30px" : "15px"}`,
          },
          "svg path": {
            transition: "all ease-in-out",
            fill: `${active ? colors.white : colors.primary}`,
          },
          "&:hover": {
            transition: "all ease-in-out",
            textDecoration: "none",
            color: isChild ? colors.primary : colors.primary,
            bgColor: isChild ? colors.secondary : colors.secondary,
            "svg path": {
              transition: "all ease-in-out",
              fill: `${active ? colors.white : colors.primary}`,
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
