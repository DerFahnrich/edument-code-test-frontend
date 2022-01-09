/* eslint-disable react/require-default-props */

import React, { useRef, useContext, useCallback, useMemo } from "react";

import useOnClickOutside from "../../hooks/useOnClickOutside";
import IMenuChoice from "./interfaces/IMenuChoice";

import { FileSystemContext } from "../../context/FileSystemProvider";
import { TContexMenuType } from "./types/TContextMenuType";

import {
  removeFolder,
  removeFile,
  createNewFile,
  createNewFolder,
} from "../../context/fileSystemActions";

interface ContextMenuProps {
  xPos: string;
  yPos: string;
  close: () => void;
  toggleRename?: () => void;
  contextMenuType: TContexMenuType;
}

const ContextMenu = ({
  xPos,
  yPos,
  close,
  toggleRename,
  contextMenuType,
}: ContextMenuProps): JSX.Element => {
  const contextMenu = useRef(null);
  const {
    state: {
      contextMenu: { folderToRemove, fileToRemove },
    },
    dispatch,
  } = useContext(FileSystemContext);

  useOnClickOutside(contextMenu, close);

  const changeName = useCallback(() => {
    if (toggleRename) {
      toggleRename();
      close();
    }
  }, [close, toggleRename]);

  const remove = useCallback(() => {
    if (contextMenuType === "FOLDER" && folderToRemove) {
      dispatch(removeFolder(folderToRemove));
      close();
    }

    if (contextMenuType === "FILE" && fileToRemove) {
      dispatch(removeFile(fileToRemove));
      close();
    }
  }, [close, contextMenuType, dispatch, fileToRemove, folderToRemove]);

  const newFolder = useCallback(() => {
    dispatch(createNewFolder());
    close();
  }, [close, dispatch]);

  const newFile = useCallback(() => {
    dispatch(createNewFile());
    close();
  }, [close, dispatch]);

  const contextMenuFolderFileChoices: IMenuChoice[] = useMemo(
    () => [
      { text: "Byt namn", callback: changeName, icon: "edit" },
      { text: "Ta bort", callback: remove, icon: "delete" },
    ],
    [changeName, remove]
  );

  const contextMenuOtherChoices: IMenuChoice[] = useMemo(
    () => [
      { text: "Ny Mapp", callback: newFolder, icon: "create_new_folder" },
      { text: "Ny Fil", callback: newFile, icon: "add" },
    ],
    [newFile, newFolder]
  );

  let menuChoices: IMenuChoice[];

  switch (contextMenuType) {
    case "FILE":
    case "FOLDER":
      menuChoices = contextMenuFolderFileChoices;
      break;
    default:
      menuChoices = contextMenuOtherChoices;
      break;
  }

  return (
    <div
      className="context-menu"
      ref={contextMenu}
      style={{ top: yPos, left: xPos }}
    >
      {menuChoices.map((menuChoice) => (
        <div
          aria-hidden="true"
          className="menu-choice"
          onClick={menuChoice.callback}
          key={menuChoice.text}
        >
          <span className="icon material-icons">{menuChoice.icon}</span>
          <span className="choice">{menuChoice.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
