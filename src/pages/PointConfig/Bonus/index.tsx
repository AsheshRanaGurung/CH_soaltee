import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { getAllBonus, useDeleteBonus } from "@src/service/point-config/bonus";
import BonusList from "@src/components/templates/admin/pointConfiguration/bonus/bonus-list";
import { useState } from "react";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/molecules/modal";
import { AddBonus } from "@src/components/templates/admin/pointConfiguration/bonus/bonus-add";
import DeleteContent from "@src/components/organisms/delete-content";

const BonusPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const { data, isLoading } = usePageinationHook({
    key: "bonus",
    url: getAllBonus,
  });
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
  // const { data, isLoading } = useQuery("bonus", getAllBonus, {
  //   select: ({ data }) => data.datalist,
  // });

  return (
    <>
      <BreadCrumb name="Point Configuration" subname="Bonus" />
      <Content>
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
