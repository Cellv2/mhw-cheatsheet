import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

import { bookData, book } from "./data";

type Props = {
    initialDataset: any;
    updateQueryResults: (newResults: any[]) => void;
};

const AccordionSearch = (props: Props) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    // const [queryResults, setQueryResults] = useState<book[]>(bookData.books);

    const fuse = new Fuse(bookData.books, {
        keys: ["title", "author", "isbn"],
    });

    const handleInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSearchQuery(event.target.value);

        if (!event.target.value || event.target.value === "") {
            // setQueryResults(bookData.books);
            props.updateQueryResults(props.initialDataset);
        } else {
            const search = fuse.search(event.target.value);
            const data = search.map((item) => item.item);
            // setQueryResults(data);
            props.updateQueryResults(data);
        }
    };

    return (
        <>
            <input onChange={handleInputOnChange} value={searchQuery} />
            {/* {queryResults.map((result) => {
                return (
                    <div key={result.isbn}>
                        <p>ISBN: {result.isbn}</p>
                        <p>Title: {result.title}</p>
                        <p>Author: {result.author}</p>
                    </div>
                );
            })} */}
        </>
    );
};

export default AccordionSearch;
