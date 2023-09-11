import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/organisms/modal";
import { useEffect, useState } from "react";
import { CreateMemberForm } from "../member-tier-add";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";
import {
  useCreateMemberTier,
  useDeleteMemberTier,
  useUpdateMemberTier,
} from "@src/service/master-data/member-tier";
import MemberTierTable from "../member-tier-table";
import { IMemberTierDetail } from "@src/interface/master-data/property";
import { IParams } from "@src/interface/params";
import { Pagination } from "@src/components/organisms/table";
interface IMemberTier {
  tableData: IMemberTierDetail[];
  tableDataFetching: boolean;
  _pageSizeChange: (limit: number) => void;
  _pageChange: (page: number) => void;
  paginatedData: IMemberTierDetail[];
  pageParams: IParams;
}

const defaultValues = {
  membershipName: "",
  requiredPoints: "",
  image: "",
};

const validationSchema = yup.object().shape({
  membershipName: yup.string().required("Membership Name is required"),
  requiredPoints: yup.string().required("Point is required"),
});

const MemberList: React.FC<IMemberTier> = ({
  tableData,
  tableDataFetching,
  _pageSizeChange,
  _pageChange,
  paginatedData,
  pageParams,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
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

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: IMemberTierDetail) => x.id === updateId);
      reset({
        membershipName: data?.membershipName,
        requiredPoints: data?.requiredPoints,
      });
    }
  }, [isUpdate, updateId]);

  const { handleSubmit, register, errors, reset, setValue } = useFormHook({
    validationSchema,
  });

  const { mutateAsync: mutate, isLoading } = useCreateMemberTier();
  const { mutateAsync: deleteMemberTier, isLoading: isDeleting } =
    useDeleteMemberTier();
  const onDelete = async (id: string) => {
    const result = await deleteMemberTier({
      id: id,
    });
    result.status === 200 && onDeleteMemberClose();
  };
  const { mutateAsync: update, isLoading: isUpdating } = useUpdateMemberTier();

  const onCloseHandler = () => {
    reset(defaultValues);
    setDeleteId("");
    setUpdateId("");
    setIsUpdate(false);
    onMemberModalClose();
  };

  const onSubmitHandler = async (data: IMemberTierDetail) => {
    const formData = new FormData();
    const dat = {
      membershipName: data.membershipName,
      requiredPoints: data.requiredPoints,
    };
    formData.append("data", JSON.stringify(dat));
    if (updateId) {
      if (data.image) {
        formData.append("image", data.image as Blob);
        const result = await update({ id: updateId, data: formData });
        result.status === 200 && onCloseHandler();
      } else {
        formData.append("image", "");
        const result = await update({ id: updateId, data: formData });
        result.status === 200 && onCloseHandler();
      }
    } else {
      formData.append("image", data.image as Blob);
      const result = await mutate(formData);
      result.status === 200 && onCloseHandler();
    }
    reset();
  };

  return (
    <>
      <MemberTierTable
        paginatedData={paginatedData}
        pageParams={pageParams}
        tableDataFetching={tableDataFetching}
        title="Filter By"
        btnText="Add Member Tier"
        CurrentText="Member Tier List"
        onAction={() => {
          onCloseHandler();
          onMemberModalOpen();
        }}
        onEditData={(id: string) => {
          setUpdateId(id);
          setIsUpdate(true);
          onMemberModalOpen();
        }}
        onDeleteData={(id: string) => {
          setDeleteId(id);
          onDeleteMemberOpen();
        }}
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
          id={updateId}
        />
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isLoading={isDeleting}
        isModalOpen={isDeleteMemberOpen}
        onCloseModal={onDeleteMemberClose}
        resetButtonText={"No"}
        submitButtonText={"Yes"}
        handleSubmit={() => onDelete(deleteId)}
        showFooter={true}
      >
        Are you sure you want to delete the Member Tier ?
      </ModalForm>
      <Pagination
        enabled={true}
        queryPageIndex={pageParams.page}
        queryPageSize={pageParams.limit}
        totalCount={tableData?.length || 0}
        pageChange={_pageChange}
        pageSizeChange={_pageSizeChange}
      />
    </>
  );
};
export default MemberList;
