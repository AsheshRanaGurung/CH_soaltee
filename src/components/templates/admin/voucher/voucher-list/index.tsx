import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/organisms/modal";
import { useState } from "react";
import { useFormHook } from "@src/hooks/useFormhook";
import { IVoucher } from "@src/interface/voucher";
import { useDeleteVoucher } from "@src/service/voucher";
import VoucherTable from "../voucher-table";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useNavigate } from "react-router-dom";
interface IVoucherList {
  tableData: IVoucher[];
  tableDataFetching: boolean;
}

const defaultValues = {
  voucherName: "",
  service: "",
  discountPercentage: "",
  maximumAmounts: "",
  maximumLimits: "",
  description: "",
  voucherImage: "",
};

const VoucherList: React.FC<IVoucherList> = ({
  tableData,
  tableDataFetching,
}) => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState("");

  const {
    isOpen: isDeleteMemberOpen,
    onOpen: onDeleteMemberOpen,
    onClose: onDeleteMemberClose,
  } = useDisclosure();

  const { reset } = useFormHook({});

  const { mutateAsync: deleteVoucher, isLoading: isDeleting } =
    useDeleteVoucher();
  const onDelete = async (id: string) => {
    const result = await deleteVoucher({
      id: id,
    });
    result.status === 200 && onDeleteMemberClose();
  };

  const onCloseHandler = () => {
    reset(defaultValues);
    setDeleteId("");
  };

  return (
    <>
      <VoucherTable
        tableData={tableData}
        tableDataFetching={tableDataFetching}
        title="Filter By"
        btnText="Add Voucher"
        CurrentText="Voucher List"
        onAction={() => {
          onCloseHandler();

          navigate(NAVIGATION_ROUTES.VOUCHER_ADD);
        }}
        onDeleteData={(id: string) => {
          setDeleteId(id);
          onDeleteMemberOpen();
        }}
      />

      <ModalForm
        title={"Delete"}
        isLoading={isDeleting}
        isModalOpen={isDeleteMemberOpen}
        onCloseModal={onDeleteMemberClose}
        resetButtonText={"No"}
        submitButtonText={"Yes"}
        handleSubmit={() => onDelete(deleteId)}
        showFooter={true}
      >
        Are you sure you want to delete the Voucher ?
      </ModalForm>
    </>
  );
};
export default VoucherList;
