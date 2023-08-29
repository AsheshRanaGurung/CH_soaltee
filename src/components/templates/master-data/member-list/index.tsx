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

const MemberList = () => {
  const { data: tableData, isFetching: tableDataFetching } = useGetProducts();
  const [, setUpdateId] = useState("");

  const {
    isOpen: isMemberOpen,
    onOpen: onMemberModalOpen,
    onClose: onMemberModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteMemberOpen,
    onOpen,
    onClose: onDeleteMemberClose,
  } = useDisclosure();

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
          const onEdit = () => {
            setUpdateId(row.original?.id);
            // setIsUpdate(true);
            onMemberModalOpen();
          };
          //   const onView = () => {
          //     setUpdateId(row.original?.id);
          //     onViewProductModalOpen();
          //   };
          const onDelete = () => {
            onOpen();
            // setbankID(row?.original?.id);
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                onEdit={onEdit}
                // onView={onView}
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
  console.log(paginatedData);
  return (
    <>
      {/* <BreadCrumb name="Membership Tier" /> */}
      <DataTable
        data={paginatedData || []}
        loading={tableDataFetching}
        columns={columns}
        btnText="Add Membership Tier"
        onAction={() => {
          onMemberModalClose();
          onMemberModalOpen();
        }}
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
        isModalOpen={isMemberOpen}
        // isLoading={isLoading || isUpdating || memberInfoFetching}
        // title={isUpdate ? "Update Bank" : "Add Bank"}
        onCloseModal={onMemberModalClose}
        resetButtonText={"Cancel"}
        submitButtonText={"Add Member Tier"}

        // submitButtonText={isUpdate ? "Update Bank" : "Add bank"}
        // submitHandler={handleSubmit(onSubmitHandler)}
      >
        <p>Add Member / Edit Member</p>
      </ModalForm>

      <ModalForm
        title={"Delete"}
        // isLoading={isDeleting}
        isModalOpen={isDeleteMemberOpen}
        onCloseModal={onDeleteMemberClose}
        resetButtonText={"No"}
        submitButtonText={"Yes"}
        // handleSubmit={() => onDelete(bankID ?? "")}
      >
        Are you sure you want to delete the Member Tier ?
      </ModalForm>
    </>
  );
};
export default MemberList;
