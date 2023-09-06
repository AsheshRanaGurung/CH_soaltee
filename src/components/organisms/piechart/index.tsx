import { colors } from "@src/theme/colors";
import styled from "styled-components";
import { PieChart, Pie, Cell, Label } from "recharts";
import { Box, Flex } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import { date, property } from "@src/constant/index";
import { useFormHook } from "@src/hooks/useFormhook";

const Card = styled.div`
  background: ${colors.white};
  padding: 15.52px 26.139px;
  border-radius: 14.061px;
  .piechart-header: {
    display: flex;
    flex-direction: column;
    gap: 8.985px;
  }
  .piechart-top {
    display: flex;
    justify-content: space-between;  
  }
  .piechart-dropdowns {
    display: flex;
    gap: 8.985px;
  }
  .piechart-wrapper {
    display: flex;
    flex-direction: column;
    gap: 31.041px;
  }
  .data-row {
    border-bottom: 1px solid ${colors.light_gray_border};
    margin-bottom: 10.62px;
    padding-bottom: 8.62px;
    display:flex;
    align-items-center;
    justify-content:space-between;
  }
  .title {
    display: flex;
    gap: 9.8px;
  }
  .label {
    padding: 4.084px 6.535px;
    border-radius: 2.451px;
    width: 44.927px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    color: ${colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .name {
    display: flex;
    align-items: center;
  }
  .piechart-title{
    color: var(--primitives-primary-black, #111);
    font-size: 18px;
    font-weight: 600;
  }
  .piechart-subtitle{
    color: var(--gray-dark-2, #5F6165);
    font-size: 16px;
    font-weight: 600;
  }
  .piechart-dropdown{
    padding: 8px 4px;
    justify-content: center;
    align-items: center;
    gap: 2px;
    border-radius: 24px;
    border: 1px solid ${colors.primary}
  }
`;
const data = [
  { label: "PLT", name: "Platinum", value: 12 },
  { label: "GLD", name: "Gold", value: 32 },
  { label: "SIL", name: "Silver", value: 92 },
  { label: "MEM", name: "Member", value: 190 },
];
const COLORS = [
  `${colors.chart_green}`,
  `${colors.chart_yellow}`,
  `${colors.chart_blue}`,
  `${colors.chart_black}`,
];

const PieChartComponent = () => {
  return (
    <Box justifyContent={"center"} display="flex">
      <PieChart width={414} height={270}>
        {" "}
        <Pie
          data={data}
          cx={190}
          cy={115}
          innerRadius={70}
          outerRadius={110}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label
            value="Total Users"
            position="center"
            content={({ value }) => (
              <text
                x={190}
                y={90}
                fill="#8B8B8B"
                textAnchor="middle"
                fontSize={"14px"}
              >
                {value}
              </text>
            )}
          />

          <Label
            value="20,200"
            position="center"
            content={({ value }) => (
              <text
                x={190}
                y={140}
                fill="#374252"
                textAnchor="middle"
                fontSize={"32px"}
              >
                {value}
              </text>
            )}
          />
        </Pie>
      </PieChart>
    </Box>
  );
};

export const PieChartCard = () => {
  const { register, errors } = useFormHook({});

  return (
    <Card>
      <div className="piechart-wrapper">
        <div className="piechart-header">
          <div className="piechart-top">
            <div className="piechart-title">Member Count</div>
            <Flex>
              <Box marginRight={"5px"}>
                <FormControl
                  control="select"
                  register={register}
                  name="Property"
                  placeholder="Property"
                  required
                  error={errors.nationality?.message || ""}
                  options={property}
                  style={{
                    border: "1px solid #AB1D3F",
                    color: "#AB1D3F",
                    borderRadius: "24px",
                    padding: "8px, 4px, 8px, 4px",
                  }}
                />
              </Box>
              <Box>
                <FormControl
                  control="select"
                  register={register}
                  name="nationality"
                  placeholder="Today"
                  required
                  error={errors.nationality?.message || ""}
                  options={date}
                  style={{
                    border: "1px solid #AB1D3F",
                    color: "#AB1D3F",
                    borderRadius: "24px",
                    padding: "8px, 4px, 8px, 4px",
                  }}
                />
              </Box>
            </Flex>
            {/* <div className="piechart-dropdowns">
              <div className="piechart-dropdown">
                <span>Property 1</span>
              </div>
              <div className="piechart-dropdown">
                <span>Today</span>
              </div>
            </div> */}
          </div>
          <div className="piechart-subtitle">Total Users Onboard</div>
        </div>
        <div className="piechart-container">
          <PieChartComponent />
        </div>
      </div>
      <Flex flexDirection={"column"} w={"100%"}>
        {data.map((col, index) => (
          <div className="data-row" key={index}>
            <div className="title">
              <div
                className="label"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              >
                {col.label}
              </div>
              <div className="name">{col.name}</div>
            </div>
            <div className="value">{col.value}</div>
          </div>
        ))}
      </Flex>
    </Card>
  );
};
