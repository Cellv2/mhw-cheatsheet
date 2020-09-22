import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import AccordionSearch from "./AccordionSearch";
import CheatsheetCard from "./CheatsheetCard";

import { book, bookData } from "./data";

type Props = {};

const CheatsheetAccordion = (props: Props) => {
    const [queryResults, setQueryResults] = useState<book[]>(bookData.books);

    const updateQueryResults = (newResults: any[]) => {
        setQueryResults(newResults)
    }

    return (
        <>
            <AccordionSearch initialDataset={bookData.books} updateQueryResults={updateQueryResults} />
            {queryResults.map((result) => {
                return (
                    <div key={result.isbn}>
                        <p>ISBN: {result.isbn}</p>
                        <p>Title: {result.title}</p>
                        <p>Author: {result.author}</p>
                    </div>
                );
            })}

            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Click me!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Click me!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <CheatsheetCard />
            </Accordion>
        </>
    );
};

export default CheatsheetAccordion;
