import React, { useContext, useMemo } from "react";
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
    state: { currentFilePath, display },
    dispatch,
  } = useContext(FileSystemContext);

  const displayFolderStyle = useMemo(() => {
    switch (display) {
      case "ICONS":
        return "folder display-icons";
      case "LIST":
        return "folder display-list";
      default:
        return "folder display-icons";
    }
  }, [display]);

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
      className={displayFolderStyle}
      onClick={handleOnClick}
      role="button"
      tabIndex={0}
    >
      <span className="icon">📁</span>
      <h2 className="name">{folderName}</h2>
    </div>
  );
};

export default Folder;
