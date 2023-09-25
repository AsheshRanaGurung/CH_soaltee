import BasicTable from "@src/components/molecules/table";
import { usePageParams } from "@src/components/organisms/layout";
import { IService } from "@src/interface/pointConfig";
import { useMemo } from "react";
import { UserTransactionFilter } from "../user-transaction-filter";

interface IMemberTierTable {
  tableData?: any;
  tableDataFetching?: boolean;
  tabName?: string;
  setPara?: any;
}

// const Wrapper = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   // gap: 4%;
//   flex-wrap: wrap;
//   text-align: center;
//   position: relative;
//   div {
//     position: relative;

//     flex: 0 0 20%;
//     margin-bottom: 10px;

//     &::after {
//       content: "";
//       position: absolute;
//       border-right: 1px solid #ccc;
//       height: 90%;
//       top: 0;
//       right: 0px;
//     }
//     &:first-child {
//       &::before {
//         content: "";
//         position: absolute;
//         border-right: 1px solid #ccc;
//         height: 90%;
//         top: 0;
//         left: 0;
//       }
//     }
//   }
//   .title {
//     font-size: 14px;
//     color: ${colors.primary};
//     font-weight: 500;
//   }
//   .percent {
//     font-size: 14px;
//     color: ${colors.secondary_black};
//     font-weight: 500;
//     margin-top: 5px;
//   }
// `;

const Historytable: React.FC<IMemberTierTable> = ({
  setPara,
  tableData,
  tableDataFetching,
  tabName,
}) => {
  const { pageParams } = usePageParams();

  const columns = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: IService, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        header: "Service Name",
        accessorKey: "serviceName",
        width: "20%",
      },
      {
        header: "Property Name",
        accessorKey: "propertyName",
        width: "10%",
      },
      {
        header: "Added/Deducted Points",
        accessorKey: "rewardPoints",
        width: "10%",
      },
      {
        header: "Bill Amount",
        accessorKey: "billAmount",
        width: "10%",
      },
      {
        header: "Date",
        accessorKey: "date",
        width: "50%",
        textAlign: "center",
      },
    ],
    [pageParams]
  );

  return (
    <>
      <UserTransactionFilter setPara={setPara} tabName={tabName} />
      <BasicTable
        data={tableData || []}
        columns={columns}
        isLoading={tableDataFetching}
        totalPages={tableData?.totalPages}
      />
    </>
  );
};
export default Historytable;
