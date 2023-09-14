import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/organisms/modal";
import { Pagination } from "@src/components/organisms/table";
import { useEffect, useState } from "react";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";

import { useDeleteBonus } from "@src/service/point-config/bonus";
import { AddBonus } from "../bonus-add";
import { IBonus } from "@src/interface/pointConfig";
import { IParams } from "@src/interface/params";
import { useServiceList } from "@src/constant/useServiceList";
import BonusTable from "../bonus-table";
interface IBonusProps {
  tableData: IBonus[];
  tableDataFetching: boolean;
  _pageSizeChange: (limit: number) => void;
  _pageChange: (page: number) => void;
  paginatedData: IBonus[];
  pageParams: IParams;
}
const defaultValues = {
  bonusName: "",
  bonusValue: "",
  validFrom: new Date().toLocaleDateString(),
  validTo: new Date().toLocaleDateString(),
  serviceId: "",
};

const validationSchema = yup.object().shape({
  bonusName: yup.string().required("Bonus Name is required"),
  validFrom: yup.string().required("valid from date is required"),
  validTo: yup.string().required("valid to date is required"),
  bonusValue: yup.string().required("bonus value is required"),
});

const BonusList: React.FC<IBonusProps> = ({
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
    isOpen: isBonusOpen,
    onOpen: onBonusModalOpen,
    onClose: onBonusModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteBonusOpen,
    onOpen: onDeleteBonusOpen,
    onClose: onDeleteBonusClose,
  } = useDisclosure();

  const { handleSubmit, reset, register, errors, setValue } = useFormHook({
    validationSchema,
    defaultValues,
  });

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: IBonus) => x.id === updateId);
      reset({
        bonusName: data?.bonusName,
        validFrom: data?.validFrom,
        validTo: data?.validTo,
        bonusValue: data?.bonusValue,
        serviceId: data?.serviceId,
      });
    }
  }, [isUpdate, updateId]);

  const serviceList = useServiceList();

  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onBonusModalClose();
  };

  const { mutateAsync: deleteBonus, isLoading: isDeleting } = useDeleteBonus();

  const onDelete = async (id: string) => {
    const result = await deleteBonus({
      id: id,
    });
    result.status === 200 && onDeleteBonusClose();
  };

  return (
    <>
      <BonusTable
        paginatedData={paginatedData}
        pageParams={pageParams}
        tableDataFetching={tableDataFetching}
        title="Filter By"
        btnText="Add Bonus"
        CurrentText="Bonus List"
        onAction={() => {
          onCloseHandler();
          onBonusModalOpen();
        }}
        onEditData={(id: string) => {
          setUpdateId(id);
          setIsUpdate(true);
          onBonusModalOpen();
        }}
        onDeleteData={(id: string) => {
          setDeleteId(id);
          onDeleteBonusOpen();
        }}
      />

      <ModalForm
        isModalOpen={isBonusOpen}
        onCloseModal={onBonusModalClose}
        resetButtonText={"Cancel"}
        submitButtonText={isUpdate ? "Update Bonus" : "Add Bonus"}
        showFooter={false}
        title={isUpdate ? "Update Bonus" : "Add Bonus"}
      >
        <AddBonus
          register={register}
          errors={errors}
          setValue={setValue}
          setUpdateId={setUpdateId}
          handleSubmit={handleSubmit}
          onCloseModal={onBonusModalClose}
          ServiceAll={serviceList}
          updateId={updateId}
        />
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isModalOpen={isDeleteBonusOpen}
        onCloseModal={onDeleteBonusClose}
        resetButtonText={"No"}
        isLoading={isDeleting}
        submitButtonText={"Yes"}
        handleSubmit={() => onDelete(deleteId ?? "")}
        showFooter={true}
      >
        Are you sure you want to delete the Bonus detail?
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
export default BonusList;
