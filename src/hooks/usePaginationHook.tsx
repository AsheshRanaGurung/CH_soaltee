import { usePageParams } from "@src/components/organisms/layout";
import { useQuery } from "react-query";

export const usePageinationHook = ({ url, key, enabled, extraParams }: any) => {
  const { pageParams } = usePageParams();
  const { data, isLoading, refetch } = useQuery(
    [key, { ...pageParams, ...extraParams }],
    url,
    {
      enabled: enabled,
      keepPreviousData: false,
      retry: 0,
      select: ({ data }: any) => {
        return {
          data: data.data,
          totalPages: data.totalPages,
        };
      },
    }
  );
  return {
    data,
    isLoading,
    refetch,
  };
};
