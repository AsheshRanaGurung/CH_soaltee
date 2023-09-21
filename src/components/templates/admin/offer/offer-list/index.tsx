import { Stack } from "@chakra-ui/react";
import { useMemo } from "react";
import { IOffers } from "@src/interface/offers";
import { CellProps } from "react-table";
import { usePageParams } from "@src/components/organisms/layout";
import TableHeadings from "@src/components/molecules/table-heading";
import BasicTable from "@src/components/molecules/table";
import TableActions from "@src/components/molecules/table/TableActions";

interface IOfferProps {
  setUpdateId: any;
  setIsUpdate: any;
  onOfferModalOpen: any;
  onCloseHandler: any;
  data: any;
  isLoading: any;
  onDeleteOfferOpen: any;
  onDeleteOffer: any;
  setDeleteId: any;
  onViewOfferOpen: any;
  setViewId: any;
}

const OfferList: React.FC<IOfferProps> = ({
  setUpdateId,
  setIsUpdate,
  onOfferModalOpen,
  onCloseHandler,
  data,
  isLoading,
  onDeleteOfferOpen,
  setDeleteId,
  onViewOfferOpen,
  setViewId,
}) => {
  const { pageParams } = usePageParams();

  const columns = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: IOffers, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        header: "Title",
        accessorKey: "offerName",
        width: "20%",
      },
      {
        header: "Sub-Title",
        accessorKey: "subTitle",
        width: "20%",
      },
      // {
      //   header: "Description",
      //   accessorKey: "description",
      //   width: "20%",
      // },
      {
        header: "Image",
        accessorKey: "offerImage",
        cell: ({ value }: { value: string }) => {
          return <img src={value} alt="Image" width="100" />;
        },
      },
      {
        header: "Action",
        cell: ({ row }: CellProps<{ offerId: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original.offerId);
            setIsUpdate(true);
            onOfferModalOpen();
          };
          const onDelete = () => {
            setDeleteId(row.original.offerId);
            onDeleteOfferOpen();
          };
          const onView = () => {
            setViewId(row.original.offerId);
            onViewOfferOpen();
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            </Stack>
          );
        },
      },
    ],
    [pageParams]
  );
  return (
    <>
      <TableHeadings
        btnText="Add Offer"
        CurrentText="Offer List"
        onAction={() => {
          onCloseHandler();
          onOfferModalOpen();
        }}
      />
      <BasicTable
        data={data?.data || []}
        columns={columns}
        isLoading={isLoading}
        totalPages={data?.totalPages}
      />
      {/* <OfferPage isOpen={isOpen} onClose={onClose} viewId={viewId} /> */}
    </>
  );
};
export default OfferList;
