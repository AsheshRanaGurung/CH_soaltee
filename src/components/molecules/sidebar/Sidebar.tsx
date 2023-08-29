import { Box, List, ListItem, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
// import { FiInfo } from "react-icons/fi";

import NavItem from "./NavItem";
import {
  FaUsers,
  FaTags,
  FaChartSimple,
  FaDatabase,
  FaHandHoldingDollar,
  FaGear,
} from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import styled from "styled-components";
import { NAVIGATION_ROUTES } from "@soaltee-loyalty/routes/routes.constant";
import { colors } from "@soaltee-loyalty/theme/colors";
import { imageList } from "@soaltee-loyalty/assets/images";
const Icon = styled.div``;
interface ISidebar {
  isCollapse: boolean;
  onEnterSidebar?: () => void;
  onExitSidebar?: () => void;
  isHovered?: boolean;
  width: string;
}
const Sidebar = ({
  isCollapse,
  onEnterSidebar,
  onExitSidebar,
  width,
}: ISidebar) => {
  const navItems = [
    {
      name: "Dashboard",
      to: NAVIGATION_ROUTES.DASHBOARD,
      icon: (
        <Icon>
          <FaHome />
        </Icon>
      ),
      visible: true,
    },
    {
      name: "Member Management",
      to: NAVIGATION_ROUTES.MEMBER,
      icon: (
        <Icon>
          <FaUsers />
        </Icon>
      ),
      visible: true,
    },
    {
      name: "Voucher & promocode",
      to: NAVIGATION_ROUTES.VOUCHER,
      icon: (
        <Icon>
          <FaTags />
        </Icon>
      ),
      visible: true,
    },
    {
      name: "Report",
      to: NAVIGATION_ROUTES.PROPERTY,
      icon: (
        <Icon>
          <FaChartSimple />
        </Icon>
      ),
      visible: true,
    },
    {
      name: "Master Data",
      // to: NAVIGATION_ROUTES.MASTER,
      icon: (
        <Icon>
          <FaDatabase />
        </Icon>
      ),
      visible: true,
      child: [
        // {
        //   name: "Property",
        //   to: NAVIGATION_ROUTES.PROPERTYS,
        //   visible: true,
        // },
        {
          name: "Menbership Tier",
          to: NAVIGATION_ROUTES.LOGIN,
          visible: true,
        },
      ],
    },
    {
      name: "Point Configuration",
      to: NAVIGATION_ROUTES.CONFIGURATION,
      icon: (
        <Icon>
          <FaHandHoldingDollar />
        </Icon>
      ),
      visible: true,
      child: [
        {
          name: "Service",
          to: NAVIGATION_ROUTES.LOGIN,
          visible: true,
        },
        {
          name: "Other",
          to: NAVIGATION_ROUTES.LOGIN,
          visible: true,
        },
      ],
    },
    {
      name: "Settings",
      to: NAVIGATION_ROUTES.SETTINGS,
      icon: (
        <Icon>
          <FaGear />
        </Icon>
      ),
      visible: true,
    },
  ];

  return (
    <Box
      w={width}
      maxW={width}
      color={colors.light_gray_text}
      sx={{
        "&::-webkit-scrollbar": {
          width: "3px",
          backgroundColor: colors.primary,
        },
      }}
      transitionDuration="0.3s"
      position={"relative"}
      maxH="100vh"
      overflowY={"auto"}
      onMouseEnter={onEnterSidebar}
      onMouseLeave={onExitSidebar}
      bgColor={colors.white}
    >
      <img src={imageList.Logo} />
      <List>
        <ListItem mx={3} my={6}>
          <Link as={RouterLink} to={NAVIGATION_ROUTES.DASHBOARD}></Link>
        </ListItem>
        {navItems.map((item) => (
          <NavItem key={item.name} {...item} isCollapse={isCollapse} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
