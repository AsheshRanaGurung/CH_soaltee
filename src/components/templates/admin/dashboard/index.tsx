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
import { Dispatch, SetStateAction } from "react";
import { DashboardCard } from "../../../molecules/dashboard-card";
import { colors } from "@src/theme/colors";
import { EarnPoint } from "../earn-point";
import { Graphcard } from "@src/components/organisms/graph";
import { PieChartCard } from "@src/components/organisms/piechart";
import { GraphUser } from "@src/components/molecules/graph-user";
import RecentActivityCard from "@src/components/molecules/dashboard/RecentActivity";

export const DashboardAdmin = ({
  data,
  rewardData,
  totalReward,
  setTimeDuration,
  setDateDuration,
}: {
  data?: any;
  totalReward: any;
  rewardData?: any;
  isLoading?: boolean;
  setTimeDuration: Dispatch<SetStateAction<string>>;
  setDateDuration: Dispatch<SetStateAction<string>>;
}) => {
  const handleClick = (name: "day" | "month" | "year") => {
    setTimeDuration(name);
  };
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
                title={"Members Enrolled"}
                value={data?.totalOnboardUser}
              />
              <Tabs
                variant="soft-rounded"
                textAlign={"center"}
                lineHeight={1}
                paddingRight={"15px"}
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
                    onClick={() => handleClick("day")}
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
                    onClick={() => handleClick("month")}
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
                    onClick={() => handleClick("year")}
                  >
                    Yearly
                  </Tab>
                </TabList>
              </Tabs>
            </Box>
            <DashboardCard
              distributed={data?.totalRewardPoints?.toLocaleString("en-US")}
              claimed={data?.totalReedemPoints?.toLocaleString("en-US")}
            />
          </Card>
          <EarnPoint />
        </GridItem>
        <GridItem>
          <GraphUser data={rewardData} />
          <Graphcard
            setTimeDuration={setDateDuration}
            data={totalReward ?? []}
          />
        </GridItem>
        <GridItem>
          <PieChartCard />
        </GridItem>
      </SimpleGrid>
      <RecentActivityCard />
    </>
  );
};
