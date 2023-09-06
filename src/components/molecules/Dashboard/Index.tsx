import {
  Box,
  Card,
  GridItem,
  SimpleGrid,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { FileIcon } from "@src/assets/svgs";
import { ChartIcon } from "@src/components/atoms/ChartIcon";
import { useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { colors } from "@src/theme/colors";
import { EarnPoint } from "./EardPoint";
import { Graphcard } from "@src/components/organisms/graph";
import { PieChartCard } from "@src/components/organisms/piechart";
import { GraphUser } from "@src/components/organisms/graph/graphUser";

export const DashboardAdmin = ({
  data,
  rewardData,
}: {
  data: any;
  rewardData: any;
  isLoading?: boolean;
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
        columnGap={6}
        rowGap={4}
      >
        <GridItem colSpan={1.5}>
          <Card
            boxShadow="4px 4px 24px rgba(0, 0, 0, 0.05)"
            marginBottom={"20px"}
            borderRadius={"14px"}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              borderBottom={"1px solid #EDF2F7"}
            >
              <ChartIcon
                bg={"#FEF3E0"}
                icon={<FileIcon />}
                title={"Accounts"}
                value={
                  tabIndex === 0
                    ? data?.totalUserToday ?? 0
                    : tabIndex === 1
                    ? data?.totalUserMonthly ?? 0
                    : data?.totalUserYearly ?? 0
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
          <EarnPoint rewardData={rewardData} />
        </GridItem>
        <GridItem>
          <GraphUser data={data} />
          <Graphcard />
        </GridItem>
        <GridItem>
          <PieChartCard />
        </GridItem>
      </SimpleGrid>
    </>
  );
};
