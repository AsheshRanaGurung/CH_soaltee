import { Stack, useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/organisms/modal";
import DataTable, { Pagination } from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
// import { useGetProducts } from "@src/service/service-list";
import { useEffect, useMemo, useState } from "react";
import { CellProps } from "react-table";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";

import { useDeleteBonus } from "@src/service/point-config/bonus";
import { AddBonus } from "../bonus-add";
import { useQuery } from "react-query";
import { getAllService } from "@src/service/point-config/service";

const defaultValues = {
  bonusName: "",
  bonusValue: "",
  validFrom: new Date().toLocaleDateString(),
  validTo: new Date().toLocaleDateString(),
};
const BonusList = ({ data: tableData, isLoading: tableDataFetching }: any) => {
  const [updateId, setUpdateId] = useState("");
  const [bonusID, setBonusID] = useState<null | string>("");
  const [isUpdate, setIsUpdate] = useState(false);
  const {
    isOpen: isBonusOpen,
    onOpen: onBonusModalOpen,
    onClose: onBonusModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteBonusOpen,
    onOpen: onDeleteBonusOpen,
    onClose: onDeleteBonusClose,
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
        Header: "Bonus Name",
        accessor: "bonusName",
        width: "20%",
      },
      {
        Header: "Valid from",
        accessor: "validFrom",
        width: "20%",
      },
      {
        Header: "Valid to",
        accessor: "validTo",
        width: "20%",
      },
      {
        Header: "Bonus Value",
        accessor: "bonusValue",
        width: "20%",
      },
      {
        Header: "Action",
        width: "10%",

        Cell: ({ row }: CellProps<{ id: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original?.id);
            setIsUpdate(true);
            onBonusModalOpen();
          };
          const onDelete = () => {
            onDeleteBonusOpen();
            setBonusID(row?.id);
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
    bonusName: yup.string().required("Bonus Name is required"),
    validFrom: yup.string().required("valid from date is required"),
    validTo: yup.string().required("valid to date is required"),
    bonusValue: yup.string().required("bonus value is required"),
  });
  const { handleSubmit, reset, register, errors, setValue } = useFormHook({
    validationSchema,
    defaultValues,
  });

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: any) => x.id === updateId);
      reset({
        bonusName: data?.bonusName,
        validFrom: data?.validFrom,
        validTo: data?.validTo,
        bonusValue: data?.bonusValue,
        serviceId: data?.serviceId,
      });
    }
  }, [isUpdate, updateId]);
  const { data } = useQuery("service", getAllService, {
    select: ({ data }) => data.datalist,
  });
  const ServiceAll = data?.map((el: any) => {
    return {
      value: el.id,
      label: el.serviceName,
    };
  });

  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onBonusModalClose();
  };

  // const queryClient = useQueryClient();

  // const { mutate: update, isLoading: isUpdating } = useMutation(updateBonus, {
  //   onSuccess: (response) => {
  //     toastSuccess(response?.data?.message || "Bonus Updated!!");
  //     queryClient.invalidateQueries("bonus");
  //     onBonusModalClose();
  //   },
  //   onError: (error: AxiosError<{ message: string }>) => {
  //     toastFail(error?.response?.data?.message || "Something went wrong");
  //   },
  // });
  //handle form submit

  // const onSubmitHandler = (data: any) => {
  //   if (updateId) {
  //     update({
  //       id: updateId,
  //       data: {
  //         ...data,
  //         id: updateId,
  //       },
  //     });
  //   } else {
  //     // mutate(data);
  //     console.log("qwq", data);
  //   }
  // };

  const { mutateAsync: deleteBonus, isLoading: isDeleting } = useDeleteBonus();

  const onDelete = async (id: string) => {
    const result = await deleteBonus({
      id: id,
    });
    result.status === 200 && onDeleteBonusClose();
  };

  return (
    <>
      <DataTable
        data={paginatedData || []}
        loading={tableDataFetching}
        columns={columns}
        title="Filter By"
        btnText="Add Bonus"
        CurrentText="Bonus List"
        onAction={() => {
          onCloseHandler();
          onBonusModalOpen();
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
        isModalOpen={isBonusOpen}
        title={isUpdate ? "Update Bonus" : "Add Bonus"}
        onCloseModal={onBonusModalClose}
        resetButtonText={"Cancel"}
        // isLoading={isLoading || isUpdating}
        submitButtonText={isUpdate ? "Update Bonus" : "Add Bonus"}
        showFooter={false}
      >
        <AddBonus
          register={register}
          errors={errors}
          setValue={setValue}
          setUpdateId={setUpdateId}
          handleSubmit={handleSubmit}
          onCloseModal={onBonusModalClose}
          ServiceAll={ServiceAll}
        />
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isModalOpen={isDeleteBonusOpen}
        onCloseModal={onDeleteBonusClose}
        resetButtonText={"No"}
        isLoading={isDeleting}
        submitButtonText={"Yes"}
        handleSubmit={() => onDelete(bonusID ?? "")}
        showFooter={true}
      >
        Are you sure you want to delete the Bonus detail?
      </ModalForm>
    </>
  );
};
export default BonusList;
