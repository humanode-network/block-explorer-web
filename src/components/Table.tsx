import React from "react";
import {
  Box,
  Table as CTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Column, useTable } from "react-table";

export default function Table({ columns, data, variant }: Props) {
  console.log(data);
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  // Render the UI for your table
  return (
    <>
      <Box display="block" overflowX="auto" whiteSpace="nowrap">
        <CTable variant={variant || "simple"} {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup, trIdx) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={trIdx}>
                {headerGroup.headers.map((column, thIdx) => (
                  <Th {...column.getHeaderProps()} key={thIdx}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, trIdx) => {
              prepareRow(row);
              return (
                <React.Fragment {...row.getRowProps()}>
                  <Tr {...row.getRowProps()} key={trIdx}>
                    {row.cells.map((cell, tdIdx) => {
                      return (
                        <Td {...cell.getCellProps()} key={tdIdx}>
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
                  </Tr>
                </React.Fragment>
              );
            })}
          </Tbody>
        </CTable>
      </Box>
    </>
  );
}

export interface Props {
  columns: Array<Column<any>>;
  data: Array<any>;
  variant?: string;
  loading?: boolean;
  error?: boolean;
}