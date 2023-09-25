import { Box, Flex, Text } from "@chakra-ui/react";
import { imageList } from "@src/assets/images";
import BasicTable from "@src/components/molecules/table";
import { colors } from "@src/theme/colors";
import React, { useMemo } from "react";
import { CellProps } from "react-table";
import styled from "styled-components";
interface IGetRecentActivityProps {
  data: any;
  isLoading: any;
}
const MemberRow = styled.div<any>`
  display: flex;
  gap: 12px;
  color: ${colors.gray_600};
  img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
  }
`;
const RecentActivityList: React.FC<IGetRecentActivityProps> = ({
  data,
  isLoading,
}) => {
  const columns = useMemo(
    () => [
      {
        header: "Member Name",
        width: "15%",
        cell: ({
          row,
        }: CellProps<{
          userImageUrl: string;
          memberName: string;
          tierName: string;
        }>) => {
          return (
            <MemberRow>
              <Box>
                {row.original.userImageUrl == "" ? (
                  <img src={imageList.AvatarImg} />
                ) : (
                  <img src={row.original.userImageUrl} />
                )}
              </Box>
              <Box display="flex" flexDirection="column" gap="4px">
                <Text fontWeight={500} color={colors.black}>
                  {row.original.memberName}
                </Text>
                <Text color={colors.black_1}>
                  Tier -{" "}
                  <span style={{ color: "red" }}>{row.original.tierName}</span>
                </Text>
              </Box>
            </MemberRow>
          );
        },
      },
      {
        header: "Transaction Date",
        width: "10%",
        cell: ({ row }: CellProps<{ transactionDate: string }>) => {
          const splittedData = row.original.transactionDate.split(" ");
          const date = splittedData[0];
          const timeWithoutMilliseconds = splittedData[1].split(".")[0];
          return (
            <Flex flexDirection="column" gap="8px" color={colors.gray_600}>
              <Box>{date}</Box>
              <Box>{timeWithoutMilliseconds}</Box>
            </Flex>
          );
        },
      },
      {
        header: "Property",
        accessorKey: "propertyName",
        width: "15%",
      },
      {
        header: "Services",
        accessorKey: "serviceName",
        width: "20%",
      },
      {
        header: "Type ",
        accessorKey: "transactionType",
        width: "20%",
      },
      {
        header: "Points",
        width: "15%",
        cell: ({
          row,
        }: CellProps<{ rewardPoints: string; redeemPoints: string }>) => {
          return (
            <>
              {row.original.rewardPoints && (
                <Box
                  p={2}
                  bgColor={colors.light_green}
                  borderRadius="7px"
                  textAlign="center"
                  color={colors.dark_green}
                >
                  +&nbsp;{row.original.rewardPoints}
                </Box>
              )}

              {row.original.redeemPoints && (
                <Box
                  p={2}
                  bgColor={colors.light_red}
                  borderRadius="7px"
                  textAlign="center"
                  color={colors.dark_red}
                >
                  -&nbsp;{row.original.redeemPoints}
                </Box>
              )}
            </>
          );
        },
      },

      {
        header: "Bill Amount ",
        accessorKey: "billAmount",
        width: "15%",
      },
    ],
    []
  );
  return (
    <>
      <BasicTable
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        showPagination={false}
      />
    </>
  );
};

export default RecentActivityList;
