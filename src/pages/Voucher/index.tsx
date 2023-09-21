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
const VoucherPage = () => {
  // const { data, isLoading } = useQuery("voucher", getAllVoucher, {
  //   select: ({ data }) => data.datalist,
  // });
  const [viewId, setViewId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const { data, isLoading } = usePageinationHook({
    key: "voucher",
    url: getAllVoucher,
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
  return (
    <>
      <BreadCrumb name="Voucher & Promocode" />
      <Content>
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
