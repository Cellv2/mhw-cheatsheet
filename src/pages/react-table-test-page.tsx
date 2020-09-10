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
    allMhwMonsterData: {
        edges: {
            node: {
                [key: string]: string | number;
                MonsterId: number;
                MonsterSize: string;
                MonsterName: string;
                MonsterLangId: string;
                MonsterDescription: string;
                LocationName: string;
                LocationLangId: string;
                MonsterStartArea: string;
                MonsterMoveArea: string;
                MonsterRestArea: string;
            };
        }[];
    };
};

const ReactTableTestPage: React.FC<PageProps<DataProps>> = ({ data, path }) => {
    // const tableData = React.useMemo(
    //     () => [
    //         { col1: "Hello", col2: "World" },
    //         { col1: "react-table", col2: "ftw" },
    //         { col1: "whatever", col2: "you want" },
    //     ],
    //     []
    // );

    // const tableColumns = React.useMemo(
    //     () => [
    //         {
    //             Header: "Column 1",
    //             accessor: "col1", // accessor is the "key" in the data
    //         },
    //         {
    //             Header: "Column 2",
    //             accessor: "col2",
    //         },
    //     ],
    //     []
    // );

    const tcArr = [
        {
            Header: "Monster Name",
            accessor: "MonsterName",
        },
        {
            Header: "Monster Size",
            accessor: "MonsterSize",
        },
    ];
    
    const tableColumns = React.useMemo(
        () => {
        [
            {
                Header: "Monster Name",
                accessor: "MonsterName",
            },
            {
                Header: "Monster Size",
                accessor: "MonsterSize",
            }
        ]
    }, []);

    // To set up the editor integration, add something like REACT_EDITOR=atom to the .env.local file in your project folder and restart the development server. Learn more: https://goo.gl/MMTaZt

    const tableData = React.useMemo(() => {
        // for each edge node
        // create object in the order of the accessors
        // read the tablecolumn accessors

        return data.allMhwMonsterData.edges.map((nodeObj) => {
            let rowObj: { [key: string]: any } = {};
            tcArr.forEach(({ accessor }) => {
                rowObj[accessor] = nodeObj.node[accessor];
            });
            console.log(rowObj);
            return rowObj;
        });
    }, [])


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
        allMhwMonsterData {
            edges {
                node {
                    MonsterId
                    MonsterSize
                    MonsterName
                    MonsterLangId
                    MonsterDescription
                    LocationName
                    LocationLangId
                    MonsterStartArea
                    MonsterMoveArea
                    MonsterRestArea
                }
            }
        }
    }
`;
