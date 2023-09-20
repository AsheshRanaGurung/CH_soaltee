import { getAllPropertySelect } from "@src/service/master-data/property";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const usePropertyList = () => {
  const [data, setData] = useState([]);
  const { data: propertyData } = useQuery("property", getAllPropertySelect, {
    select: (data) => data?.data?.data?.content,
  });

  useEffect(() => {
    setData(propertyData);
  }, [propertyData]);

  return data;
};
