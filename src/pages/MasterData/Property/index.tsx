import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/molecules/modal";
import {
  getAllProperty,
  useDeleteProperty,
} from "@src/service/master-data/property";
import { CreatePropertyForm } from "@src/components/templates/admin/master-data/property/property-add";
import PropertyList from "@src/components/templates/admin/master-data/property/property-list";
import DeleteContent from "@src/components/organisms/delete-content";

const PropertyPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const { data, isLoading } = usePageinationHook({
    key: "property",
    url: getAllProperty,
  });
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

  const onCloseHandler = () => {
    setUpdateId("");
    setIsUpdate(false);
    onPropertyModalClose();
  };
  const { mutateAsync: deleteProperty, isLoading: isDeleting } =
    useDeleteProperty();

  const onDeleteProperty = async (id: string) => {
    const result = await deleteProperty({
      id: id,
    });
    result.status === 200 && onDeletePropertyClose();
  };

  return (
    <>
      <BreadCrumb name="Property" />
      <Content>
        <PropertyList
          setIsUpdate={setIsUpdate}
          setUpdateId={setUpdateId}
          onPropertyModalOpen={onPropertyModalOpen}
          onCloseHandler={onCloseHandler}
          data={data}
          onDeletePropertyOpen={onDeletePropertyOpen}
          isLoading={isLoading}
          onDeleteProperty={onDeleteProperty}
          setDeleteId={setDeleteId}
        />
        <ModalForm
          isModalOpen={isPropertyOpen}
          onCloseModal={onPropertyModalClose}
          title={isUpdate ? "Update Property" : "Add Property"}
        >
          <CreatePropertyForm
            isUpdate={isUpdate}
            updateId={updateId}
            tableData={data?.data}
            setUpdateId={setUpdateId}
            setIsUpdate={setIsUpdate}
            onPropertyModalClose={onPropertyModalClose}
          />
        </ModalForm>
        <ModalForm
          isModalOpen={isDeletePropertyOpen}
          onCloseModal={onDeletePropertyClose}
          title={"Delete Property"}
        >
          <DeleteContent
            handleSubmit={() => onDeleteProperty(deleteId)}
            title="Property"
            isLoading={isDeleting}
            onCloseModal={onDeletePropertyClose}
          />
        </ModalForm>
      </Content>
    </>
  );
};

export default PropertyPage;
