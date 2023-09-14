import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/organisms/modal";
import { useEffect, useState } from "react";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";
import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import { IParams } from "@src/interface/params";
import { Pagination } from "@src/components/organisms/table";
import { IMember } from "@src/interface/member-management";
import MemberTable from "../member-table";
import { CreateMemberManagementForm } from "../member-add";
import { usePropertyList } from "@src/constant/usePropertyList";
import { useMutation, useQueryClient } from "react-query";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { createMember } from "@src/service/member-management";
import { AxiosError } from "axios";

interface IMemberProps {
  tableData: IMember[];
  tableDataFetching: boolean;
  _pageSizeChange: (limit: number) => void;
  _pageChange: (page: number) => void;
  paginatedData: IMember[];
  pageParams: IParams;
}

const defaultValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  nationalityId: "",
  dateOfBirth: "",
  isActive: false,
};
const validationSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().required("Email is required"),
  phoneNumber: createPhoneNumberSchema(),
  nationalityId: yup.string().required("Nationality is required"),
  propertyId: yup.string().required("Property Name is required"),
  dateOfBirth: yup.string().required("DOB is required"),
});

const MemberManagementList: React.FC<IMemberProps> = ({
  tableData,
  tableDataFetching,
  _pageSizeChange,
  _pageChange,
  paginatedData,
  pageParams,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const propertyList = usePropertyList();
  const {
    isOpen: isMemberOpen,
    onOpen: onMemberModalOpen,
    onClose: onMemberModalClose,
  } = useDisclosure();

  const { handleSubmit, register, errors, reset, setValue } = useFormHook({
    validationSchema,
    defaultValues,
  });

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: IMember) => x.id === updateId);
      reset({
        ...data,
      });
    }
  }, [isUpdate, updateId, tableData]);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createMember, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      queryClient.refetchQueries("member_management");
      onCloseHandler();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });

  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onMemberModalClose();
  };

  const onSubmitHandler = async (data: IMember) => {
    if (updateId) {
      mutate({
        id: updateId,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        nationalityId: data.nationalityId,
        propertyId: data?.propertyId,
        isBlocked: data.isBlocked,
        roleId: "2",
      });
    } else {
      mutate({
        id: "0",
        fullName: data.fullName,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,
        nationalityId: data.nationalityId,
        propertyId: data.propertyId,
        roleId: "2",
      });
    }
  };

  return (
    <>
      <MemberTable
        tableDataFetching={tableDataFetching}
        paginatedData={paginatedData}
        pageParams={pageParams}
        title="Filter By"
        btnText="Add Member"
        CurrentText="Member List"
        onAction={() => {
          onCloseHandler();
          onMemberModalOpen();
        }}
        onEditData={(id: string) => {
          setUpdateId(id);
          setIsUpdate(true);
          onMemberModalOpen();
        }}
      />

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
        title={isUpdate ? "Update Member" : "Add Member"}
        onCloseModal={onMemberModalClose}
        resetButtonText={"Cancel"}
        isLoading={isLoading}
        submitButtonText={isUpdate ? "Update Member" : "Add Member"}
        submitHandler={handleSubmit(onSubmitHandler)}
        showFooter={true}
      >
        <CreateMemberManagementForm
          register={register}
          errors={errors}
          propertyList={propertyList}
          setValue={setValue}
          id={updateId}
        />
      </ModalForm>
    </>
  );
};
export default MemberManagementList;
