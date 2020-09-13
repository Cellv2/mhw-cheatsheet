// If you don't want to use TypeScript you can delete this file!
import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Table from "../components/Table";

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
    const tableColumns = React.useMemo(
        () => [
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
        ],
        []
    );

    const tableData = React.useMemo(() => {
        return data.allMhwMonsterData.edges.map((nodeObj) => {
            let rowObj: { [key: string]: any } = {};
            tableColumns.forEach(({ accessor }) => {
                rowObj[accessor] = nodeObj.node[accessor];
            });

            return rowObj;
        });
    }, []);

    return (
        <Layout>
            <SEO title="Using React-Table" />
            <Table tableColumns={tableColumns} tableData={tableData}></Table>
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
