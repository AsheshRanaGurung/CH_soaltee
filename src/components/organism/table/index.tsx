import React, { Fragment, ReactElement, ReactNode, useState } from "react";
import {
  useExpanded,
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  Row,
} from "react-table";

import {
  Box,
  Button,
  CSSObject,
  Flex,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Progress,
  TableRowProps,
} from "@chakra-ui/react";

import { colors } from "@soaltee-loyalty/theme/colors";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
// import { AiOutlineDoubleLeft } from "react-icons";

import { Search } from "@soaltee-loyalty/components/molecules/search";
import { DrawerComponent } from "@soaltee-loyalty/components/organisms/drawer";
export function getPager(
  totalRows: number,
  _: number,
  pageLimit: number
): Array<number> {
  if (totalRows <= pageLimit) return [1];
  const totalPages = Math.ceil(totalRows / pageLimit);
  const totalPageArray = Array.from(Array(totalPages), (_, i) => i + 1);
  return totalPageArray;
}

const styleTableWithRightBorder = {
  "& th": {
    boxShadow: "none",
    color: colors.primary,
    paddingY: 4,
    paddingX: 2,
    textTransform: "capitalize",
  },
  "& tr": {
    "&:nth-of-type(even)": {
      backgroundColor: colors.gray,
    },
  },
  "& td": {
    border: 0,
    color: colors.black,
    boxShadow: "none",
    paddingY: 2,
    paddingX: 3,
  },
};

const styleTableWithButtom = {
  "& th": {
    boxShadow: "none",
    paddingY: 3,
    paddingX: 2,
  },
  "& td": {
    boxShadow: "none",
    borderButtomWidth: 1,
    borderButtomStyle: "solid",
    borderButtomColor: "gray.100",
    paddingY: 3,
    paddingX: 2,
  },
};
interface IDataTable {
  columns: any;
  // columns: Column<Record<any, any>>[];
  data: Record<string, any>[];
  // Element to show on expanded
  expandedView?: ReactNode;
  // Should expand all rows
  isAllExpanded?: boolean;
  // Element to show on hover
  hoverView?: ReactElement;
  height?: string;
  width?: string;
  loading?: boolean;
  searchText?: string;
  sortBy?: (sortField: string, sort_order: "asc" | "des") => void;
  sorted?: { sort_by: string; sort_order: "asc" | "des" | string };
  isClientPagination?: boolean;

  paginationProps?: {
    queryPageIndex: number;
    queryPageSize: number;
    totalCount: number;
    pageChange: (queryPageIndex: number) => void;
    pageSizeChange: (queryPageSize: number) => void;
  };
  disableOverflow?: boolean;
  containerStyles?: CSSObject;
  //if table header needs a background color
  headerBackgroundColor?: string;
  //if we need a table with borderbuttom & no rightside border
  rowBottomBorder?: boolean;
  // if we need to add button to the table
  btnText?: string;
  optionGroup?: ReactElement;
  CurrentText?: string;
  onAction?: () => void;
  // if we need to disable the button according to permission
  onDisableButton?: boolean;

  //search
  setSearchValue?: (searchValue: string) => void;

  //for drawer
  title: string;
  children: React.ReactNode;
}

/**
 * General datatable component
 * @param props IDataTable
 * @returns JSX Table Element
 */

