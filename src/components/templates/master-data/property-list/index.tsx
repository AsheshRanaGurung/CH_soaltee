import { Stack, useDisclosure } from "@chakra-ui/react";
import ModalForm from "@soaltee-loyalty/components/organisms/modal";
import DataTable, {
  Pagination,
} from "@soaltee-loyalty/components/organisms/table";
import TableActions from "@soaltee-loyalty/components/organisms/table/TableActions";
import { getPaginatedData } from "@soaltee-loyalty/components/organisms/table/pagination";
import { useGetProducts } from "@soaltee-loyalty/service/service-list";
import { useMemo, useState } from "react";
import { CellProps } from "react-table";
import { useFormHook } from "@soaltee-loyalty/hooks/useFormhook";
import * as yup from "yup";
import { CreatePropertyForm } from "../../form/master-data/property-form";

const PropertyList = () => {
  const { data: tableData, isFetching: tableDataFetching } = useGetProducts();
  const [, setUpdateId] = useState("");

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
        accessor: "price",
        width: "20%",
      },
      {
        Header: "Property Code",
        accessor: "category",
        width: "20%",
      },
      {
        Header: "Phone Number",
        accessor: "rating.count",
        width: "20%",
      },
      {
        Header: "Contact person",
        accessor: "rating.rate",
        width: "20%",
      },
      {
        Header: "Action",
        width: "10%",

        Cell: ({ row }: CellProps<{ id: string; name: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original?.id);
            // setIsUpdate(true);
            onPropertyModalOpen();
          };
          const onDelete = () => {
            onDeletePropertyOpen();
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
  });
  // const { mutate } = useMutation(signUpApi, {
  //   onSuccess: () => {
  //     console.log("This is success");
  //   },
  //   onError: () => {
  //     console.error("This is error");
  //   },
  // });
  //handle form submit

  const onSubmitHandler = (data: any) => {
    console.log(data);
    // mutate(data);
    onPropertyModalClose();
    reset();
  };
  // console.log(errors.code?.message);

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
          onPropertyModalClose();
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
        title="Add Property"
        onCloseModal={onPropertyModalClose}
        resetButtonText={"Cancel"}
        submitButtonText={"Add Property"}
        submitHandler={handleSubmit(onSubmitHandler)}
      >
        <CreatePropertyForm register={register} errors={errors} />
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isModalOpen={isDeletePropertyOpen}
        onCloseModal={onDeletePropertyClose}
        resetButtonText={"No"}
        submitButtonText={"Yes"}
      >
        Are you sure you want to delete the Property detail?
      </ModalForm>
    </>
  );
};
export default PropertyList;
