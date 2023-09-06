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
import { useState } from "react";

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
const graphdata = [
  {
    name: "Sunday",
    uv: 4000,
  },
  {
    name: "Monday",
    uv: 3000,
  },
  {
    name: "Tuesday",
    uv: 2000,
  },
  {
    name: "Wednesday",
    uv: 2780,
  },
  {
    name: "Thursday",
    uv: 1890,
  },
  {
    name: "Friday",
    uv: 2390,
  },
  {
    name: "Saturday",
    uv: 3490,
  },
];
const GraphComponent = () => {
  return (
    <Box marginTop={"30px"}>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart
          data={graphdata}
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
export const Graphcard = () => {
  const [_, setTabIndex] = useState(0);

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
      </Flex>
      <GraphComponent />
    </Card>
  );
};
