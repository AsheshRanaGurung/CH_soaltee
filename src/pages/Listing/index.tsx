import { Stack, useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@soaltee-loyalty/components/atoms/Breadcrumb";
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

const ListingPage = () => {
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

  // Pagination
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

  // Pagination ends

  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: (_: any, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        Header: "Tier Name",
        accessor: "price",
        width: "20%",
      },
      {
        Header: "Points To Tier",
        accessor: "category",
        width: "40%",
      },
      {
        Header: "Image",
        accessor: "image",
        width: "20%",
      },
      {
        Header: "Action",
        Cell: ({ row }: CellProps<{ id: string; name: string }>) => {
          // const onEdit = () => {
          //   setUpdateId(row.original?.id);
          //   // setIsUpdate(true);
          //   onProductModalOpen();
          // };
          const onView = () => {
            setUpdateId(row.original?.id);
            onViewProductModalOpen();
          };
          const onDelete = () => {
            onOpen();
            // setbankID(row?.original?.id);
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                // onEdit={onEdit}
                onView={onView}
                onDelete={onDelete}
              />
            </Stack>
          );
        },
        width: 120,
      },
    ],
    [pageParams]
  );
  return (
    <>
      <BreadCrumb name="Membership Tier" />
      <DataTable
        data={paginatedData || []}
        loading={tableDataFetching}
        columns={columns}
        btnText="Add Membership Tier"
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
        // isLoading={isLoading || isUpdating || bankInfoFetching}
        // title={isUpdate ? "Update Bank" : "Add Bank"}
        onCloseModal={onProductModalClose}
        resetButtonText={"Cancel"}
        // submitButtonText={isUpdate ? "Update Bank" : "Add bank"}
        // submitHandler={handleSubmit(onSubmitHandler)}
      >
        <p>Add Product</p>
      </ModalForm>

      {/* view modal */}
      <ModalForm
        isModalOpen={isViewProductOpen}
        // isLoading={ProductInfoFetching}
        title="Product Details"
        onCloseModal={onViewProductModalClose}
        submitButtonText={"Okay"}
        view={true}
      >
        <p>View Modal</p>
      </ModalForm>

      {/* view modal ends */}

      <ModalForm
        title={"Delete"}
        // isLoading={isDeleting}
        isModalOpen={isOpen}
        onCloseModal={onClose}
        resetButtonText={"No"}
        submitButtonText={"Yes"}
        // handleSubmit={() => onDelete(bankID ?? "")}
      >
        Are you sure you want to delete the Product detail?
      </ModalForm>
    </>
  );
};
export default ListingPage;
