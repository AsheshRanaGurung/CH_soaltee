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
    uv: number;
  }[],
  setNewData: Dispatch<
    SetStateAction<
      {
        name: string;
        uv: number;
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
        uv: item.totalMembers,
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

const GraphComponent = ({ data }: any) => {
  return (
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
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#FF764C3D"
            fill="#FF764C3D"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export const Graphcard = ({ setTimeDuration, data }: any) => {
  const [newMonth, setNewMonth] = useState<{ name: string; uv: number }[]>([
    {
      name: "Jan",
      uv: 0,
    },
    {
      name: "Feb",
      uv: 0,
    },
    {
      name: "Mar",
      uv: 0,
    },
    {
      name: "Apr",
      uv: 0,
    },
    {
      name: "May",
      uv: 0,
    },
    {
      name: "Jun",
      uv: 0,
    },
    {
      name: "Jul",
      uv: 0,
    },
    {
      name: "Aug",
      uv: 0,
    },
    {
      name: "Sep",
      uv: 0,
    },
    {
      name: "Oct",
      uv: 0,
    },
    {
      name: "Nov",
      uv: 0,
    },
    {
      name: "Dec",
      uv: 0,
    },
  ]);
  const [newData, setNewData] = useState<{ name: string; uv: number }[]>([
    {
      name: "Sun",
      uv: 0,
    },
    {
      name: "Mon",
      uv: 0,
    },
    {
      name: "Tue",
      uv: 0,
    },
    {
      name: "Wed",
      uv: 0,
    },
    {
      name: "Thu",
      uv: 0,
    },
    {
      name: "Fri",
      uv: 0,
    },
    {
      name: "Sat",
      uv: 0,
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
