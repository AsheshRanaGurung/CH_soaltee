import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { getAllVoucher, useDeleteVoucher } from "@src/service/voucher";
import VoucherList from "@src/components/templates/admin/voucher/voucher-list";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/molecules/modal";
import DeleteContent from "@src/components/organisms/delete-content";
import { useState } from "react";
import { VoucherViewPage } from "@src/components/templates/admin/voucher/voucher-page";
import TableHeadings from "@src/components/molecules/table-heading";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useNavigate } from "react-router-dom";
const VoucherPage = () => {
  const navigate = useNavigate();
  const [viewId, setViewId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, isLoading } = usePageinationHook({
    key: "voucher",
    url: getAllVoucher,
    extraParams: { name: keyword },
  });
  const {
    isOpen: isDeleteVoucherOpen,
    onOpen: onDeleteVoucherOpen,
    onClose: onDeleteVoucherClose,
  } = useDisclosure();
  const {
    isOpen: isViewVoucherOpen,
    onOpen: onViewVoucherOpen,
    onClose: onViewVoucherClose,
  } = useDisclosure();

  const { mutateAsync: deleteVoucher, isLoading: isDeleting } =
    useDeleteVoucher();

  const onDeleteVoucher = async (id: string) => {
    const result = await deleteVoucher({
      id: id,
    });
    result.status === 200 && onDeleteVoucherClose();
  };
  const onCloseHandler = () => {
    setDeleteId("");
  };
  const handleSearch = (e: any) => {
    setKeyword(e);
  };
  return (
    <>
      <BreadCrumb name="Voucher & Promocode" />
      <Content>
        <TableHeadings
          onSearch={(e: any) => handleSearch(e)}
          btnText="Add Voucher"
          CurrentText="Voucher List"
          onAction={() => {
            onCloseHandler();
            navigate(NAVIGATION_ROUTES.VOUCHER_ADD);
          }}
        />
        <VoucherList
          tableData={data}
          tableDataFetching={isLoading}
          onDeleteVoucherOpen={onDeleteVoucherOpen}
          onDeleteVoucher={onDeleteVoucher}
          setDeleteId={setDeleteId}
          setViewId={setViewId}
          onViewVoucherOpen={onViewVoucherOpen}
        />
        <ModalForm
          isModalOpen={isDeleteVoucherOpen}
          onCloseModal={onDeleteVoucherClose}
          title={"Delete Voucher"}
        >
          <DeleteContent
            handleSubmit={() => onDeleteVoucher(deleteId)}
            title="Voucher"
            isLoading={isDeleting}
            onCloseModal={onDeleteVoucherClose}
          />
        </ModalForm>
        <ModalForm
          isModalOpen={isViewVoucherOpen}
          onCloseModal={onViewVoucherClose}
          title={" Voucher & Promo code"}
        >
          <VoucherViewPage
            onClose={onViewVoucherClose}
            isOpen={isViewVoucherOpen}
            viewId={viewId}
          />
        </ModalForm>
      </Content>
    </>
  );
};

export default VoucherPage;
