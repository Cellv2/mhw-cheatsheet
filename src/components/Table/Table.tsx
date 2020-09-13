import React, { useState } from "react";
import { Column, TableOptions, useFilters, useTable } from "react-table";

type Props = {
    tableColumns: Column<{}>[];
    tableData: {}[];
};

const Table = ({ tableColumns, tableData }: Props) => {
    const [filterInput, setFilterInput] = useState("");

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFilter("MonsterName", value);
        setFilterInput(value);
    };

    const tableConfig: TableOptions<{}> = {
        columns: tableColumns,
        data: tableData,
    };
    const tableInstance = useTable(tableConfig, useFilters);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        // TODO: find out why TS doesn't like this
        //@ts-ignore
        setFilter,
    } = tableInstance;

    return (
        <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
            <input
                value={filterInput}
                onChange={handleFilterChange}
                placeholder={"Search by monster name"}
            ></input>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: "solid 3px red",
                                    background: "aliceblue",
                                    color: "black",
                                    fontWeight: "bold",
                                }}
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: "10px",
                                            border: "solid 1px gray",
                                            background: "papayawhip",
                                        }}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
