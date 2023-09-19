import { usePageParams } from "@src/components/organisms/layout";
import { useQuery } from "react-query";

export const usePageinationHook = ({ url, key }: any) => {
  const { pageParams } = usePageParams();
  const { data, isLoading } = useQuery([key, { ...pageParams }], url, {
    enabled: true,
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    retry: 0,
    select: ({ data }: any) => {
      return {
        data: data.data,
        totalPages: data.totalPages,
      };
    },
  });
  return {
    data,
    isLoading,
  };
};
