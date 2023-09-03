import { Stack, useDisclosure } from "@chakra-ui/react";
// import { ProductForm } from "@src/components/templates/form";
import ModalForm from "@src/components/organisms/modal";
import DataTable, { Pagination } from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import { useMemo, useState } from "react";
import { CellProps } from "react-table";
import { CreateMemberForm } from "../../form/master-data/member-form";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";
import { useDeleteMemberTier } from "@src/service/master-data/member-tier";

const MemberList = ({ data: tableData, isLoading: tableDataFetching }: any) => {
  const [, setUpdateId] = useState("");
  const [memberTierID, setMemberTierID] = useState<null | string>("");

  const {
    isOpen: isMemberOpen,
    onOpen: onMemberModalOpen,
    onClose: onMemberModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteMemberOpen,
    onOpen: onDeleteMemberOpen,
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
        accessor: "membershipName",
        width: "20%",
      },
      {
        Header: "Points To Tier",
        accessor: "requiredPoints",
        width: "40%",
      },
      {
        Header: "Image",
        accessor: "imageUrl",
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
          const onDelete = () => {
            onDeleteMemberOpen();
            setMemberTierID(row?.original?.id);
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

  const validationSchema = yup.object().shape({
    membershipName: yup.string().required("Membership Name is required"),
    imageUrl: yup.string().required("Image is required"),
    requiredPoints: yup.string().required("Point is required"),
  });
  const { handleSubmit, register, errors, reset } = useFormHook({
    validationSchema,
  });

  const onSubmitHandler = (data: any) => {
    console.log(data);
    // mutate(data);
    onMemberModalClose();
    reset();
  };

  //delete member tier
  const { mutateAsync: deleteMemberTier, isLoading: isDeleting } =
    useDeleteMemberTier();

  const onDelete = (id: string) => {
    deleteMemberTier({
      id: id,
    });
  };
  return (
    <>
      {/* <BreadCrumb name="Membership Tier" /> */}
      <DataTable
        data={paginatedData || []}
        loading={tableDataFetching}
        columns={columns}
        CurrentText="Member List"
        btnText="Add Membership Tier"
        onAction={() => {
          onMemberModalClose();
          onMemberModalOpen();
        }}
      >
        <CreateMemberForm register={register} error={errors} />
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
        submitHandler={handleSubmit(onSubmitHandler)}
        title="Add Membership Tier"
      >
        <CreateMemberForm register={register} errors={errors} />
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isLoading={isDeleting}
        isModalOpen={isDeleteMemberOpen}
        onCloseModal={onDeleteMemberClose}
        resetButtonText={"No"}
        submitButtonText={"Yes"}
        handleSubmit={() => onDelete(memberTierID ?? "")}
      >
        Are you sure you want to delete the Member Tier ?
      </ModalForm>
    </>
  );
};
export default MemberList;
