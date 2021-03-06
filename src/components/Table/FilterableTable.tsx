import React, { useState } from "react";
import { Column, TableOptions, useFilters, useTable } from "react-table";

import Table from "react-bootstrap/Table";
import FloatingLabel from "./FloatingLabel";

// Header is what will be displayed
// accessor needs to be the key one of the GQL nodes that's passed in
type TableColumns = {
    Header: string;
    accessor: string;
}[];

type EdgeData = {
    node: {
        [key: string]: string | number | null;
    };
}[];

type Props = {
    tableColumns: TableColumns;
    edgeData: EdgeData;
};

/**
 * Simple filterable table which takes in a set of columns and data, then maps the data into the relevant columns
 *
 * @param {TableColumns} tableColumns Header is the name shown, accessor is the key on the edge node which maps to the column
 * @param {EdgeData} edgeData The whole edge data from the GQL query (i.e. data.myDataQuery.edges)
 */
const FilterableTable = ({ tableColumns, edgeData }: Props) => {
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

    const memoizedColumns = React.useMemo(() => tableColumns, []);

    const mappedData = edgeData.map((nodeObj) => {
        let rowObj: { [key: string]: any } = {};
        memoizedColumns.forEach(({ accessor }) => {
            rowObj[accessor] = nodeObj.node[accessor];
        });

        return rowObj;
    });
    const memoizedData = React.useMemo(() => mappedData, []);

    const tableConfig: TableOptions<{}> = {
        columns: memoizedColumns as Column<{}>[],
        data: memoizedData,
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
        <Table striped bordered hover {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                <FloatingLabel
                                    columnId={column.id}
                                    handleFilterChange={handleFilterChange}
                                    placeholder={column.Header?.toString()}
                                    value={filterInput[column.id]}
                                />
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
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default FilterableTable;
