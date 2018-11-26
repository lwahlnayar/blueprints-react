import React from "react";
//creates input fields for each capability on click
export default function Input(props) {
    const { type, handleChange } = props;
    return props.capability.map((val, idx) => {
        let nameId = `${type}-name-${idx}`;
        let valueId = `${type}-value-${idx}`;
        let dataTypeId = `${type}-data_type-${idx}`;
        let commentId = `${type}-comment-${idx}`;

        function inputGenerator(idStrings, str1, str2) {
            return (
                <div className="input-container">
                    <label htmlFor={idStrings}>{`${str1} #${idx + 1}`}</label>
                    <input
                        value={val[str2]}
                        type="text"
                        name={idStrings}
                        data-id={idx}
                        data-cap={type}
                        className={str2}
                        onChange={handleChange}
                    />
                </div>
            );
        }

        return (
            <div key={idx}>
                {inputGenerator(nameId, "Name", "name")}
                {inputGenerator(valueId, "Value", "value")}
                {type === "sensor" &&
                    inputGenerator(dataTypeId, "Data Type", "data_type")}
                {type === "sensor" &&
                    inputGenerator(commentId, "Comment", "comment")}
            </div>
        );
    });
}
