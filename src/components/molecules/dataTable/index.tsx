import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ColumnOrderState,
  FilterFn,
  GroupingState,
  PaginationState,
  SortingState,
  Updater,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { AiOutlinePushpin } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";

import Pagination from "./Pagination";
import { colors } from "@src/theme/colors";

export type DataTableProps = {
  data: Record<string, any>[];
  columns: any;
  isLoading?: boolean;
  pinColumnAccess?: boolean;
  showFooter?: boolean;
  pagination?: {
    manual?: boolean;
    pageCount?: number;
    pageParams?: {
      pageIndex: number;
      pageSize: number;
    };
    onChangePagination?: (paginationData: Updater<PaginationState>) => void;
  };
  filter?: {
    globalFilter: string;
    setGlobalFilter: Dispatch<SetStateAction<string>>;
  };
  sortingColumn?: string;
  setTable?: (table: any) => void;
  modalProps?: {
    sticky: boolean;
    height: string;
  };
};
const filterFunction: FilterFn<any> = (row, columnId, value) => {
  const rowValue = String(row.original[columnId]).toLowerCase();
  const filterValue = value.toLowerCase();
  return rowValue.startsWith(filterValue);
};

export function TableData({
  data,
  columns,
  pagination,
  isLoading,
  setTable,
  filter,
  pinColumnAccess,
  showFooter,
  sortingColumn,
  modalProps,
}: DataTableProps) {
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [stickyColumn, setStickyColumn] = useState<null | number>(null);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  useEffect(() => {
    if (sortingColumn) {
      setSorting([{ id: sortingColumn, desc: false }]);
    }
  }, [sortingColumn]);

  const totalPage = Math.ceil(
    (pagination?.pageCount ?? 0) / (pagination?.pageParams?.pageSize ?? 20)
  );

  const paginationParams = useMemo(
    () =>
      pagination?.manual
        ? {
            manualPagination: true,
            pageCount: totalPage ?? -1,
            onPaginationChange: pagination?.onChangePagination,
          }
        : {
            getPaginationRowModel: getPaginationRowModel(),
          },
    [pagination]
  );
  const table = useReactTable({
    columns,
    data,

    state: pagination?.manual
      ? {
          globalFilter: filter?.globalFilter,
          grouping,
          sorting,
          columnOrder,
          pagination: {
            pageIndex: pagination.pageParams?.pageIndex ?? 0,
            pageSize: pagination.pageParams?.pageSize ?? 20,
          },
        }
      : {
          globalFilter: filter?.globalFilter,
          grouping,
          sorting,
          columnOrder,
        },

    getFilteredRowModel: getFilteredRowModel(),
    onGroupingChange: setGrouping,
    getGroupedRowModel: getGroupedRowModel(),
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: filter?.setGlobalFilter,
    globalFilterFn: filterFunction,
    ...paginationParams,
  });

  useEffect(() => {
    setTable?.(table);
    table.setPageSize(pagination?.pageParams?.pageSize ?? 20);
  }, [table]);

  useEffect(() => {
    table.getHeaderGroups().map((headerGroup) =>
      headerGroup.headers.map(({ index }) => {
        columns[index]?.enablePinning && setStickyColumn(index + 1);
      })
    );
  }, [columns, data, table]);

  return (
    <>
      <Box
        overflowX={isLoading ? "hidden" : "scroll"}
        pb={2}
        css={{
          scrollbarGutter: "stable",
          "&::-webkit-scrollbar": {
            width: "0.2rem",
            height: "0.6rem",
            position: "absolute",
          },
          "&::-webkit-scrollbar-track": {
            position: "absolute",
            background: "#fff",
            opacity: 0.1,
          },
          "&::-webkit-scrollbar-thumb": {
            background: colors.primary,
            borderRadius: 20,
          },
        }}
        sx={
          modalProps?.sticky
            ? {
                maxH: modalProps.height,
                overflow: "auto",
                th: {
                  position: "sticky",
                  top: 0,
                },
                table: {
                  borderCollapse: "collapse",
                },
              }
            : {}
        }
        borderRadius={8}
      >
        <Table bg="white">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr
                key={headerGroup.id}
                css={{
                  [`th:nth-of-type(${stickyColumn})`]: {
                    position: "sticky",
                    left: "-1px",
                    right: "-1px",
                    zIndex: 10,
                    boxShadow: "inset 1px 0 0 white,inset -1px 0 0 white",
                  },
                }}
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      textTransform="capitalize"
                      whiteSpace="nowrap"
                      style={{
                        width: `${columns[index]?.size}%` ?? header.getSize(),
                        textAlign:
                          header.id == "Actions" ||
                          header.id == "Action" ||
                          header.colSpan > 1
                            ? "center"
                            : "left",
                      }}
                    >
                      <HStack justifyContent={"space-between"}>
                        <Text flex={1}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </Text>
                        {pinColumnAccess && header.id != "S.N." && (
                          <IconButton
                            variant="outline"
                            px={1}
                            py={1}
                            size={"small"}
                            aria-label="Minify sidebar"
                            color="inherit"
                            onClick={() => {
                              if (stickyColumn == index + 1) {
                                setStickyColumn(null);
                              } else setStickyColumn(index + 1);
                            }}
                            ml={4}
                            bg={
                              stickyColumn == index + 1
                                ? "white"
                                : "transparent"
                            }
                          >
                            <AiOutlinePushpin />
                          </IconButton>
                        )}
                      </HStack>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                css={{
                  [`td:nth-of-type(${stickyColumn})`]: {
                    position: "sticky",
                    left: "-1px",
                    right: "-1px",
                    zIndex: 10,
                    boxShadow: "inset 1px 0 0 #edf2f7,inset -1px 0 0 #edf2f7",
                  },
                  [`td:nth-of-type(${stickyColumn}) , td:not(:last-child)`]: {
                    boxShadow: "inset 1px 0 0 #edf2f7",
                  },
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  const value =
                    typeof cell?.getContext().getValue() == "string"
                      ? (cell?.getContext().getValue() as string)
                      : "";
                  return (
                    <Td
                      key={cell.id}
                      pl={4}
                      sx={{
                        whiteSpace: value?.length > 120 ? "initial" : "nowrap",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
          {showFooter ? (
            <Tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <Tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Tfoot>
          ) : (
            ""
          )}
        </Table>
      </Box>
      {pagination ? (
        <HStack
          justifyContent={"flex-end"}
          float={"right"}
          flexWrap="wrap"
          mt={3}
        >
          <HStack>
            <FormControl variant={"floating"}>
              <Select
                icon={<MdArrowDropDown />}
                w="70px"
                colorScheme={colors.chart_blue}
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 15, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </Select>
              <FormLabel
                marginInlineStart={"5% !important"}
                marginStart={"5% !important"}
              >
                Items
              </FormLabel>
            </FormControl>
          </HStack>
          <Pagination
            isBackendPaginated={pagination?.manual}
            table={table}
            pageIndex={pagination?.pageParams?.pageIndex}
            pageCount={pagination?.pageCount ?? data?.length}
          />
        </HStack>
      ) : (
        ""
      )}
    </>
  );
}
