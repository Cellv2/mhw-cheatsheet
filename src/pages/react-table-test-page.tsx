// If you don't want to use TypeScript you can delete this file!
import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { useTable, TableOptions } from "react-table";

type DataProps = {
    site: {
        buildTime: string;
    };
};

const ReactTableTestPage: React.FC<PageProps<DataProps>> = ({ data, path }) => {
    const tableData = React.useMemo(
        () => [
            { col1: "Hello", col2: "World" },
            { col1: "react-table", col2: "ftw" },
            { col1: "whatever", col2: "you want" },
        ],
        []
    );

    const tableColumns = React.useMemo(
        () => [
            {
                Header: "Column 1",
                accessor: "col1", // accessor is the "key" in the data
            },
            {
                Header: "Column 2",
                accessor: "col2",
            },
        ],
        []
    );

    const tableConfig: TableOptions<{}> = {
        columns: tableColumns,
        data: tableData,
    };
    const tableInstance = useTable(tableConfig);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <Layout>
            <SEO title="Using React-Table" />
            {/* apply the table props */}
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
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    );
};

export default ReactTableTestPage;

export const query = graphql`
    {
        site {
            buildTime(formatString: "YYYY-MM-DD hh:mm a z")
        }
    }
`;
