import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

import useFolderOperations from "../../hooks/useFolderOperations";
import useContextMenu from "../../hooks/useContextMenu";
import ContextMenu from "../context-menu/ContextMenu";
import useToggle from "../../hooks/useToggle";

import { FileSystemContext } from "../../context/FileSystemProvider";

import {
  setCurrentFilepath,
  setCurrentLayerOfFilepaths,
  updateFolderName,
} from "../../context/fileSystemActions";

interface IFolderProps {
  folderContent: string[];
  folderName: string;
}

const Folder = ({ folderContent, folderName }: IFolderProps): JSX.Element => {
  const [value, setValue] = useState(folderName);
  const [editMode, toggleEditMode] = useToggle(false);
  const { openFolderAndMakeContentAccessible } = useFolderOperations();
  const folder = useRef<HTMLDivElement | null>(null);
  const currentFolderName = useRef(folderName);
  const input = useRef<HTMLInputElement | null>(null);

  const { showMenu, xPos, yPos, closeMenu } = useContextMenu(
    folder
    // contextMenuHandler
  );

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

  useEffect(() => {
    if (editMode) {
      input.current?.focus();
      input.current?.select();
    }
  }, [editMode]);

  /**
   * "Opens" the folder you just clicked on and executes the necessary code
   * in order to display the content properly.
   */
  const handleOnClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (showMenu) return;

    const fullFilePath = currentFilePath
      ? `${currentFilePath}/${value}`
      : folderName;

    dispatch(setCurrentFilepath(fullFilePath));

    dispatch(
      setCurrentLayerOfFilepaths(
        openFolderAndMakeContentAccessible(folderContent, folderName)
      )
    );
  };

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(updateFolderName(currentFolderName.current, value));
    toggleEditMode();
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <div
      aria-hidden="true"
      className={displayFolderStyle}
      onClick={handleOnClick}
      role="button"
      tabIndex={0}
      ref={folder}
    >
      <span className="icon">📁</span>
      {editMode ? (
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            value={value}
            onChange={handleOnChange}
            ref={input}
          />
        </form>
      ) : (
        <h2 className="name">{value}</h2>
      )}
      {showMenu && (
        <ContextMenu
          xPos={xPos}
          yPos={yPos}
          close={closeMenu}
          toggleRename={toggleEditMode}
          contextMenuType="FOLDER"
        />
      )}
    </div>
  );
};

export default Folder;
