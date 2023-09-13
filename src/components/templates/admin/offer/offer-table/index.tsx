import { Stack } from "@chakra-ui/react";
import DataTable from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { IOffers } from "@src/interface/offers";
import { IParams } from "@src/interface/params";
import { useMemo } from "react";
import { CellProps } from "react-table";

interface IOfferTable {
  tableDataFetching?: boolean;
  onAction?: () => void;
  title?: string;
  btnText?: string;
  CurrentText?: string;
  onEditData?: ((id: string) => void) | undefined;
  onDeleteData?: ((id: string) => void) | undefined;
  paginatedData: IOffers[];
  pageParams: IParams;
}

const OfferTable: React.FC<IOfferTable> = ({
  tableDataFetching,
  onAction,
  title,
  btnText,
  CurrentText,
  onEditData,
  onDeleteData,
  paginatedData,
  pageParams,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: (_: IOffers, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        Header: "Title",
        accessor: "offerName",
        width: "20%",
      },
      {
        Header: "Sub-Title",
        accessor: "subTitle",
        width: "20%",
      },
      // {
      //   Header: "Description",
      //   accessor: "description",
      //   width: "20%",
      // },
      {
        Header: "Image",
        accessor: "offerImage",
        width: "20%",
        Cell: ({ value }: { value: string }) => {
          return <img src={value} alt="Image" width="100" />;
        },
      },
      {
        Header: "Action",
        width: "10%",

        Cell: ({ row }: CellProps<{ offerId: string }>) => {
          console.log("errr", row.original);
          const onEdit = () => {
            onEditData && onEditData(row.original?.offerId);
          };
          const onDelete = () => {
            onDeleteData && onDeleteData(row.original?.offerId);
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions onEdit={onEdit} onDelete={onDelete} />
            </Stack>
          );
        },
      },
    ],
    [pageParams]
  );
  return (
    <>
      <DataTable
        data={paginatedData || []}
        loading={tableDataFetching}
        columns={columns}
        CurrentText={CurrentText}
        btnText={btnText}
        onAction={onAction}
        title={title}
      ></DataTable>
    </>
  );
};
export default OfferTable;
