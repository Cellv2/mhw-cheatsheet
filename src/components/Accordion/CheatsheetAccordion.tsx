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
        setQueryResults(newResults);
    };

    return (
        <>
            <AccordionSearch
                initialDataset={bookData.books}
                updateQueryResults={updateQueryResults}
            />
            <Accordion>
                {queryResults.map((result, index) => {
                    return (
                        <Card key={result.isbn}>
                            <Accordion.Toggle
                                as={Card.Header}
                                eventKey={`${index}`}
                            >
                                {`${result.title} by ${result.author}`}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={`${index}`}>
                                <Card.Body>
                                    Hello! The ISBN for this book is{" "}
                                    {result.isbn}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    );
                })}
            </Accordion>
        </>
    );
};

export default CheatsheetAccordion;
