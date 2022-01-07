/* eslint-disable react/require-default-props */

import React, { useRef } from "react";

import useOnClickOutside from "../../hooks/useOnClickOutside";
import IMenuChoice from "./interfaces/IMenuChoice";

import { TContexMenuType } from "./types/TContextMenuType";

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

  useOnClickOutside(contextMenu, close);

  const changeName = () => {
    if (toggleRename) {
      toggleRename();
      close();
    }
  };
  const remove = () => {
    console.log("remove");
  };
  const newFolder = () => {
    console.log("newFolder");
  };
  const newFile = () => {
    console.log("newFile");
  };

  const contextMenuFolderFileChoices: IMenuChoice[] = [
    { text: "Byt namn", callback: changeName },
    { text: "Ta bort", callback: remove },
    { text: "Ny Mapp", callback: newFolder },
    { text: "Ny Fil", callback: newFile },
  ];

  const contextMenuOtherChoices: IMenuChoice[] = [
    { text: "Byt namn", callback: changeName },
    { text: "Ta bort", callback: remove },
    { text: "Ny Mapp", callback: newFolder },
    { text: "Ny Fil", callback: newFile },
  ];

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
        <span
          aria-hidden="true"
          className="menu-choice"
          key={menuChoice.text}
          onClick={menuChoice.callback}
        >
          {menuChoice.text}
        </span>
      ))}
    </div>
  );
};

export default ContextMenu;
