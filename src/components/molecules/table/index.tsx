import NoDataAvailable from "@src/components/organisms/nodata";
import Pagination from "./Pagination";
import { colors } from "@src/theme/colors";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import styled from "styled-components";
import Spinner from "@src/components/atoms/Spinner";

const TableWrapper = styled.div`
  table {
    width: 100%;
  }
  td {
    padding: 16px;
    font-size: 14px;
  }
  tr:nth-of-type(2n) {
    background-color: ${colors.gray};
  }
  th {
    padding: 16px;
    color: ${colors.primary};
    text-align: left;
    font-size: 14px;
    font-weight: 500;
  }
  thead {
    background-color: ${colors.secondary};
  }
`;
export default function BasicTable({
  data,
  columns,
  showPagination = true,
  totalPages,
  isLoading,
}: any) {
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });
  return (
    <TableWrapper>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={table.getHeaderGroups()[0].headers.length}>
                <Spinner />
              </td>
            </tr>
          ) : data && data.length === 0 ? (
            <tr>
              <td colSpan={table.getHeaderGroups()[0].headers.length}>
                <NoDataAvailable content="No Data Available" />
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {cell.getValue() === null
                      ? "-"
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showPagination && data && data.length > 0 && (
        <Pagination table={table} totalPages={totalPages} />
      )}
    </TableWrapper>
  );
}
