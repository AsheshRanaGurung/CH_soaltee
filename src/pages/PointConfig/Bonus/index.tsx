import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { getAllBonus } from "@src/service/point-config/bonus";
import BonusList from "@src/components/templates/pointConfiguration/bonus/bonus-list";
import { useQuery } from "react-query";

const BonusPage = () => {
  const { data, isLoading } = useQuery("bonus", getAllBonus, {
    select: ({ data }) => data.datalist,
  });

  return (
    <>
      <BreadCrumb name="Point Configuration" />
      <Content>
        <BonusList data={data} isLoading={isLoading} />
      </Content>
    </>
  );
};

export default BonusPage;
