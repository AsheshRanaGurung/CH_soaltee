import { Stack, useDisclosure } from "@chakra-ui/react";
// import { ProductForm } from "@src/components/templates/form";
import ModalForm from "@src/components/organisms/modal";
import DataTable, { Pagination } from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import { useEffect, useMemo, useState } from "react";
import { CellProps } from "react-table";
import { CreateMemberForm } from "../../form/master-data/member-form";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";
import {
  createMemberTier,
  updateMemberTier,
  useDeleteMemberTier,
} from "@src/service/master-data/member-tier";
import { useMutation, useQueryClient } from "react-query";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";

const defaultValues = {
  membershipName: "",
  requiredPoints: "",
  imageUrl: "",
};
const MemberList = ({ data: tableData, isLoading: tableDataFetching }: any) => {
  const [updateId, setUpdateId] = useState("");
  const [memberTierID, setMemberTierID] = useState<null | string>("");
  const [isUpdate, setIsUpdate] = useState(false);

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
        Cell: ({ value }: any) => {
          return <img src={value} alt="Image" width="100" />;
        },
      },

      {
        Header: "Action",
        Cell: ({ row }: CellProps<{ id: string; name: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original?.id);
            setIsUpdate(true);
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
    requiredPoints: yup.string().required("Point is required"),
  });
  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: any) => x.id === updateId);
      reset({
        membershipName: data?.membershipName,
        requiredPoints: data?.requiredPoints,
        image: data?.imageUrl,
      });
    }
  }, [isUpdate, updateId]);
  const { handleSubmit, register, errors, reset, setValue } = useFormHook({
    validationSchema,
    defaultValues,
  });
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createMemberTier, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message);
      queryClient.refetchQueries("member_tier");
      onMemberModalClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  const { mutate: update, isLoading: isUpdating } = useMutation(
    updateMemberTier,
    {
      onSuccess: (response) => {
        toastSuccess(response?.data?.message || "Property Updated!!");
        queryClient.invalidateQueries("member_tier");
        onMemberModalClose();
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toastFail(error?.response?.data?.message || "Something went wrong");
      },
    }
  );

  const onSubmitHandler = (data: any) => {
    const formData = new FormData();
    const dat = {
      membershipName: data.membershipName,
      requiredPoints: data.requiredPoints,
    };

    formData.append("data", JSON.stringify(dat));
    if (updateId) {
      formData.append("image", data.image);
      update({ id: updateId, data: formData });
    } else {
      formData.append("image", data.image);
      mutate(formData);
    }
  };

  //delete member tier
  const { mutateAsync: deleteMemberTier, isLoading: isDeleting } =
    useDeleteMemberTier();
  const onCloseHandler = () => {
    setUpdateId("");
    setIsUpdate(false);
    onMemberModalClose();
    reset(defaultValues);
  };
  const onDelete = async (id: string) => {
    const result = await deleteMemberTier({
      id: id,
    });
    result.status === 200 && onDeleteMemberClose();
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
          onCloseHandler();
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
        isLoading={isLoading || isUpdating}
        onCloseModal={onMemberModalClose}
        resetButtonText={"Cancel"}
        submitButtonText={isUpdate ? "Update Member Tier" : "Add Member Tier"}
        submitHandler={handleSubmit(onSubmitHandler)}
        showFooter={true}
        title={isUpdate ? "Update Member Tier" : "Add Member Tier"}
      >
        <CreateMemberForm
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isLoading={isDeleting}
        isModalOpen={isDeleteMemberOpen}
        onCloseModal={onDeleteMemberClose}
        resetButtonText={"No"}
        submitButtonText={"Yes"}
        handleSubmit={() => onDelete(memberTierID ?? "")}
        showFooter={true}
      >
        Are you sure you want to delete the Member Tier ?
      </ModalForm>
    </>
  );
};
export default MemberList;
