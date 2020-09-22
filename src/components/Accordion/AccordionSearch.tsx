import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

import { bookData, book } from "./data";

type Props = {};

const AccordionSearch = (props: Props) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [queryResults, setQueryResults] = useState<book[]>(bookData.books);

    const _books = bookData;
    const fuse = new Fuse(_books.books, { keys: ["title", "author", "isbn"] });

    const handleInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSearchQuery(event.target.value);

        if (!event.target.value || event.target.value === "") {
            setQueryResults(_books.books);
        } else {
            const s = fuse.search(event.target.value);
            const d = s.map((r) => r.item);
            setQueryResults(d);
        }
    };

    return (
        <>
            <input onChange={handleInputOnChange} value={searchQuery} />
            {queryResults.map((result) => {
                // console.log("KEKW")
                return (
                    <div key={result.isbn}>
                        <p>ISBN: {result.isbn}</p>
                        <p>Title: {result.title}</p>
                        <p>Author: {result.author}</p>
                    </div>
                );
            })}
        </>
    );
};

export default AccordionSearch;
