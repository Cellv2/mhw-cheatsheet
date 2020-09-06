// If you don't want to use TypeScript you can delete this file!
import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

type DataProps = {
    site: {
        buildTime: string;
    };
    allMhwArmourData: {
        edges: {
            node: {
                ArmourId: number;
                ArmourType: string;
                ArmourName: string;
                LangId: string;
            };
        }[];
    };
};

const ArmuorPage: React.FC<PageProps<DataProps>> = ({ data, path }) => (
    <Layout>
        <SEO title="MHW Armour" />
        <h1>MHW Armours Table</h1>
        <table>
            <thead>
                <tr>
                    <th>Armour Name</th>
                    <th>Armour Type</th>
                </tr>
            </thead>
            <tbody>
                {data.allMhwArmourData.edges.map(({ node }) => {
                    return (
                        <tr>
                            <td>{node.ArmourName}</td>
                            <td>{node.ArmourType}</td>
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

export default ArmuorPage;

export const query = graphql`
    {
        site {
            buildTime(formatString: "YYYY-MM-DD hh:mm a z")
        }
        allMhwArmourData {
            edges {
                node {
                    ArmourId
                    ArmourType
                    ArmourName
                    LangId
                }
            }
        }
    }
`;
