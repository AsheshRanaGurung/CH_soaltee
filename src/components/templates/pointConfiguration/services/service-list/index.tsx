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
import { CreateServiceForm } from "../service-add";
import { useMutation, useQueryClient } from "react-query";
import {
  toastFail,
  toastSuccess,
} from "@soaltee-loyalty/service/service-toast";
import {
  createServiceApi,
  updateService,
  useDeleteService,
} from "@soaltee-loyalty/service/point-config";
import { AxiosError } from "axios";
import styled from "styled-components";
import { colors } from "@soaltee-loyalty/theme/colors";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12%;
  text-align: center;
  position: relative;
  div {
    position: relative;
    flex: 0 0 20%;
    &::after {
      content: "";
      position: absolute;
      border-right: 1px solid #ccc;
      height: 100%;
      top: 0;
      right: -30px;
    }
  }
  .title {
    font-size: 14px;
    color: ${colors.primary};
    font-weight: 500;
  }
  .percent {
    font-size: 14px;
    color: ${colors.secondary_black};
    font-weight: 500;
    margin-top: 5px;
  }
  &::before {
    content: "";
    position: absolute;
    border-right: 1px solid #ccc;
    height: 100%;
    top: 0;
    left: 0;
  }
`;

const defaultValues = {
  serviceName: "",
  serviceCode: "",
  membershipServiceResponseDtos: [],
};

const ServiceList = ({
  data: tableData,
  isLoading: tableDataFetching,
}: any) => {
  const [updateId, setUpdateId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [serviceID, setServiceID] = useState<null | string>("");
  const {
    isOpen: isServiceOpen,
    onOpen: onServiceModalOpen,
    onClose: onServiceModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteServiceOpen,
    onOpen: onDeleteServiceOpen,
    onClose: onDeleteServiceClose,
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
        Header: "Service",
        accessor: "serviceName",
        width: "20%",
      },
      {
        Header: "Code",
        accessor: "serviceCode",
        width: "10%",
      },
      {
        Header: "Member",
        accessor: "membershipServiceResponseDtos",
        width: "30%",
        textAlign: "center",
        Cell: ({ row }: any) => {
          return (
            <Wrapper>
              {row?.original?.membershipServiceResponseDtos?.map(
                (itmm: any, index: number) => (
                  <div key={index}>
                    <h1 className="title">{itmm.membershipTierName}</h1>
                    <h1 className="percent">{itmm.rewardPercentage}</h1>
                  </div>
                )
              )}
            </Wrapper>
          );
        },
      },
      {
        Header: "Action",
        width: "10%",

        Cell: ({ row }: CellProps<{ id: string; name: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original?.id);
            setIsUpdate(true);
            onServiceModalOpen();
          };
          const onDelete = () => {
            onDeleteServiceOpen();
            setServiceID(row?.original?.id);
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions onEdit={onEdit} onDelete={onDelete} />
            </Stack>
          );
        },
      },
    ],
    [pageParams]
  );
  const validationSchema = yup.object().shape({
    serviceName: yup.string().required("serviceName is required"),
    serviceCode: yup.string().required("serviceCode is required"),
  });
  const [formDataArray, setFormDataArray] = useState([]);
  const { handleSubmit, register, errors, reset, watch, setValue } =
    useFormHook({
      validationSchema,
      defaultValues,
    });
  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: any) => x.id === updateId);
      reset({
        id: data?.id,
        serviceName: data?.serviceName,
        serviceCode: data?.serviceCode,
        membershipServiceResponseDtos: data?.membershipServiceResponseDtos,
      });
    }
  }, [isUpdate, updateId]);

  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onServiceModalClose();
  };
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createServiceApi, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      queryClient.refetchQueries("service");
      onServiceModalClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  const { mutate: update, isLoading: isUpdating } = useMutation(updateService, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      queryClient.refetchQueries("service");
      onServiceModalClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  const onSubmitHandler = (data: any) => {
    if (updateId) {
      update({
        id: updateId,
        data: {
          id: data.id,
          serviceCode: data.serviceCode,
          serviceName: data.serviceName,
          membershipServiceRequestDto: formDataArray,
        },
      });
    } else {
      mutate({
        id: data.id,
        serviceCode: data.serviceCode,
        serviceName: data.serviceName,
        membershipServiceRequestDto: formDataArray,
      });
    }
  };

  const { mutateAsync: deleteService, isLoading: isDeleting } =
    useDeleteService();

  const onDelete = async (id: string) => {
    const result = await deleteService({
      id: id,
    });
    result.status === 200 && onDeleteServiceClose();
  };

  return (
    <>
      <DataTable
        data={paginatedData || []}
        loading={tableDataFetching}
        columns={columns}
        title="Filter By"
        btnText="Add Service"
        CurrentText="Point Table"
        onAction={() => {
          onCloseHandler();
          onServiceModalOpen();
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
        isModalOpen={isServiceOpen}
        title={isUpdate ? "Update Service" : "Add Service"}
        onCloseModal={onServiceModalClose}
        isLoading={isLoading || isUpdating}
        resetButtonText={"Cancel"}
        submitButtonText={isUpdate ? "Update Service" : "Add Service"}
        submitHandler={handleSubmit(onSubmitHandler)}
      >
        <CreateServiceForm
          register={register}
          errors={errors}
          formDataArray={formDataArray}
          setFormDataArray={setFormDataArray}
          setValue={setValue}
          watch={watch}
        />
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isModalOpen={isDeleteServiceOpen}
        onCloseModal={onDeleteServiceClose}
        resetButtonText={"No"}
        isLoading={isDeleting}
        submitButtonText={"Yes"}
        handleSubmit={() => onDelete(serviceID ?? "")}
      >
        Are you sure you want to delete the Service detail?
      </ModalForm>
    </>
  );
};
export default ServiceList;
