import React, { useContext } from "react";
import useFolderOperations from "../../hooks/useFolderOperations";

import { FileSystemContext } from "../../context/FileSystemProvider";
import {
  setCurrentFilepath,
  setCurrentLayerOfFilepaths,
} from "../../context/fileSystemActions";

interface IFolderProps {
  folderContent: string[];
  folderName: string;
}

const Folder = ({ folderContent, folderName }: IFolderProps): JSX.Element => {
  const { openFolderAndMakeContentAccessible } = useFolderOperations();

  const {
    state: { currentFilePath },
    dispatch,
  } = useContext(FileSystemContext);

  /**
   * "Opens" the folder you just clicked on and executes the necessary code
   * in order to display the content properly.
   */
  const handleOnClick: React.MouseEventHandler<HTMLDivElement> = () => {
    const fullFilePath = currentFilePath
      ? `${currentFilePath}/${folderName}`
      : folderName;

    dispatch(setCurrentFilepath(fullFilePath));

    dispatch(
      setCurrentLayerOfFilepaths(
        openFolderAndMakeContentAccessible(folderContent, folderName)
      )
    );
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
