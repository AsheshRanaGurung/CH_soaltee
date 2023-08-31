import { Stack, useDisclosure } from "@chakra-ui/react";
import ModalForm from "@soaltee-loyalty/components/organisms/modal";
import DataTable, {
  Pagination,
} from "@soaltee-loyalty/components/organisms/table";
import TableActions from "@soaltee-loyalty/components/organisms/table/TableActions";
import { getPaginatedData } from "@soaltee-loyalty/components/organisms/table/pagination";
import { useEffect, useMemo, useState } from "react";
import { CellProps } from "react-table";
import { useFormHook } from "@soaltee-loyalty/hooks/useFormhook";
import * as yup from "yup";
import { CreateMemberManagementForm } from "../form/member-management";
import Switch from "@soaltee-loyalty/components/atoms/Switch";
import { useMutation, useQueryClient } from "react-query";
import {
  toastFail,
  toastSuccess,
} from "@soaltee-loyalty/service/service-toast";
import { AxiosError } from "axios";
import { NAVIGATION_ROUTES } from "@soaltee-loyalty/routes/routes.constant";
import { useNavigate } from "react-router";
import {
  createMember,
  updateMember,
} from "@soaltee-loyalty/service/member-management";
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
  //   const [memberID, setMemberId] = useState("");
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
        accessor: "contactPerson",
        width: "10%",
      },
      {
        Header: "Is Active?",
        accessor: "isActive",
        width: "10%",
        Cell: ({ row }: CellProps<{ isActive: boolean }>) => {
          const status = row?.original?.isActive;
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
    phoneNumber: yup.string().required("Phone Number is required"),
    nationality: yup.string().required("Nationality is required"),
    propertyName: yup.string().required("Property Name is required"),
  });
  const { handleSubmit, register, errors, reset } = useFormHook({
    validationSchema,
    defaultValues,
  });
  //handle form submit
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
        isActive: data.isActive,
      });
    }
  }, [isUpdate, updateId]);
  const onCloseHandler = () => {
    onMemberModalClose();
    reset(defaultValues);
    setUpdateID("");
    setIsUpdate(false);
  };
  const onSubmitHandler = async (data: any) => {
    //there is no api for update adjust later
    if (updateId) {
      update({
        id: updateId,
        data: {
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          nationality: data.nationality,
          isActive: data.isActive,
          referalCode: "234",
        },
      });
    } else {
      mutate({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        nationality: data.nationality,
        isActive: data.isActive,
        referalCode: "234",
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
      >
        <CreateMemberManagementForm register={register} errors={errors} />
      </ModalForm>
    </>
  );
};
export default MemberManagementList;
