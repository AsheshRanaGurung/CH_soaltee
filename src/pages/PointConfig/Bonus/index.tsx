import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { getAllBonus, useDeleteBonus } from "@src/service/point-config/bonus";
import { useState } from "react";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/molecules/modal";
import DeleteContent from "@src/components/organisms/delete-content";
import TableHeadings from "@src/components/molecules/table-heading";
import BonusList from "@src/components/templates/admin/point-configuration/bonus/bonus-list";
import { AddBonus } from "@src/components/templates/admin/point-configuration/bonus/bonus-add";

const BonusPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, isLoading } = usePageinationHook({
    key: "bonus",
    url: getAllBonus,
    extraParams: { name: keyword },
  });
  const handleSearch = (e: any) => {
    setKeyword(e);
  };
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
  const onCloseHandler = () => {
    setUpdateId("");
    setIsUpdate(false);
    onBonusModalClose();
  };
  const { mutateAsync: deleteBonus, isLoading: isDeleting } = useDeleteBonus();

  const onDeleteBonus = async (id: string) => {
    const result = await deleteBonus({
      id: id,
    });
    result.status === 200 && onDeleteBonusClose();
  };

  return (
    <>
      <BreadCrumb name="Point Configuration" subname="Bonus" />
      <Content>
        <TableHeadings
          onSearch={(e: any) => handleSearch(e)}
          btnText="Add Bonus"
          CurrentText="Bonus List"
          onAction={() => {
            onCloseHandler();
            onBonusModalOpen();
          }}
        />
        <BonusList
          setIsUpdate={setIsUpdate}
          setUpdateId={setUpdateId}
          onBonusModalOpen={onBonusModalOpen}
          onCloseHandler={onCloseHandler}
          data={data}
          isLoading={isLoading}
          onDeleteBonusOpen={onDeleteBonusOpen}
          onDeleteBonus={onDeleteBonus}
          setDeleteId={setDeleteId}
        />
        <ModalForm
          isModalOpen={isBonusOpen}
          onCloseModal={onBonusModalClose}
          title={isUpdate ? "Update Bonus" : "Add Bonus"}
        >
          <AddBonus
            isUpdate={isUpdate}
            updateId={updateId}
            tableData={data}
            setUpdateId={setUpdateId}
            setIsUpdate={setIsUpdate}
            onBonusModalClose={onBonusModalClose}
          />
        </ModalForm>
        <ModalForm
          isModalOpen={isDeleteBonusOpen}
          onCloseModal={onDeleteBonusClose}
          title={"Delete Bonus"}
        >
          <DeleteContent
            handleSubmit={() => onDeleteBonus(deleteId)}
            title="Bonus"
            isLoading={isDeleting}
            onCloseModal={onDeleteBonusClose}
          />
        </ModalForm>
      </Content>
    </>
  );
};

export default BonusPage;
