import { useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import ModalForm from "@src/components/molecules/modal";
import TableHeadings from "@src/components/molecules/table-heading";
import { CreateMemberManagementForm } from "@src/components/templates/admin/member-management/member-add";
import StaffManagementList from "@src/components/templates/admin/staff-management/staff-list";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { getAllStaff } from "@src/service/staff-management";
import { useState } from "react";

const StaffManagementPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, isLoading } = usePageinationHook({
    key: "staff_management",
    url: getAllStaff,
    extraParams: { name: keyword },
  });

  const handleSearch = (e: any) => {
    setKeyword(e);
  };

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

  return (
    <>
      <BreadCrumb name="Staff Management" />
      <Content>
        <TableHeadings
          onSearch={(e: any) => handleSearch(e)}
          btnText="Add Staff"
          CurrentText="Staff List"
          onAction={() => {
            onCloseHandler();
            onStaffManagementModalOpen();
          }}
        />

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
          <CreateMemberManagementForm
            isUpdate={isUpdate}
            updateId={updateId}
            tableData={data}
            setUpdateId={setUpdateId}
            setIsUpdate={setIsUpdate}
            onModalClose={onStaffManagementModalClose}
            roleId="3"
            querykey="staff_management"
          />
        </ModalForm>
      </Content>
    </>
  );
};

export default StaffManagementPage;
