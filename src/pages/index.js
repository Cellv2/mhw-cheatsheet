import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

import "bootstrap/dist/css/bootstrap.min.css";

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
            <Image />
        </div>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/cheatsheet/">Cheatsheet</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
        <br />
        <Link to="/weapons-page/">Go to "MHW Weapons Page"</Link>
        <br />
        <Link to="/armour-page/">Go to "MHW Armour Page"</Link>
        <br />
        <Link to="/monsters-page/">Go to "MHW Monsters Page"</Link>
        <br />
        <Link to="/kinsect-page/">Go to "MHW Kinsect Page"</Link>
        <br />
        <Link to="/react-table-test-page/">Go to "React Table"</Link>
        <br />
        <Link to="/kinsect-extracts/">Go to "Kinsect Extracts"</Link>
    </Layout>
);

export default IndexPage;
