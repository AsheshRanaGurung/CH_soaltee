import { Stack } from "@chakra-ui/react";
import { useMemo } from "react";
import { IOffers } from "@src/interface/offers";
import { CellProps } from "react-table";
import { usePageParams } from "@src/components/organisms/layout";
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
      {
        header: "Image",
        accessorKey: "offerImage",
        cell: ({ row }: any) => {
          return <img src={row.original.offerImage} alt="Image" width="100" />;
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
