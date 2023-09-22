import { getAllOfferId } from "@src/service/offer";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useOfferData = (id: any) => {
  const [data, setData] = useState([]);
  const { data: offerData } = useQuery("offer", getAllOfferId(id), {
    select: (data) => data?.data?.data[0],
  });

  useEffect(() => {
    setData(offerData);
  }, [offerData]);

  return data;
};
