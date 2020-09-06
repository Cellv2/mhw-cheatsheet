// If you don't want to use TypeScript you can delete this file!
import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

type DataProps = {
    site: {
        buildTime: string;
    };
    allMhwWeaponData: {
        edges: {
            node: {
                WeaponId: number;
                WeaponType: string;
                WeaponName: string;
                LangId: string;
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
                    <th>Weapon Name</th>
                    <th>Weapon Type</th>
                </tr>
            </thead>
            <tbody>
                {data.allMhwWeaponData.edges.map(({ node }) => {
                    return (
                        <tr>
                            <td>{node.WeaponName}</td>
                            <td>{node.WeaponType}</td>
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
        allMhwWeaponData {
            edges {
                node {
                    WeaponId
                    WeaponType
                    WeaponName
                    LangId
                }
            }
        }
    }
`;
