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
interface IMemberTier {
  tableData: IMemberTierDetail[];
  tableDataFetching: boolean;
}

const MemberList: React.FC<IMemberTier> = ({
  tableData,
  tableDataFetching,
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

  const validationSchema = yup.object().shape({
    membershipName: yup.string().required("Membership Name is required"),
    requiredPoints: yup.string().required("Point is required"),
  });

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: IMemberTierDetail) => x.id === updateId);
      reset({
        membershipName: data?.membershipName,
        requiredPoints: data?.requiredPoints,
        image: data?.imageUrl,
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
    setDeleteId("");
    setUpdateId("");
    setIsUpdate(false);
    onMemberModalClose();
  };

  const onSubmitHandler = (data: IMemberTierDetail) => {
    const formData = new FormData();
    const dat = {
      membershipName: data.membershipName,
      requiredPoints: data.requiredPoints,
    };
    formData.append("data", JSON.stringify(dat));
    if (updateId) {
      formData.append("image", data.image as Blob);
      update({ id: updateId, data: formData });
      onCloseHandler();
    } else {
      formData.append("image", data.image as Blob);
      mutate(formData);
      onCloseHandler();
    }
    reset();
  };

  return (
    <>
      <MemberTierTable
        tableData={tableData}
        tableDataFetching={tableDataFetching}
        title="Filter By"
        btnText="Add Property"
        CurrentText="Property List"
        onAction={() => {
          onCloseHandler();
          onMemberModalOpen();
        }}
        onMemberModalOpen={onMemberModalOpen}
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
        // disabled={isUpdate}
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
        handleSubmit={() => onDelete(deleteId)}
        showFooter={true}
      >
        Are you sure you want to delete the Member Tier ?
      </ModalForm>
    </>
  );
};
export default MemberList;
