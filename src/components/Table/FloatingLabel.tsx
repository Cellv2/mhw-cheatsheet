import React from "react";

import "./FloatingLabel.css";

type Props = {
    columnId: string;
    handleFilterChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        columnId: string
    ) => void;
    placeholder: string | undefined;
    value: string;
};

const FloatingLabel = (props: Props) => {
    const { value, handleFilterChange, placeholder, columnId } = props;
    return (
        <div className="field">
            <input
                type="text"
                name={value}
                id={columnId}
                placeholder={`Search ${placeholder ?? columnId}`}
                onChange={(e) => handleFilterChange(e, columnId)}
            />
            <label htmlFor={columnId}>{placeholder ?? columnId}</label>
        </div>
    );
};

export default FloatingLabel;
