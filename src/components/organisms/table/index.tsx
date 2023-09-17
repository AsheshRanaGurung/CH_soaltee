import React, {
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

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
  Select,
} from "@chakra-ui/react";

import { colors } from "@src/theme/colors";
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
// import { DrawerComponent } from "../drawer";
import { Search } from "@src/components/molecules/search";
import { TableHeading } from "@src/components/atoms/TableHeading";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import NoDataAvailable from "../nodata";

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
  data: Record<string, any>[];
  expandedView?: ReactNode;
  isAllExpanded?: boolean;
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
  headerBackgroundColor?: string;
  rowBottomBorder?: boolean;
  btnText?: string;
  optionGroup?: ReactElement;
  CurrentText?: string;
  onAction?: () => void;
  onDisableButton?: boolean;
  exports?: string;
  onDownload?: () => void;
  setSearchValue?: (searchValue: string) => void;
  title?: string;
  children?: React.ReactNode;
}

const DataTable = React.memo(
  ({
    columns,
    data,
    loading,
    optionGroup,
    hoverView,
    height,
    isClientPagination,
    containerStyles,
    headerBackgroundColor = colors.secondary,
    btnText,
    CurrentText,
    onAction,
    rowBottomBorder,
    onDisableButton,
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
          <TableHeading currentText={CurrentText ?? ""} />
          <Flex gap={2} alignItems="center">
            <Flex position="relative">
              <Search setSearchValue={setSearchValue} />
            </Flex>
            <Flex gap={2} alignItems="center">
              {btnText && (
                <Button
                  variant={"primary"}
                  size={"md"}
                  height={"42px"}
                  leftIcon={<AddIcon />}
                  onClick={onAction}
                  outline="none"
                  border={"none"}
                  disabled={onDisableButton}
                  sx={{
                    "&::before": {
                      border: "none",
                    },
                    "&::after": {
                      border: "none",
                    },
                  }}
                >
                  {btnText}
                </Button>
              )}
              {optionGroup && <Box bgSize={"md"}>{optionGroup}</Box>}
            </Flex>
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
                              column.getSortByToggleProps({
                                style: {
                                  minWidth: column.minWidth,
                                  width: column.width,
                                  textAlign: column.textAlign,
                                },
                              })
                            )}
                            color={colors.primary}
                            key={column.id}
                            width={10}
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
              {data?.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={headerGroups[0].headers.length}
                    textAlign="center"
                  >
                    <NoDataAvailable content="No Data Available" />
                  </Td>
                </Tr>
              ) : (
                (isClientPagination ? page : rows).map(
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
                )
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

export const Pagination = ({
  enabled,
  queryPageSize,
  queryPageIndex,
  pageChange,
  pageSizeChange,
  totalCount,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / queryPageSize);
  const [pageSizeChanges, setpageSizeChange] = useState<number>(0);

  useEffect(() => {
    if (!pageSizeChange) return;
    if (pageSizeChanges) {
      pageSizeChange(pageSizeChanges);
    }
  }, [pageSizeChanges]);

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

  const options: any[] = [
    { value: totalCount, label: "All" },
    // { value: 4, label: "4" },
    // { value: 6, label: "6" },
    // { value: totalCount, label: "All" },
  ];

  return enabled ? (
    <Box px={{ base: "4", md: "6" }} p="5" bg={colors.white} pt={8}>
      <HStack
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        gap={4}
      >
        <Box display={"flex"} gap={5} alignItems={"center"}>
          <Text>Show</Text>
          <Select
            size={"sm"}
            borderRadius={"6px"}
            onChange={(selectedOption) =>
              setpageSizeChange(Number(selectedOption?.target?.value))
            }
            sx={{
              svg: {
                width: "25px",
              },
            }}
            // placeholder="Show Case"
          >
            {options.map((item: any, ind: number) => (
              <option key={ind} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Box>

        <HStack>
          <AiOutlineDoubleLeft
            aria-label="Previous"
            color={colors.black}
            fontWeight="medium"
            onClick={() => {
              pageChange && queryPageIndex > 1 && pageChange(1);
            }}
            cursor={"pointer"}
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
          <AiOutlineDoubleRight
            aria-label="Next"
            color={colors.black}
            fontWeight="medium"
            cursor={"pointer"}
            onClick={() => {
              pageChange && pageChange((totalCount + 1) / pageSizeChanges);
            }}
          />
        </HStack>
      </HStack>
    </Box>
  ) : null;
};

export default DataTable;
DataTable.displayName = "DataTable";
