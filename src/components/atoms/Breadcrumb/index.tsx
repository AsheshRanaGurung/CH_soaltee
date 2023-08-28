import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";

// import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import styled from "styled-components";
import { colors } from "@soaltee-loyalty/theme/colors";
import { getSidebarState } from "@soaltee-loyalty/components/organisms/layout";
const Divider = styled.div`
  color: ${colors.light_gray};
  margin-left: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const BreadCrumbContent = styled(Breadcrumb)``;
interface IBreadCrumb {
  items: { name: string; route: string }[];
  goBack?: string;
}

export const BreadCrumb = ({ items }: IBreadCrumb) => {
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const { showSidebar, setShowSidebar } = getSidebarState();

  return (
    <Wrapper>
      <RxHamburgerMenu onClick={() => setShowSidebar(!showSidebar)} />
      <BreadCrumbContent spacing={1} separator={""}>
        {items.map((item, i) => (
          <BreadcrumbItem key={i}>
            <BreadcrumbLink onClick={() => navigate(item.route)}>
              <Text fontWeight={700} color={colors.primary}>
                {item.name}
              </Text>
            </BreadcrumbLink>
            {items.length - 1 !== i && <Divider>/</Divider>}
          </BreadcrumbItem>
        ))}
      </BreadCrumbContent>
    </Wrapper>
    // <Box pb={6} my={6}>
    //   <BreadCrumbContent spacing={1} separator={""}>
    //     <Box _hover={{ cursor: "pointer" }}>
    //       <RxHamburgerMenu onClick={() => setShowSidebar(!showSidebar)} />
    //     </Box>
    //     {/* <BreadcrumbItem></BreadcrumbItem> */}
    //     <div>
    //       {items.map((item, i) => (
    //         <BreadcrumbItem key={i}>
    //           <BreadcrumbLink onClick={() => navigate(item.route)}>
    //             <Text fontWeight={700} color={colors.primary}>
    //               {item.name}
    //             </Text>
    //           </BreadcrumbLink>
    //           {items.length - 1 !== i && <Divider>/</Divider>}
    //         </BreadcrumbItem>
    //       ))}
    //     </div>
    //   </BreadCrumbContent>
    //   {/* <Flex
    //       bgColor={colors.white}
    //       borderRadius={"30px"}
    //       width={"48px"}
    //       height={"48px"}
    //       alignItems={"center"}
    //       justifyContent={"center"}
    //     >
    //       <Icon as={NotificationIcon} fontSize="2xl"></Icon>
    //     </Flex>
    //     {goBack && (
    //       <Button
    //         size={"xs"}
    //         onClick={() => {
    //           navigate(goBack);
    //         }}
    //       >
    //         {t("global_goBack")}
    //       </Button>
    //     )} */}
    // </Box>
  );
};
