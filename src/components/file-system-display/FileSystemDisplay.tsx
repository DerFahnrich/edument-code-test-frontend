import React, { useContext } from "react";
import { FileSystemContext } from "../../context/FileSystemProvider";
import RenderCurrentFolderAndFiles from "../render-current-folder-and-files/RenderCurrentFolderAndFiles";

const FileSystemDisplay = (): JSX.Element => {
  const {
    state: { filepaths, currentLayerOfFilePaths },
  } = useContext(FileSystemContext);

  return (
    <div className="file-system-overview">
      <RenderCurrentFolderAndFiles
        filepaths={currentLayerOfFilePaths || filepaths}
      />
    </div>
  );
};

export default FileSystemDisplay;
