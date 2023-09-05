import { Stack, useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/organisms/modal";
import DataTable, { Pagination } from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import { useEffect, useMemo, useState } from "react";
import { CellProps } from "react-table";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";
import { CreateMemberManagementForm } from "../../form/member-management";
import Switch from "@src/components/atoms/Switch";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useNavigate } from "react-router";
import { createMember, updateMember } from "@src/service/member-management";
import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import { IMember } from "@src/interface/member-management";
import { getAllProperty } from "@src/service/master-data/property";
const defaultValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  nationality: "",
  isActive: false,
  referalCode: "234",
};

const MemberManagementList = ({
  data: tableData,
  isLoading: tableDataFetching,
}: any) => {
  const navigate = useNavigate();
  const [updateId, setUpdateID] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const {
    isOpen: isMemberOpen,
    onOpen: onMemberModalOpen,
    onClose: onMemberModalClose,
  } = useDisclosure();

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
        width: "10%",
      },

      {
        Header: "Full Name",
        accessor: "fullName",
        width: "20%",
      },
      {
        Header: "Email",
        accessor: "email",
        width: "10%",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
        width: "20%",
      },
      {
        Header: "Nationality",
        accessor: "nationality",
        width: "10%",
      },
      {
        Header: "Tier",
        accessor: "membershipTierName",
        width: "10%",
      },
      {
        Header: "Is Blocked?",
        accessor: "isBlocked",
        width: "10%",
        Cell: ({ row }: CellProps<{ isBlocked: boolean }>) => {
          const status = row?.original?.isBlocked;
          return status === true ? (
            <Switch value={true} variant="red" />
          ) : (
            <Switch disabled />
          );
        },
      },
      {
        Header: "Action",
        width: "10%",

        Cell: ({ row }: CellProps<{ id: string }>) => {
          const onEdit = () => {
            setUpdateID(row.original?.id);
            setIsUpdate(true);
            onMemberModalOpen();
          };
          const onView = () => {
            navigate(NAVIGATION_ROUTES.PROFILE_DETAIL, {
              state: row.original,
            });
          };

          return (
            <Stack alignItems={"flex-start"}>
              <TableActions onEdit={onEdit} onView={onView} />
            </Stack>
          );
        },
      },
    ],
    [pageParams]
  );
  const validationSchema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().required("Email is required"),
    phoneNumber: createPhoneNumberSchema(),
    nationality: yup.string().required("Nationality is required"),
    propertyId: yup.string().required("Property Name is required"),
  });
  const { handleSubmit, register, errors, reset, watch } = useFormHook({
    validationSchema,
    defaultValues,
  });
  //handle form submit
  const { data: property } = useQuery("property", getAllProperty, {
    select: ({ data }) => data.data,
  });
  const propertyList = property?.map((item: any) => {
    return {
      label: item?.name,
      value: item?.id,
    };
  });
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createMember, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      queryClient.refetchQueries("member_management");
      onMemberModalClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });

  const { mutate: update, isLoading: isUpdating } = useMutation(updateMember, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Member Updated!!");
      queryClient.refetchQueries("member_management");
      onMemberModalClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: any) => x.id === updateId);
      reset({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        nationality: data.nationality,
        propertyId: data?.property?.id,
        isActive: data.isActive,
      });
    }
  }, [isUpdate, updateId, tableData]);
  const onCloseHandler = () => {
    onMemberModalClose();
    reset(defaultValues);
    setUpdateID("");
    setIsUpdate(false);
  };
  const onSubmitHandler = async (data: IMember) => {
    //there is no api for update adjust later
    if (updateId) {
      update({
        id: updateId,
        data: {
          id: updateId,
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          nationality: data.nationality,
          propertyId: data?.propertyId,
          isBlocked: data.isBlocked,
        },
      });
    } else {
      mutate({
        id: "",
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        nationality: data.nationality,
        propertyId: data.propertyId,
      });
    }
  };

  return (
    <>
      <DataTable
        data={paginatedData || []}
        loading={tableDataFetching}
        columns={columns}
        title="Filter By"
        btnText="Add User"
        CurrentText="Member List"
        onAction={() => {
          onCloseHandler();
          onMemberModalOpen();
        }}
      >
        {/* <ProductForm /> */}
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
        title={isUpdate ? "Update User" : "Add User"}
        isLoading={isLoading || isUpdating}
        onCloseModal={onMemberModalClose}
        resetButtonText={"Cancel"}
        submitButtonText={isUpdate ? "Update User" : "Create User"}
        submitHandler={handleSubmit(onSubmitHandler)}
        showFooter={true}
      >
        <CreateMemberManagementForm
          id={updateId}
          register={register}
          errors={errors}
          watch={watch}
          propertyList={propertyList}
        />
      </ModalForm>
    </>
  );
};
export default MemberManagementList;
