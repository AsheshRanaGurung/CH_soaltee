import { getAllNationality } from "@src/service/image";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useNationalityList = () => {
  const [data, setData] = useState([]);
  const { data: nationalityData } = useQuery("nationality", getAllNationality, {
    select: ({ data }) => data?.datalist,
  });

  useEffect(() => {
    setData(nationalityData);
  }, [nationalityData]);

  return data;
};
