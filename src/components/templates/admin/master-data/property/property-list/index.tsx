import { Stack } from "@chakra-ui/react";
import { useMemo } from "react";
import { IProperty } from "@src/interface/master-data/property";
import { usePageParams } from "@src/components/organisms/layout";
import { CellProps } from "react-table";
import TableActions from "@src/components/molecules/table/TableActions";
import TableHeadings from "@src/components/molecules/table-heading";
import BasicTable from "@src/components/molecules/table";

interface IPropertyProps {
  setUpdateId: any;
  setIsUpdate: any;
  onPropertyModalOpen: any;
  onCloseHandler: any;
  data: any;
  isLoading: any;
  onDeletePropertyOpen: any;
  onDeleteProperty: any;
  setDeleteId: any;
}

const PropertyList: React.FC<IPropertyProps> = ({
  setUpdateId,
  setIsUpdate,
  onPropertyModalOpen,
  onDeletePropertyOpen,
  onCloseHandler,
  data,
  isLoading,
  setDeleteId,
}) => {
  const { pageParams } = usePageParams();

  const columns = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: IProperty, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
      },

      {
        header: "Property Name",
        accessorKey: "name",
        width: "10%",
      },
      {
        Header: "Property Code",
        accessorKey: "code",
      },
      {
        Header: "Phone Number",
        accessorKey: "phoneNumber",
      },
      {
        Header: "Contact person",
        accessorKey: "contactPerson",
      },
      {
        header: "Action",

        cell: ({ row }: CellProps<{ id: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original.id);
            setIsUpdate(true);
            onPropertyModalOpen();
          };
          const onDelete = () => {
            setDeleteId(row.original.id);
            onDeletePropertyOpen();
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
      <TableHeadings
        btnText="Add Property"
        CurrentText="Property List"
        onAction={() => {
          onCloseHandler();
          onPropertyModalOpen();
        }}
      />
      <BasicTable
        data={data?.data || []}
        columns={columns}
        isLoading={isLoading}
        totalPages={data?.totalPages}
      />
    </>
  );
};
export default PropertyList;
