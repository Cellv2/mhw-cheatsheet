// If you don't want to use TypeScript you can delete this file!
import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

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

const WeaponsPage: React.FC<PageProps<DataProps>> = ({ data, path }) => (
    <Layout>
        <SEO title="MHW Weapons" />
        <h1>MHW Weapons Table</h1>
        <table>
            <thead>
                <tr>
                    <th>Monster Part MonsterBreak_Id</th>
                    <th>Monster MonsterId</th>
                    <th>Monster Name</th>
                    <th>Monster Part Name</th>
                    <th>Monster Part Flinch</th>
                    <th>Monster Part Wound</th>
                    <th>Monster Part Sever</th>
                    <th>Monster Part Extract</th>
                </tr>
            </thead>
            <tbody>
                {data.allMhwMonsterPartData.edges.map(({ node }) => {
                    return (
                        <tr>
                            <td>{node.MonsterBreak_Id}</td>
                            <td>{node.MonsterBreak_MonsterId}</td>
                            <td>{node.MonsterText_Name}</td>
                            <td>{node.MonsterBreakText_PartName}</td>
                            <td>{node.MonsterBreak_Flinch}</td>
                            <td>{node.MonsterBreak_Wound}</td>
                            <td>{node.MonsterBreak_Sever}</td>
                            <td>{node.MonsterBreak_Extract}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <p>
            You're currently on the page "{path}" which was built on{" "}
            {data.site.buildTime}.
        </p>
        <Link to="/">Go back to the homepage</Link>
    </Layout>
);

export default WeaponsPage;

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
