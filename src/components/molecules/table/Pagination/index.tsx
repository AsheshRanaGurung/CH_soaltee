import { useRenderPageButtons } from "../Count";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { colors } from "@src/theme/colors";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import { usePageParams } from "@src/components/organisms/layout";

const Pagination = ({ table, totalPages }: any) => {
  const { pageButtons } = useRenderPageButtons({
    table: table,
    totalPages: totalPages,
  });
  const { pageParams, setPageParams } = usePageParams();
  const handlePrevPage = () => {
    table.setPageIndex(0);
    setPageParams({
      ...pageParams,
      page: 1,
    });
  };
  const handleNextPage = () => {
    table.setPageIndex(totalPages - 1);
    setPageParams({
      ...pageParams,
      page: totalPages,
    });
  };
  const handleNextPageChange = () => {
    table.setPageIndex(pageParams.page + 1);
    setPageParams({
      ...pageParams,
      page: pageParams.page + 1,
    });
  };
  const handlePreviousPageChange = () => {
    table.setPageIndex(pageParams.page - 1);
    setPageParams({
      ...pageParams,
      page: pageParams.page - 1,
    });
  };
  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Text>Show</Text>
          <Box padding={"8px 15px"} borderRadius={"5px"} background={"white"}>
            <select
              style={{
                padding: "5px 15px",
                borderRadius: "5px",
                background: "white",
                border: "solid 1px #ccc",
              }}
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
                setPageParams({
                  ...pageParams,
                  limit: Number(e.target.value),
                });
              }}
            >
              {[10, 20, 30].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </Box>
        </Box>
        <HStack>
          <IconButton
            aria-label="Previous"
            size="sm"
            color={colors.black}
            borderRadius={"29px"}
            height="25px"
            width="25px"
            variant="unstyled"
            fontSize="14px"
            fontWeight="medium"
            isDisabled={pageParams?.page === 1}
            onClick={handlePrevPage}
            icon={<AiOutlineDoubleLeft />}
          />

          <IconButton
            aria-label="Previous"
            size="sm"
            color={colors.black}
            borderRadius={"29px"}
            height="25px"
            width="25px"
            variant="unstyled"
            fontSize="14px"
            fontWeight="medium"
            isDisabled={pageParams?.page === 1}
            onClick={handlePreviousPageChange}
            icon={<ChevronLeftIcon />}
          />
          <Box
            borderColor={colors.primary}
            borderRadius="50px 50px 50px 50px"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {pageButtons}
          </Box>
          <IconButton
            aria-label="Next"
            size="sm"
            variant="unstyled"
            fontSize="14px"
            fontWeight="medium"
            borderRadius={"29px"}
            height="25px"
            width="25px"
            onClick={handleNextPageChange}
            isDisabled={pageParams?.page === totalPages}
            icon={<ChevronRightIcon />}
          />
          <IconButton
            aria-label="Next"
            size="sm"
            variant="unstyled"
            fontSize="14px"
            fontWeight="medium"
            borderRadius={"29px"}
            height="25px"
            width="25px"
            onClick={handleNextPage}
            isDisabled={pageParams?.page === totalPages}
            icon={<AiOutlineDoubleRight />}
          />
        </HStack>
      </Box>
    </>
  );
};

export default Pagination;
