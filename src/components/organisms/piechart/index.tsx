import { colors } from "@src/theme/colors";
import styled from "styled-components";
import { PieChart, Pie, Cell, Label } from "recharts";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { date } from "@src/constant/index";
import { usePropertyList } from "@src/constant/usePropertyList";
import { useGetTotalTier } from "@src/service/dashboard";
import { SelectCustom } from "@src/components/atoms/Select/SelectCustom";
import { FieldErrorsImpl, useForm } from "react-hook-form";
import { useState } from "react";
import NoDataAvailable from "../nodata";

const Card = styled.div`
  background: ${colors.white};
  padding: 15.52px 26.139px;
  border-radius: 14.061px;
  .piechart-header {
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
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  .piechart-title {
    color: var(--primitives-primary-black, #111);
    font-size: 18px;
    font-weight: 600;
  }
  .piechart-subtitle {
    color: var(--gray-dark-2, #5f6165);
    font-size: 16px;
    font-weight: 600;
  }
  .piechart-dropdown {
    padding: 8px 4px;
    justify-content: center;
    align-items: center;
    gap: 2px;
    border-radius: 24px;
    border: 1px solid ${colors.primary};
  }
`;
const PieChartComponent = ({ data }: any) => {
  const totalUserSum = data?.reduce(
    (acc: any, current: { totalUser: any }) => acc + (current?.totalUser || 0),
    0
  );
  return (
    <Box justifyContent={"center"} display="flex">
      {data.length > 0 ? (
        <PieChart width={414} height={270}>
          {" "}
          <Pie
            data={data?.map(
              (item: { tierName: string; totalUser: number }) => ({
                name: item?.tierName,
                value: item?.totalUser || 0,
              })
            )}
            cx={190}
            cy={115}
            innerRadius={70}
            outerRadius={110}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {data?.map((item: any, index: number) => (
              <Cell key={`cell-${index}`} fill={item?.tierColor} />
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
              value={totalUserSum}
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
      ) : (
        <NoDataAvailable content="No Data Available" />
      )}
    </Box>
  );
};

export const PieChartCard = () => {
  const [prov, setProv] = useState("-1");
  const [tiers, setTiers] = useState("month");
  const {
    control,
    formState: { errors },
  } = useForm();
  const propertyList = usePropertyList();
  const { data, isLoading, isError } = useGetTotalTier({
    property: prov,
    tier: tiers,
  });

  return (
    <Card>
      <div className="piechart-wrapper">
        <div className="piechart-header">
          <div className="piechart-top">
            <Flex justifyContent={"space-between"} w="100%">
              <Heading width={"100%"} fontSize={"17px"}>
                Member Count{" "}
              </Heading>
              <Flex direction={"row"} gap={2}>
                <SelectCustom
                  name="property"
                  errors={errors as Partial<FieldErrorsImpl<any>>}
                  placeholder="All"
                  control={control}
                  isLoading={isLoading}
                  isError={isError}
                  selectOptions={
                    propertyList?.map((item: { id: any; name: any }) => {
                      return {
                        value: item?.id,
                        label: item?.name,
                      };
                    }) ?? []
                  }
                  onAdditionalOnChange={(e) => setProv(e.target.value || "-1")}
                />
                <SelectCustom
                  name="date"
                  errors={errors as Partial<FieldErrorsImpl<any>>}
                  placeholder="Today"
                  control={control}
                  isLoading={isLoading}
                  isError={isError}
                  selectOptions={
                    date?.map((item: { value: any; label: any }) => {
                      return {
                        value: item?.value,
                        label: item?.label,
                      };
                    }) ?? []
                  }
                  onAdditionalOnChange={(e) =>
                    setTiers(e.target.value || "month")
                  }
                />
              </Flex>
            </Flex>
          </div>
          <div className="piechart-subtitle">Total Users Onboard</div>
        </div>
        <div className="piechart-container">
          <PieChartComponent data={data || []} />
        </div>
      </div>
      <Flex flexDirection={"column"} w={"100%"}>
        {data?.map((item: any, index: number) => (
          <div className="data-row" key={index}>
            <div className="title">
              <Box className="label" background={item?.tierColor}>
                {/* {item.tierColor} */}
              </Box>
              <div className="name">{item.tierName}</div>
            </div>
            <div className="value">{item.totalUser}</div>
          </div>
        ))}
      </Flex>
    </Card>
  );
};
