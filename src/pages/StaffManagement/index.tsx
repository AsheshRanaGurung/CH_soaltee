import { useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import ModalForm from "@src/components/molecules/modal";
import { CreateStaffManagementForm } from "@src/components/templates/admin/staff-management/staff-add";
import StaffManagementList from "@src/components/templates/admin/staff-management/staff-list";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { getAllStaff } from "@src/service/staff-management";
import { useState } from "react";

const StaffManagementPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const { data, isLoading } = usePageinationHook({
    key: "staff_management",
    url: getAllStaff,
  });
  const {
    isOpen: isStaffManagementOpen,
    onOpen: onStaffManagementModalOpen,
    onClose: onStaffManagementModalClose,
  } = useDisclosure();

  const onCloseHandler = () => {
    setUpdateId("");
    setIsUpdate(false);
    onStaffManagementModalClose();
  };
  // const { data, isLoading } = useQuery("staff_management", getAllStaff, {
  //   select: ({ data }) => data.datalist,
  // });

  return (
    <>
      <BreadCrumb name="Staff Management" />
      <Content>
        <StaffManagementList
          setIsUpdate={setIsUpdate}
          setUpdateId={setUpdateId}
          onStaffManagementModalOpen={onStaffManagementModalOpen}
          onCloseHandler={onCloseHandler}
          data={data}
          isLoading={isLoading}
        />
        <ModalForm
          isModalOpen={isStaffManagementOpen}
          onCloseModal={onStaffManagementModalClose}
          title={isUpdate ? "Update Staff" : "Add Staff"}
        >
          <CreateStaffManagementForm
            isUpdate={isUpdate}
            updateId={updateId}
            tableData={data}
            setUpdateId={setUpdateId}
            setIsUpdate={setIsUpdate}
            onStaffManagementModalClose={onStaffManagementModalClose}
          />
        </ModalForm>
      </Content>
    </>
  );
};

export default StaffManagementPage;
