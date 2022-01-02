import React from "react";

interface IFolderProps {
  folderContent: string[];
  folderName: string;
}

const Folder = ({ folderContent, folderName }: IFolderProps): JSX.Element => {
  const handleOnClick: React.MouseEventHandler<HTMLDivElement> = () => {
    console.log(`${folderName} folder clicked`);
  };

  return (
    <div
      aria-hidden="true"
      className="folder"
      onClick={handleOnClick}
      role="button"
      tabIndex={0}
    >
      <span className="folder-icon">📁</span>
      <h2 className="folder-name">{folderName}</h2>
    </div>
  );
};

export default Folder;
