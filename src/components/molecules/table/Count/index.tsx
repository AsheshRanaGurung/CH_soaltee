import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { usePageParams } from "@src/components/organisms/layout";
import { colors } from "@src/theme/colors";

export const useRenderPageButtons = ({ table, totalPages }: any) => {
  const pageButtons = [];
  let ellipsisStart = false;
  let ellipsisEnd = false;
  const { pageParams, setPageParams } = usePageParams();
  const handlePageChange = (i: any) => {
    table.setPageIndex(i - 1);
    setPageParams({
      ...pageParams,
      page: i,
    });
  };

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= pageParams?.page - 1 && i <= pageParams?.page + 1)
    ) {
      pageButtons.push(
        <Button
          type="submit"
          key={i}
          mr={2}
          sx={{
            border:
              pageParams?.page === i
                ? `2px solid ${colors.primary}`
                : colors.gray,
            background: "transparent",
            borderRadius: "50%",
            w: "25px",
            h: "25px",
            transition: "all 300ms ease-in-out",
            textAlign: "center",
            lineHeight: "40px",
            mr: 0,
            color: pageParams?.page === i ? colors.primary : "#000",
          }}
          padding={0}
          minWidth={"unset"}
          fontSize="15px"
          fontFamily="'Urbanist', sans-serif"
          color={"black"}
          cursor="pointer"
          onClick={() => {
            handlePageChange(i);
          }}
        >
          {i}
        </Button>
      );
    } else if (i < pageParams?.page - 1 && !ellipsisStart) {
      ellipsisStart = true;
      pageButtons.push(
        <Text key="ellipsisStart" color="gray.500">
          ...
        </Text>
      );
    } else if (i > pageParams?.page + 1 && !ellipsisEnd) {
      ellipsisEnd = true;
      pageButtons.push(
        <Text key="ellipsisEnd" color="gray.500">
          ...
        </Text>
      );
    }
  }
  return { pageButtons };
};
