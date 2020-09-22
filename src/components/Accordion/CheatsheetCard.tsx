import React from "react";
import { Accordion, Card } from "react-bootstrap";

type Props = {};

const CheatsheetCard = (props: Props) => {
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
                Click me!
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};

export default CheatsheetCard;
