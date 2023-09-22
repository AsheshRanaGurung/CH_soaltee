import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { getAllMembers } from "@src/service/member-management";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import MemberManagementList from "@src/components/templates/admin/member-management/member-list";
import ModalForm from "@src/components/molecules/modal";
import { CreateMemberManagementForm } from "@src/components/templates/admin/member-management/member-add";
import TableHeadings from "@src/components/molecules/table-heading";

const MemberManagementPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [keyword, setKeyword] = useState("");
  const { data, isLoading } = usePageinationHook({
    key: "member_management",
    url: getAllMembers,
    extraParams: { name: keyword },
  });
  const handleSearch = (e: any) => {
    setKeyword(e);
  };

  const {
    isOpen: isMemberOpen,
    onOpen: onMemberModalOpen,
    onClose: onMemberModalClose,
  } = useDisclosure();

  const onCloseHandler = () => {
    setUpdateId("");
    setIsUpdate(false);
    onMemberModalClose();
  };

  return (
    <>
      <BreadCrumb name="Member Management" />

      <Content>
        <TableHeadings
          onSearch={(e: any) => handleSearch(e)}
          btnText="Add Member"
          CurrentText="Member List"
          onAction={() => {
            onCloseHandler();
            onMemberModalOpen();
          }}
        />
        <MemberManagementList
          setIsUpdate={setIsUpdate}
          setUpdateId={setUpdateId}
          onMemberModalOpen={onMemberModalOpen}
          onCloseHandler={onCloseHandler}
          data={data}
          isLoading={isLoading}
        />
        <ModalForm
          isModalOpen={isMemberOpen}
          onCloseModal={onMemberModalClose}
          title={isUpdate ? "Update Member" : "Add Member"}
        >
          <CreateMemberManagementForm
            isUpdate={isUpdate}
            updateId={updateId}
            tableData={data}
            setUpdateId={setUpdateId}
            setIsUpdate={setIsUpdate}
            onModalClose={onMemberModalClose}
            roleId="2"
            querykey="member_management"
          />
        </ModalForm>
      </Content>
    </>
  );
};

export default MemberManagementPage;
