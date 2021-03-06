// If you don't want to use TypeScript you can delete this file!
import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import FilterableTable from "../components/Table/FilterableTable";

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
    // Header is what will be displayed
    // accessor needs to be the key one of the GQL nodes that's passed in
    const tableColumns = [
        {
            Header: "Monster Name",
            accessor: "MonsterName",
        },
        {
            Header: "Monster Size",
            accessor: "MonsterSize",
        },
        {
            Header: "Monster Location",
            accessor: "LocationName",
        },
    ];

    return (
        <Layout>
            <SEO title="Using React-Table" />
            <FilterableTable
                tableColumns={tableColumns}
                edgeData={data.allMhwMonsterData.edges}
            ></FilterableTable>
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
