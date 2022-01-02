import React from "react";

interface IFileItemProps {
  name: string;
}

const FileItem = ({ name }: IFileItemProps): JSX.Element => {
  return <h2 className="file-item">{name}</h2>;
};

export default FileItem;
