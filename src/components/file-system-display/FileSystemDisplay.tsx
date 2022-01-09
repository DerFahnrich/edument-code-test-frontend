import React, { useContext, useEffect, useRef } from "react";

import RenderCurrentFolderAndFiles from "../render-current-folder-and-files/RenderCurrentFolderAndFiles";
import ContextMenu from "../context-menu/ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";

import { FileSystemContext } from "../../context/FileSystemProvider";

const FileSystemDisplay = (): JSX.Element => {
  const fileSystemWindow = useRef<HTMLDivElement | null>(null);
  const {
    state: { filepaths, currentLayerOfFilePaths },
  } = useContext(FileSystemContext);

  const { showMenu, xPos, yPos, closeMenu } = useContextMenu(fileSystemWindow);

  return (
    <div className="file-system-overview" ref={fileSystemWindow}>
      <RenderCurrentFolderAndFiles
        filepaths={currentLayerOfFilePaths || filepaths}
      />
      {showMenu && (
        <ContextMenu
          xPos={xPos}
          yPos={yPos}
          close={closeMenu}
          contextMenuType="OTHER"
        />
      )}
    </div>
  );
};

export default FileSystemDisplay;
