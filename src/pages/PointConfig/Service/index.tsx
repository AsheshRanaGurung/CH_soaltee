import { useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import ModalForm from "@src/components/molecules/modal";
import TableHeadings from "@src/components/molecules/table-heading";
import DeleteContent from "@src/components/organisms/delete-content";
import { CreateServiceForm } from "@src/components/templates/admin/point-configuration/services/service-add";
import ServiceList from "@src/components/templates/admin/point-configuration/services/service-list";

import { usePageinationHook } from "@src/hooks/usePaginationHook";
import {
  getAllService,
  useDeleteService,
} from "@src/service/point-config/service";
import { useState } from "react";

const ServicePage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, isLoading } = usePageinationHook({
    key: "service",
    url: getAllService,
    extraParams: { name: keyword },
  });
  const handleSearch = (e: any) => {
    setKeyword(e);
  };
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

  const onCloseHandler = () => {
    setUpdateId("");
    setIsUpdate(false);
    onServiceModalClose();
  };
  const { mutateAsync: deleteService, isLoading: isDeleting } =
    useDeleteService();

  const onDeleteService = async (id: string) => {
    const result = await deleteService({
      id: id,
    });
    result.status === 200 && onDeleteServiceClose();
  };

  return (
    <>
      <BreadCrumb name="Point Configuration" subname="Service" />
      <Content>
        <TableHeadings
          onSearch={(e: any) => handleSearch(e)}
          btnText="Add Service"
          CurrentText="Service List"
          onAction={() => {
            onCloseHandler();
            onServiceModalOpen();
          }}
        />
        <ServiceList
          setIsUpdate={setIsUpdate}
          setUpdateId={setUpdateId}
          onServiceModalOpen={onServiceModalOpen}
          onCloseHandler={onCloseHandler}
          data={data}
          isLoading={isLoading}
          onDeleteServiceOpen={onDeleteServiceOpen}
          onDeleteService={onDeleteService}
          setDeleteId={setDeleteId}
        />
        <ModalForm
          isModalOpen={isServiceOpen}
          onCloseModal={onServiceModalClose}
          title={isUpdate ? "Update Service" : "Add Service"}
        >
          <CreateServiceForm
            isUpdate={isUpdate}
            updateId={updateId}
            tableData={data}
            setUpdateId={setUpdateId}
            setIsUpdate={setIsUpdate}
            onServiceModalClose={onServiceModalClose}
          />
        </ModalForm>
        <ModalForm
          isModalOpen={isDeleteServiceOpen}
          onCloseModal={onDeleteServiceClose}
          title={"Delete Service"}
        >
          <DeleteContent
            handleSubmit={() => onDeleteService(deleteId)}
            title="Service"
            isLoading={isDeleting}
            onCloseModal={onDeleteServiceClose}
          />
        </ModalForm>
      </Content>
    </>
  );
};

export default ServicePage;
