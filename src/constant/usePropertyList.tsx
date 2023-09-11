import { IProperty } from "@src/interface/master-data/property";
import { getAllProperty } from "@src/service/master-data/property";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const usePropertyList = () => {
  const [data, setData] = useState([]);
  const { data: propertyData } = useQuery("property", getAllProperty, {
    select: (data) => data?.data?.data?.content,
  });

  useEffect(() => {
    const propertyList =
      propertyData?.map((item: IProperty) => ({
        label: item?.name,
        value: item?.id,
      })) || [];
    setData(propertyList);
  }, [propertyData]);

  return data;
};
