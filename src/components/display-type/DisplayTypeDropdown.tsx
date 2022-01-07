import React, { useContext } from "react";

import { FileSystemContext } from "../../context/FileSystemProvider";
import { setDisplayValue } from "../../context/fileSystemActions";
import { TDisplay } from "../../context/types/TDisplay";

const displayTypes: TDisplay[] = ["ICONS", "LIST"];

const DisplayTypeDropdown = (): JSX.Element => {
  const { dispatch } = useContext(FileSystemContext);
  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    dispatch(setDisplayValue(e.target.value as TDisplay));
  };

  return (
    <select onChange={handleOnChange}>
      {displayTypes.map((type) => (
        <option key={type} value={type}>
          {type.split("").slice(0, 1).join("") +
            type.split("").slice(1).join("").toLowerCase()}
        </option>
      ))}
    </select>
  );
};

export default DisplayTypeDropdown;

/* <span className="display-style">| Visa: {display}</span>; */
