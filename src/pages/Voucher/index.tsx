import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { getAllVoucher } from "@src/service/voucher";
import { useQuery } from "react-query";
import VoucherList from "@src/components/templates/admin/voucher/voucher-list";
const VoucherPage = () => {
  const { data, isLoading } = useQuery("voucher", getAllVoucher, {
    select: ({ data }) => data.datalist,
  });
  return (
    <>
      <BreadCrumb name="Voucher & Promocode" />
      <Content>
        <VoucherList tableData={data} tableDataFetching={isLoading} />
      </Content>
    </>
  );
};

export default VoucherPage;
