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
    allMhwMonsterPartData: {
        edges: {
            node: {
                MonsterBreak_Id: number;
                MonsterBreak_MonsterId: number;
                MonsterBreak_Flinch: number;
                MonsterBreak_Wound: number;
                MonsterBreak_Sever: number | null;
                MonsterBreak_Extract: string | null;
                MonsterText_Name: string;
                MonsterBreakText_PartName: string;
            };
        }[];
    };
};

const tableColumns = [
    { Header: "Monster Name", accessor: "MonsterText_Name" },
    { Header: "Monster Part", accessor: "MonsterBreakText_PartName" },
    { Header: "Kinsect Extract", accessor: "MonsterBreak_Extract" },
];

const KinsectExtractsPage: React.FC<PageProps<DataProps>> = ({ data, path }) => (
    <Layout>
        <SEO title="Kinsect Extracts" />
        <h1>Kinsect Extracts</h1>
        <FilterableTable
            edgeData={data.allMhwMonsterPartData.edges}
            tableColumns={tableColumns}
        />
        <p>
            You're currently on the page "{path}" which was built on{" "}
            {data.site.buildTime}.
        </p>
        <Link to="/">Go back to the homepage</Link>
    </Layout>
);

export default KinsectExtractsPage;

export const query = graphql`
    {
        site {
            buildTime(formatString: "YYYY-MM-DD hh:mm a z")
        }
        allMhwMonsterPartData {
            edges {
                node {
                    MonsterBreak_Id
                    MonsterBreak_MonsterId
                    MonsterBreak_Flinch
                    MonsterBreak_Wound
                    MonsterBreak_Sever
                    MonsterBreak_Extract
                    MonsterText_Name
                    MonsterBreakText_PartName
                }
            }
        }
    }
`;
