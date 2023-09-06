import { colors } from "@src/theme/colors";
import styled from "styled-components";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  YAxis,
} from "recharts";

const Card = styled.div`
  background: ${colors.white};
  padding: 15.52px 26.139px;
  border-radius: 14.061px;
  width: fit-content;
  .graph-header: {
    display: flex;
    flex-direction: column;
    gap: 12.89px;
  }

  .graph-title {
    color: var(--primitives-primary-black, #111);
    font-size: 18px;
    font-weight: 600;
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
    <AreaChart
      width={600}
      height={400}
      data={graphdata}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="uv"
        stroke="#FF764C"
        fill="#FF764C"
        fillOpacity={0.3}
      />
      <Area
        type="monotone"
        dataKey="uv"
        stroke="#FF764C"
        fill="#FF764C"
        fillOpacity={0.3}
      />
    </AreaChart>
  );
};
export const Graphcard = () => {
  return (
    <Card>
      <div className="graph-header">
        <div className="graph-title">Overview</div>
        <div className="graph-subtitle">Total Users Onboard</div>
      </div>
      <GraphComponent />
    </Card>
  );
};
