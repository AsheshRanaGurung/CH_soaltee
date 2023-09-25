import { useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import ModalForm from "@src/components/molecules/modal";
import TableHeadings from "@src/components/molecules/table-heading";
import DeleteContent from "@src/components/organisms/delete-content";
import { CreateOfferForm } from "@src/components/templates/admin/offer/offer-add";
import OfferList from "@src/components/templates/admin/offer/offer-list";
import { OfferViewPage } from "@src/components/templates/admin/offer/offer-Page";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { getAllOffer, useDeleteOffer } from "@src/service/offer";
import { useState } from "react";

const OfferPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [viewId, setViewId] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, isLoading } = usePageinationHook({
    key: "offer",
    url: getAllOffer,
    extraParams: { name: keyword },
  });
  const {
    isOpen: isOfferOpen,
    onOpen: onOfferModalOpen,
    onClose: onOfferModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOfferOpen,
    onOpen: onDeleteOfferOpen,
    onClose: onDeleteOfferClose,
  } = useDisclosure();

  const {
    isOpen: isViewOfferOpen,
    onOpen: onViewOfferOpen,
    onClose: onViewOfferClose,
  } = useDisclosure();

  const onCloseHandler = () => {
    setUpdateId("");
    setIsUpdate(false);
    onOfferModalClose();
  };
  const { mutateAsync: deleteOffer, isLoading: isDeleting } = useDeleteOffer();

  const onDeleteOffer = async (id: string) => {
    const result = await deleteOffer({
      id: id,
    });
    result.status === 200 && onDeleteOfferClose();
  };
  const handleSearch = (e: any) => {
    setKeyword(e);
  };

  return (
    <>
      <BreadCrumb name="Offers" />
      <Content>
        <TableHeadings
          onSearch={(e: any) => handleSearch(e)}
          btnText="Add Offer"
          CurrentText="Offer List"
          onAction={() => {
            onCloseHandler();
            onOfferModalOpen();
          }}
        />
        <OfferList
          setIsUpdate={setIsUpdate}
          setUpdateId={setUpdateId}
          onOfferModalOpen={onOfferModalOpen}
          onViewOfferOpen={onViewOfferOpen}
          setViewId={setViewId}
          onCloseHandler={onCloseHandler}
          data={data}
          isLoading={isLoading}
          onDeleteOfferOpen={onDeleteOfferOpen}
          onDeleteOffer={onDeleteOffer}
          setDeleteId={setDeleteId}
        />
        <ModalForm
          isModalOpen={isOfferOpen}
          onCloseModal={onOfferModalClose}
          title={isUpdate ? "Update Offer" : "Add Offer"}
        >
          <CreateOfferForm
            isUpdate={isUpdate}
            updateId={updateId}
            tableData={data}
            setUpdateId={setUpdateId}
            setIsUpdate={setIsUpdate}
            onOfferModalClose={onOfferModalClose}
          />
        </ModalForm>
        <ModalForm
          isModalOpen={isViewOfferOpen}
          onCloseModal={onViewOfferClose}
          title={"Offer"}
        >
          <OfferViewPage
            onClose={onViewOfferClose}
            isOpen={isViewOfferOpen}
            viewId={viewId}
          />
        </ModalForm>
        <ModalForm
          isModalOpen={isDeleteOfferOpen}
          onCloseModal={onDeleteOfferClose}
          title={"Delete Offer"}
        >
          <DeleteContent
            handleSubmit={() => onDeleteOffer(deleteId)}
            title="Offer"
            isLoading={isDeleting}
            onCloseModal={onDeleteOfferClose}
          />
        </ModalForm>
      </Content>
    </>
  );
};

export default OfferPage;
