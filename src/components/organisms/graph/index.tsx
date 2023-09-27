import { colors } from "@src/theme/colors";
import styled from "styled-components";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Box, Flex, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function handleGraphData(
  totalReward: any,
  newData: {
    name: string;
    user: number;
  }[],
  setNewData: Dispatch<
    SetStateAction<
      {
        name: string;
        user: number;
      }[]
    >
  >
) {
  const newDataMap = new Map(newData.map((item) => [item.name, item]));
  totalReward.forEach((item: { dayOrMonth: string; totalMembers: any }) => {
    const name = item.dayOrMonth.trim().slice(0, 3);
    const existingDataItem = newDataMap.get(name);
    if (existingDataItem) {
      const updatedDataItem = {
        name: existingDataItem.name,
        user: item.totalMembers,
      };
      setNewData((prevData) =>
        prevData.map((prevItem) =>
          prevItem.name === name ? updatedDataItem : prevItem
        )
      );
    }
  });
}

const Card = styled.div`
  background: ${colors.white};
  padding: 15.52px 26.139px;
  border-radius: 14.061px;
  .graph-header: {
    display: flex;
    flex-direction: column;
    gap: 12.89px;
  }

  .graph-title {
    color: #111111;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .graph-subtitle {
    color: var(--gray-dark-2, #5f6165);
    font-size: 16px;
    font-weight: 600;
  }
`;
const GraphStyled = styled.div`
  .recharts-wrapper {
    .recharts-cartesian-axis-line {
      width: 330px !important;
    }
  }
`;
const GraphComponent = ({ data }: any) => {
  return (
    <GraphStyled>
      <Box marginTop={"30px"}>
        <ResponsiveContainer height={300} width="100%">
          <AreaChart
            data={data || []}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="user"
              stroke="#FF764C3D"
              fill="#FF764C3D"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </GraphStyled>
  );
};

export const Graphcard = ({ setTimeDuration, data }: any) => {
  const [newMonth, setNewMonth] = useState<{ name: string; user: number }[]>([
    {
      name: "Jan",
      user: 0,
    },
    {
      name: "Feb",
      user: 0,
    },
    {
      name: "Mar",
      user: 0,
    },
    {
      name: "Apr",
      user: 0,
    },
    {
      name: "May",
      user: 0,
    },
    {
      name: "Jun",
      user: 0,
    },
    {
      name: "Jul",
      user: 0,
    },
    {
      name: "Aug",
      user: 0,
    },
    {
      name: "Sep",
      user: 0,
    },
    {
      name: "Oct",
      user: 0,
    },
    {
      name: "Nov",
      user: 0,
    },
    {
      name: "Dec",
      user: 0,
    },
  ]);
  const [newData, setNewData] = useState<{ name: string; user: number }[]>([
    {
      name: "Sun",
      user: 0,
    },
    {
      name: "Mon",
      user: 0,
    },
    {
      name: "Tue",
      user: 0,
    },
    {
      name: "Wed",
      user: 0,
    },
    {
      name: "Thu",
      user: 0,
    },
    {
      name: "Fri",
      user: 0,
    },
    {
      name: "Sat",
      user: 0,
    },
  ]);
  useEffect(() => {
    handleGraphData(data, newData, setNewData);
    handleGraphData(data, newMonth, setNewMonth);
  }, [data]);
  const [tabIndex, setTabIndex] = useState(0);
  const handleClick = (name: "week" | "month") => {
    setTimeDuration(name);
  };
  return (
    <Card>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box>
          <div className="graph-header">
            <div className="graph-title">Overview</div>
            <div className="graph-subtitle">Total Users Onboard</div>
          </div>
        </Box>
        <Box>
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
                onClick={() => {
                  handleClick("week");
                  setTabIndex(0);
                }}
              >
                Weekly
              </Tab>
              <Tab
                color={"#718096"}
                _selected={{
                  color: "white",
                  bg: colors.primary,
                }}
                borderRadius={"20px"}
                fontSize="14px"
                onClick={() => {
                  handleClick("month");
                  setTabIndex(1);
                }}
              >
                Monthly
              </Tab>
            </TabList>
          </Tabs>
        </Box>
      </Flex>
      <GraphComponent data={tabIndex === 0 ? newData : newMonth} />
    </Card>
  );
};