const DataTable = React.memo(
  ({
    columns,
    data,
    loading,
    hoverView,
    height,
    isClientPagination,
    containerStyles,
    headerBackgroundColor = colors.secondary,
    btnText,
    optionGroup,
    CurrentText,
    onAction,
    rowBottomBorder,
    onDisableButton,
    title,
    children,
    setSearchValue,
  }: IDataTable) => {
    const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      useExpanded,
      usePagination,
      useRowSelect
    );
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      page,
      prepareRow,
    } = tableInstance as unknown as any;

    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    return (
      <Box bgColor={colors.white} p={{ base: 0, md: 4 }} borderRadius={"8px"}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
          rowGap={2}
          ml={{ base: 2, md: 0 }}
        >
          <Flex alignItems="center" gap={3}>
            <Flex position="relative">
              <Search setSearchValue={setSearchValue} />
            </Flex>
            <DrawerComponent title={title}>{children}</DrawerComponent>
          </Flex>
          <Flex gap={2}>
            {optionGroup && <Box bgSize={"md"}>{optionGroup}</Box>}
            {CurrentText && (
              <Text background={"#E6F0FA"} p={3} borderRadius={"5px"}>
                {CurrentText}
              </Text>
            )}

            {btnText && (
              <Button
                variant={"primary"}
                size={"fit"}
                // leftIcon={<AddCircleIcon />}
                onClick={onAction}
                outline="none"
                border={"none"}
                height={{ base: 12, md: 13 }}
                disabled={onDisableButton}
                sx={{
                  "&::before": {
                    border: "none",
                  },
                  "&::after": {
                    border: "none",
                  },
                  "&:hover": {
                    "svg path": {
                      fill: colors.light_gray,
                    },
                  },
                }}
                padding={{ base: 2, md: 7 }}
                margin={{ base: 2, md: 0 }}
              >
                {btnText}
              </Button>
            )}
          </Flex>
        </Flex>

        <TableContainer
          height={height}
          // width={width}
          whiteSpace="unset"
          sx={containerStyles}
          overflowX="auto"
          mt={3}
          width={{ base: "100vw", md: "100%" }}
          // width="100vw"
        >
          {loading && (
            <Box w={"100%"}>
              <Progress size="xs" isIndeterminate />
            </Box>
          )}
          <Table
            {...getTableProps()}
            size="sm"
            sx={
              rowBottomBorder ? styleTableWithButtom : styleTableWithRightBorder
            }
          >
            <Thead
              background={headerBackgroundColor ? headerBackgroundColor : ""}
            >
              {headerGroups.map(
                (headergroup: {
                  getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                    Omit<
                      React.DetailedHTMLProps<
                        React.HTMLAttributes<HTMLTableRowElement>,
                        HTMLTableRowElement
                      >,
                      keyof TableRowProps
                    > & {
                      htmlTranslate?: "yes" | "no" | undefined;
                    } & TableRowProps & { as?: "tr" | undefined };
                  id: React.Key | null | undefined;
                  headers: any[];
                }) => {
                  return (
                    <Tr
                      {...headergroup.getHeaderGroupProps()}
                      key={headergroup.id}
                      whiteSpace="nowrap"
                    >
                      {headergroup.headers.map((column) => {
                        return (
                          <Th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            color={colors.primary}
                            key={column.id}
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <TriangleDownIcon />
                                ) : (
                                  <TriangleUpIcon />
                                )
                              ) : null}
                            </span>
                          </Th>
                        );
                      })}
                    </Tr>
                  );
                }
              )}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {(isClientPagination ? page : rows).map(
                (row: Row<Record<string, any>>) => {
                  prepareRow(row);
                  return (
                    <Fragment key={row.id}>
                      <Tr
                        {...row.getRowProps()}
                        onMouseEnter={() => {
                          hoverView && setHoveredRow(row.id);
                        }}
                        onMouseLeave={() => hoverView && setHoveredRow(null)}
                        bgColor={
                          hoverView && hoveredRow === row.id
                            ? "gray.100"
                            : "white"
                        }
                        position={
                          hoverView && hoveredRow === row.id
                            ? "relative"
                            : "static"
                        }
                      >
                        {row.cells.map((cell) => {
                          return (
                            <Td
                              {...cell.getCellProps()}
                              key={cell.getCellProps().key}
                              position="relative"
                              whiteSpace="nowrap"
                            >
                              {cell.render("Cell")}
                            </Td>
                          );
                        })}
                        {/* Show this view on hover */}
                        {hoverView && hoveredRow === row.id ? (
                          <Flex
                            height="80%"
                            position="absolute"
                            right="5rem"
                            top="50%"
                            transform="translateY(-50%)"
                            bgColor="gray.100"
                          >
                            {React.cloneElement(hoverView, {
                              rowData: { row },
                              onMouseEnter: () => {
                                setHoveredRow(row.id);
                              },
                            })}
                          </Flex>
                        ) : null}
                      </Tr>
                    </Fragment>
                  );
                }
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
);

interface PaginationProps {
  enabled: boolean;
  queryPageSize: number;
  pageSizeChange?: (size: number) => void;
  queryPageIndex: number;
  pageChange?: (page: number) => void;
  totalCount: number;
}

// interface Option {
//   value: number | null;
//   label: string;
//   disabled?: boolean;
// }
export const Pagination = ({
  enabled,
  queryPageSize,
  queryPageIndex,
  pageChange,
  totalCount,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / queryPageSize);
  // const startIndex = (queryPageIndex - 1) * queryPageSize;
  // const endIndex = Math.min(startIndex + queryPageSize, totalCount);
  const renderPageButtons = () => {
    const pageButtons = [];
    let ellipsisStart = false;
    let ellipsisEnd = false;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= queryPageIndex - 1 && i <= queryPageIndex + 1)
      ) {
        pageButtons.push(
          <Button
            type="submit"
            key={i}
            mr={2}
            sx={{
              border:
                queryPageIndex === i
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
              color: queryPageIndex === i ? colors.primary : "#000",
              // "&:hover": {
              //   bgColor: colors.gray,
              //   color: colors.white,
              // },
            }}
            padding={0}
            minWidth={"unset"}
            fontSize="15px"
            fontFamily="'Urbanist', sans-serif"
            cursor="pointer"
            onClick={() => {
              pageChange?.(i);
            }}
          >
            {i}
          </Button>
        );
      } else if (i < queryPageIndex - 1 && !ellipsisStart) {
        ellipsisStart = true;
        pageButtons.push(
          <Text key="ellipsisStart" color="gray.500">
            ...
          </Text>
        );
      } else if (i > queryPageIndex + 1 && !ellipsisEnd) {
        ellipsisEnd = true;
        pageButtons.push(
          <Text key="ellipsisEnd" color="gray.500">
            ...
          </Text>
        );
      }
    }

    return pageButtons;
  };
  // const options: Option[] = [
  //   { value: 10, label: "10" },
  //   { value: 20, label: "20" },
  //   { value: 30, label: "30" },
  //   { value: totalCount, label: "All" },
  // ];
  // const shouldShowAllOptions = totalCount > 30;
  // const filteredOptions: Option[] = shouldShowAllOptions
  //   ? options.slice(0, -1)
  //   : options.filter((item) => item.value && item.value <= totalCount);
  return enabled ? (
    <Box px={{ base: "4", md: "6" }} p="5" bg={colors.white} pt={8}>
      <HStack
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        gap={4}
      >
        {/* {totalCount >= 10 && (
          <Select
            value={filteredOptions.find((item) => item.value === queryPageSize)}
            // width="81px"
            // borderRadius="6px"
            // size="sm"
            isSearchable={false}
            onChange={(selectedOption) => {
              if (selectedOption?.value && pageSizeChange) {
                pageSizeChange(selectedOption?.value);
              }
            }}
            options={filteredOptions}
            placeholder="Select"
          />
        )} */}
        <HStack spacing={10}>
          {/* <Text fontSize="sm">
            Showing {startIndex + 1} to {endIndex} of {totalCount}
          </Text> */}
        </HStack>
        <HStack>
          {/* <AiOutlineDoubleLeft
            aria-label="Previous"
            size="sm"
            color={colors.black}
            height="25px"
            width="25px"
            variant="unstyled"
            fontSize="14px"
            fontWeight="medium"
            isDisabled={queryPageIndex < 2}
            onClick={() => {
              pageChange &&
                queryPageIndex > 1 &&
                pageChange(queryPageIndex - 1);
            }}
            icon={<ChevronLeftIcon />}
          /> */}
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
            isDisabled={queryPageIndex < 2}
            onClick={() => {
              pageChange &&
                queryPageIndex > 1 &&
                pageChange(queryPageIndex - 1);
            }}
            icon={<ChevronLeftIcon />}
          />
          <Box
            borderColor={colors.primary}
            borderRadius="50px 50px 50px 50px"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {renderPageButtons()}
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
            onClick={() => {
              pageChange &&
                queryPageIndex < totalPages &&
                pageChange(queryPageIndex + 1);
            }}
            isDisabled={queryPageIndex >= totalPages}
            icon={<ChevronRightIcon />}
          />
        </HStack>
      </HStack>
    </Box>
  ) : null;
};

export default DataTable;
DataTable.displayName = "DataTable";