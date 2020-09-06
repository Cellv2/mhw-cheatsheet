// If you don't want to use TypeScript you can delete this file!
import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

type DataProps = {
    site: {
        buildTime: string;
    };
    allMhwMonsterData: {
        edges: {
            node: {
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

const MonstersPage: React.FC<PageProps<DataProps>> = ({ data, path }) => (
    <Layout>
        <SEO title="MHW Monsters" />
        <h1>MHW Monsters Table</h1>
        <table>
            <thead>
                <tr>
                    <th>Monster Name</th>
                    <th>Monster Size</th>
                    <th>Monster Description</th>
                    <th>Location Name</th>
                    <th>Monster StartArea</th>
                    <th>Monster MoveArea</th>
                    <th>Monster RestArea</th>
                </tr>
            </thead>
            <tbody>
                {data.allMhwMonsterData.edges.map(({ node }) => {
                    return (
                        <tr>
                            <td>{node.MonsterName}</td>
                            <td>{node.MonsterSize}</td>
                            <td>{node.MonsterDescription}</td>
                            <td>{node.LocationName}</td>
                            <td>{node.MonsterStartArea}</td>
                            <td>{node.MonsterMoveArea}</td>
                            <td>{node.MonsterRestArea}</td>
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

export default MonstersPage;

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
