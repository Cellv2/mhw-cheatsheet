import React, { useState } from "react";
import { Column, TableOptions, useFilters, useTable } from "react-table";

type Props = {
    tableColumns: Column<{}>[];
    tableData: {}[];
};

const Table = ({ tableColumns, tableData }: Props) => {
    // we use an object of accessor (column.id): searchValue pairs
    // this allows us to have the same filter implementation across multiple different columns, each with different identifiers
    const [filterInput, setFilterInput] = useState<{ [key: string]: string }>(
        {}
    );

    const handleFilterChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        columnId: string
    ) => {
        const value = event.target.value;
        setFilter(columnId, value);
        setFilterInput((prev) => ({
            ...prev,
            [columnId]: value,
        }));
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
                                <input
                                    value={filterInput[column.id]}
                                    onChange={(e) =>
                                        handleFilterChange(e, column.id)
                                    }
                                    placeholder={`Search ${column.id}`}
                                ></input>
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
