import { Stack, useDisclosure } from "@chakra-ui/react";
import { ProductForm } from "@soaltee-loyalty/components/templates/form";
import ModalForm from "@soaltee-loyalty/components/organisms/modal";
import DataTable, {
  Pagination,
} from "@soaltee-loyalty/components/organisms/table";
import TableActions from "@soaltee-loyalty/components/organisms/table/TableActions";
import { getPaginatedData } from "@soaltee-loyalty/components/organisms/table/pagination";
import { useGetProducts } from "@soaltee-loyalty/service/service-list";
import { useMemo, useState } from "react";
import { CellProps } from "react-table";

const PropertyList = () => {
  const { data: tableData, isFetching: tableDataFetching } = useGetProducts();
  const [, setUpdateId] = useState("");

  const { isOpen: isProductOpen, onClose: onProductModalClose } =
    useDisclosure();
  const {
    isOpen: isViewProductOpen,
    onOpen: onViewProductModalOpen,
    onClose: onViewProductModalClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
  });
  const paginatedData = getPaginatedData({
    tableData,
    pageParams,
  });
  const _pageChange = (page: number) => {
    setPageParams({ ...pageParams, page });
  };
  const _pageSizeChange = (limit: number) =>
    setPageParams({ ...pageParams, limit, page: 1 });

  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: (_: any, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
      },

      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Action",
        width: "100px",
        Cell: ({ row }: CellProps<{ id: string; name: string }>) => {
          const onView = () => {
            setUpdateId(row.original?.id);
            onViewProductModalOpen();
          };
          const onDelete = () => {
            onOpen();
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions onView={onView} onDelete={onDelete} />
            </Stack>
          );
        },
      },
    ],
    [pageParams]
  );
  console.log(paginatedData);
  return (
    <>
      <DataTable
        data={paginatedData || []}
        loading={tableDataFetching}
        columns={columns}
        title="Filter By"
      >
        <ProductForm />
      </DataTable>

      <Pagination
        enabled={true}
        queryPageIndex={pageParams.page}
        queryPageSize={pageParams.limit}
        totalCount={tableData?.length || 0}
        pageChange={_pageChange}
        pageSizeChange={_pageSizeChange}
      />
      <ModalForm
        isModalOpen={isProductOpen}
        onCloseModal={onProductModalClose}
        resetButtonText={"Cancel"}
      >
        <p>Add Product</p>
      </ModalForm>

      <ModalForm
        isModalOpen={isViewProductOpen}
        title="Product Details"
        onCloseModal={onViewProductModalClose}
        submitButtonText={"Okay"}
        view={true}
      >
        <p>View Modal</p>
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isModalOpen={isOpen}
        onCloseModal={onClose}
        resetButtonText={"No"}
        submitButtonText={"Yes"}
      >
        Are you sure you want to delete the Product detail?
      </ModalForm>
    </>
  );
};
export default PropertyList;
