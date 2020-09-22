import React, { useRef, useState, useEffect } from "react";
import Fuse from "fuse.js";

import { bookData, book } from "./data";

type Props = {
    initialDataset: any;
    updateQueryResults: (newResults: any[]) => void;
};

const AccordionSearch = (props: Props) => {
    const fuseRef = useRef<Fuse<{}>>();
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const fuse = new Fuse(bookData.books, {
            keys: ["title", "author", "isbn"],
        });

        fuseRef.current = fuse;
    }, []);

    const handleInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSearchQuery(event.target.value);

        if (!event.target.value || event.target.value === "" || !fuseRef.current) {
            props.updateQueryResults(props.initialDataset);
        } else {
            const search = fuseRef.current.search(event.target.value);
            const data = search.map((item) => item.item);
            props.updateQueryResults(data);
        }
    };

    return <input onChange={handleInputOnChange} value={searchQuery} />;
};

export default AccordionSearch;
