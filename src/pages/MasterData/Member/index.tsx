import { useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import ModalForm from "@src/components/molecules/modal";
import TableHeadings from "@src/components/molecules/table-heading";
import DeleteContent from "@src/components/organisms/delete-content";
import { MemberPreview } from "@src/components/templates/admin/master-data/member-tier/member-privew";
import { CreateMemberForm } from "@src/components/templates/admin/master-data/member-tier/member-tier-add";
import MemberList from "@src/components/templates/admin/master-data/member-tier/member-tier-list";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import {
  getAllMemberTier,
  useDeleteMemberTier,
} from "@src/service/master-data/member-tier";
import { useState } from "react";

const MemberPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [viewId, setViewId] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, isLoading } = usePageinationHook({
    key: "member_tier",
    url: getAllMemberTier,
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
  const {
    isOpen: isDeleteMemberTierOpen,
    onOpen: onDeleteMemberTierOpen,
    onClose: onDeleteMemberTierClose,
  } = useDisclosure();
  const onCloseHandler = () => {
    setUpdateId("");
    setIsUpdate(false);
    onMemberModalClose();
  };
  const {
    isOpen: isViewMemberTierOpen,
    onOpen: onViewMemberTierOpen,
    onClose: onViewMemberTierClose,
  } = useDisclosure();

  const { mutateAsync: deleteMemberTier, isLoading: isDeleting } =
    useDeleteMemberTier();

  const onDeleteMemberTier = async (id: string) => {
    const result = await deleteMemberTier({
      id: id,
    });
    result.status === 200 && onDeleteMemberTierClose();
  };

  return (
    <>
      <BreadCrumb name="Master Data" subname="Membership Tier" />
      <Content>
        <TableHeadings
          onSearch={(e: any) => handleSearch(e)}
          btnText="Add Member Tier"
          CurrentText="Member Tier List"
          onAction={() => {
            onCloseHandler();
            onMemberModalOpen();
          }}
        />
        <MemberList
          setIsUpdate={setIsUpdate}
          setUpdateId={setUpdateId}
          onMemberModalOpen={onMemberModalOpen}
          onCloseHandler={onCloseHandler}
          data={data}
          isLoading={isLoading}
          onDeleteMemberTierOpen={onDeleteMemberTierOpen}
          onDeleteMemberTier={onDeleteMemberTier}
          setDeleteId={setDeleteId}
          setViewId={setViewId}
          onViewMemberTierOpen={onViewMemberTierOpen}
        />
        <ModalForm
          isModalOpen={isMemberOpen}
          onCloseModal={onMemberModalClose}
          title={isUpdate ? "Update Member Tier" : "Add Member Tier"}
        >
          <CreateMemberForm
            isUpdate={isUpdate}
            updateId={updateId}
            tableData={data}
            setUpdateId={setUpdateId}
            setIsUpdate={setIsUpdate}
            onMemberModalClose={onMemberModalClose}
          />
        </ModalForm>
        <ModalForm
          isModalOpen={isDeleteMemberTierOpen}
          onCloseModal={onDeleteMemberTierClose}
          title={"Delete MemberTier"}
        >
          <DeleteContent
            handleSubmit={() => onDeleteMemberTier(deleteId)}
            title="MemberTier"
            isLoading={isDeleting}
            onCloseModal={onDeleteMemberTierClose}
          />
        </ModalForm>
        <ModalForm
          isModalOpen={isViewMemberTierOpen}
          onCloseModal={onViewMemberTierClose}
          title={" Member Tier"}
        >
          <MemberPreview
            onClose={onViewMemberTierClose}
            isViewOpen={isViewMemberTierOpen}
            viewId={viewId}
          />
        </ModalForm>
      </Content>
    </>
  );
};

export default MemberPage;
