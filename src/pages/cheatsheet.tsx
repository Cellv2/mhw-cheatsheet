import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import CheatsheetAccordion from "../components/Accordion/CheatsheetAccordion";

type DataProps = {
    site: {
        buildTime: string;
    };
};

const CheatsheetPage: React.FC<PageProps<DataProps>> = ({ data, path }) => {
    return (
        <Layout>
            <SEO title="Cheatsheet" />
            <h1>Kinsect Extracts</h1>
            <CheatsheetAccordion />
            <p>
                You're currently on the page "{path}" which was built on{" "}
                {data.site.buildTime}.
            </p>
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    );
};

export default CheatsheetPage;

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
