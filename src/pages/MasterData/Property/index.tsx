import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/molecules/modal";
import { getAllProperty } from "@src/service/master-data/property";
import { CreatePropertyForm } from "@src/components/templates/admin/master-data/property/property-add";
import PropertyList from "@src/components/templates/admin/master-data/property/property-list";

import TableHeadings from "@src/components/molecules/table-heading";

const PropertyPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, isLoading } = usePageinationHook({
    key: "property",
    url: getAllProperty,
    extraParams: { name: keyword },
  });

  const handleSearch = (e: any) => {
    setKeyword(e);
  };

  const {
    isOpen: isPropertyOpen,
    onOpen: onPropertyModalOpen,
    onClose: onPropertyModalClose,
  } = useDisclosure();

  const onCloseHandler = () => {
    setUpdateId("");
    setIsUpdate(false);
    onPropertyModalClose();
  };

  return (
    <>
      <BreadCrumb name="Property" />
      <Content>
        <TableHeadings
          onSearch={(e: any) => handleSearch(e)}
          btnText="Add Property"
          CurrentText="Property List"
          onAction={() => {
            onCloseHandler();
            onPropertyModalOpen();
          }}
        />
        <PropertyList
          setIsUpdate={setIsUpdate}
          setUpdateId={setUpdateId}
          onPropertyModalOpen={onPropertyModalOpen}
          onCloseHandler={onCloseHandler}
          data={data}
          isLoading={isLoading}
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
      </Content>
    </>
  );
};

export default PropertyPage;
