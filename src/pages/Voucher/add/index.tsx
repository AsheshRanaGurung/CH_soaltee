import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { CreateVoucherForm } from "@src/components/templates/admin/voucher/voucher-add";
import { useCreateVoucher, useUpdateVoucher } from "@src/service/voucher";

const VoucherAdd = () => {
  const { mutateAsync: mutate, isLoading } = useCreateVoucher();
  const { mutateAsync: update, isLoading: isUpdating } = useUpdateVoucher();
  return (
    <>
      <BreadCrumb name="Voucher & Promocode / Add" />
      <Content>
        <CreateVoucherForm
          mutate={mutate}
          isLoading={isLoading}
          update={update}
          isUpdating={isUpdating}
        />
      </Content>
    </>
  );
};

export default VoucherAdd;
