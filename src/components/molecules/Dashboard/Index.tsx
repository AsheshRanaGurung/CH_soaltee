import {
  Box,
  Card,
  GridItem,
  SimpleGrid,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { MailIcon } from "@src/assets/svgs";
import { ChartIcon } from "@src/components/atoms/ChartIcon";
import { useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { colors } from "@src/theme/colors";

export const DashboardAdmin = ({
  data,
}: {
  data: any;
  dataList: any;
  isLoading?: boolean;
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 1, lg: 2, xl: 4 }}
      columnGap={6}
      rowGap={4}
    >
      <GridItem colSpan={2}>
        <Card boxShadow="4px 4px 24px rgba(0, 0, 0, 0.05)" h="full">
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            borderBottom={"1px solid #EDF2F7"}
          >
            <ChartIcon
              bg={"#FEF3E0"}
              icon={<MailIcon />}
              title={"Accounts"}
              value={
                tabIndex === 0
                  ? data?.totalUserToday ?? 0
                  : tabIndex === 1
                  ? data?.totalUserToday ?? 0
                  : data?.totalUserToday ?? 0
              }
            />
            <Tabs
              variant="soft-rounded"
              textAlign={"center"}
              lineHeight={1}
              paddingRight={"15px"}
              onChange={(index) => setTabIndex(index)}
            >
              <TabList borderRadius="15px" background={"gray.100"}>
                <Tab
                  color={"#718096"}
                  _selected={{
                    color: "white",
                    bg: colors.primary,
                  }}
                  borderRadius={"20px"}
                  fontSize="14px"
                >
                  Today
                </Tab>
                <Tab
                  color={"#718096"}
                  _selected={{
                    color: "white",
                    bg: colors.primary,
                  }}
                  borderRadius={"20px"}
                  fontSize="14px"
                >
                  Monthly
                </Tab>
                <Tab
                  color={"#718096"}
                  _selected={{
                    color: "white",
                    bg: colors.primary,
                  }}
                  borderRadius={"20px"}
                  fontSize="14px"
                >
                  Yearly
                </Tab>
              </TabList>
            </Tabs>
          </Box>
          <DashboardCard
            distributed={0}
            claimed={
              tabIndex === 0
                ? data?.totalRewardPointsToday ?? 0
                : tabIndex === 1
                ? data?.totalRewardPointsMonth ?? 0
                : data?.totalRewardPointsYear ?? 0
            }
          />
        </Card>
      </GridItem>
    </SimpleGrid>
  );
};
