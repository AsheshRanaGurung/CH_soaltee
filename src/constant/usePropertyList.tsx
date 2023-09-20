import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { getAllProperty } from "@src/service/master-data/property";

export const usePropertyList = () => {
  const { data } = usePageinationHook({
    key: "property",
    url: getAllProperty,
  });

  return data?.data;
};
