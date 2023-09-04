import { Stack, useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/organisms/modal";
import DataTable, { Pagination } from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import { useEffect, useMemo, useState } from "react";
import { CellProps } from "react-table";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";
import { CreatePropertyForm } from "@src/components/templates/form/master-data/property-form";
import { useMutation, useQueryClient } from "react-query";
import {
  createProperty,
  updateProperty,
  useDeleteProperty,
} from "@src/service/master-data/property";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";

const defaultValues = {
  name: "",
  code: "",
  phoneNumber: "",
  contactPerson: "",
  contactPersonPhoneNo: "",
};
const PropertyList = ({
  data: tableData,
  isLoading: tableDataFetching,
}: any) => {
  const [updateId, setUpdateId] = useState("");
  const [propertyID, setPropertyID] = useState<null | string>("");
  const [isUpdate, setIsUpdate] = useState(false);

  const {
    isOpen: isPropertyOpen,
    onOpen: onPropertyModalOpen,
    onClose: onPropertyModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeletePropertyOpen,
    onOpen: onDeletePropertyOpen,
    onClose: onDeletePropertyClose,
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
        Header: "Property Name",
        accessor: "name",
        width: "20%",
      },
      {
        Header: "Property Code",
        accessor: "code",
        width: "20%",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
        width: "20%",
      },
      {
        Header: "Contact person",
        accessor: "contactPerson",
        width: "20%",
      },
      {
        Header: "Action",
        width: "10%",

        Cell: ({ row }: CellProps<{ id: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original?.id);
            setIsUpdate(true);
            onPropertyModalOpen();
          };
          const onDelete = () => {
            onDeletePropertyOpen();
            setPropertyID(row?.original?.id);
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
    name: yup.string().required("Property Name is required"),
    code: yup.string().required("Property Code is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    contactPerson: yup.string().required("Contact Person Name is required"),
    contactPersonPhoneNo: yup
      .string()
      .required("Contact Person Phone Number is required"),
  });
  const { handleSubmit, register, errors, reset } = useFormHook({
    validationSchema,
    defaultValues,
  });

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: any) => x.id === updateId);
      reset({
        name: data?.name,
        code: data?.code,
        phoneNumber: data?.phoneNumber,
        contactPerson: data?.contactPerson,
        contactPersonPhoneNo: data?.contactPersonPhoneNo,
      });
    }
  }, [isUpdate, updateId]);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createProperty, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message);
      queryClient.refetchQueries("property");
      onPropertyModalClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });

  const { mutate: update, isLoading: isUpdating } = useMutation(
    updateProperty,
    {
      onSuccess: (response) => {
        toastSuccess(response?.data?.message || "Property Updated!!");
        queryClient.invalidateQueries("property");
        onPropertyModalClose();
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toastFail(error?.response?.data?.message || "Something went wrong");
      },
    }
  );
  //handle form submit

  const onSubmitHandler = (data: any) => {
    if (updateId) {
      update({
        id: updateId,
        data: {
          ...data,
          id: updateId,
        },
      });
    } else {
      mutate(data);
    }
  };

  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onPropertyModalClose();
  };

  //delete property Id
  const { mutateAsync: deletePropertyTier, isLoading: isDeleting } =
    useDeleteProperty();

  const onDelete = async (id: string) => {
    const result = await deletePropertyTier({
      id: id,
    });
    result.status === 200 && onDeletePropertyClose();
  };

  return (
    <>
      <DataTable
        data={paginatedData || []}
        loading={tableDataFetching}
        columns={columns}
        title="Filter By"
        btnText="Add Property"
        CurrentText="Property List"
        onAction={() => {
          onCloseHandler();
          onPropertyModalOpen();
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
        isModalOpen={isPropertyOpen}
        title={isUpdate ? "Update Property" : "Add Property"}
        onCloseModal={onPropertyModalClose}
        resetButtonText={"Cancel"}
        isLoading={isLoading || isUpdating}
        submitButtonText={isUpdate ? "Update Property" : "Add Property"}
        submitHandler={handleSubmit(onSubmitHandler)}
        showFooter={true}
      >
        <CreatePropertyForm register={register} errors={errors} />
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isModalOpen={isDeletePropertyOpen}
        onCloseModal={onDeletePropertyClose}
        resetButtonText={"No"}
        isLoading={isDeleting}
        submitButtonText={"Yes"}
        handleSubmit={() => onDelete(propertyID ?? "")}
        showFooter={true}
      >
        Are you sure you want to delete the Property detail?
      </ModalForm>
    </>
  );
};
export default PropertyList;
