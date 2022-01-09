import React, {
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

import useToggle from "../../hooks/useToggle";
import useContextMenu from "../../hooks/useContextMenu";
import ContextMenu from "../context-menu/ContextMenu";

import { FileSystemContext } from "../../context/FileSystemProvider";
import {
  updateFileName,
  setFileToRemove,
} from "../../context/fileSystemActions";

interface IFileItemProps {
  fileName: string;
}

const FileItem = ({ fileName }: IFileItemProps): JSX.Element => {
  const [value, setValue] = useState(fileName);
  const [editMode, toggleEditMode] = useToggle(false);
  const currentFileName = useRef(fileName);
  const fileItem = useRef<HTMLDivElement | null>(null);
  const input = useRef<HTMLInputElement | null>(null);

  const {
    state: { display, currentFilePath },
    dispatch,
  } = useContext(FileSystemContext);

  /**
   * This method is invoked when the contextMenu is opened.
   */
  const contexMenuCallback = useCallback(() => {
    if (currentFilePath) {
      dispatch(setFileToRemove(`${currentFilePath}/${value}`));
    } else {
      dispatch(setFileToRemove(value));
    }
  }, [currentFilePath, dispatch, value]);

  const { showMenu, xPos, yPos, closeMenu } = useContextMenu(
    fileItem,
    contexMenuCallback
  );

  const displayFileStyle = useMemo(() => {
    switch (display) {
      case "ICONS":
        return "file display-icons";
      case "LIST":
        return "file display-list";
      default:
        return "file display-icons";
    }
  }, [display]);

  const displayIcon = useMemo(() => {
    const suffix = value.split(".").pop();

    if (suffix === "png") {
      return "portrait";
    }
    if (suffix === "pdf") {
      return "picture_as_pdf";
    }
    return "text_snippet";
  }, [value]);

  useEffect(() => {
    if (editMode) {
      input.current?.focus();
      input.current?.select();
    }
  }, [editMode]);

  const resetData = () => {
    setValue(currentFileName.current);
    toggleEditMode();
  };

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(updateFileName(currentFileName.current, value));
    toggleEditMode();
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleOnKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.target === input.current) {
      if (e.code === "Escape") {
        resetData();
      }
    }
  };

  return (
    <div className={displayFileStyle} ref={fileItem}>
      <span className="icon material-icons">{displayIcon}</span>
      {editMode ? (
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            value={value}
            onChange={handleOnChange}
            onKeyUp={handleOnKeyUp}
            ref={input}
          />
        </form>
      ) : (
        <h2 className="file-name">{value}</h2>
      )}
      {showMenu && (
        <ContextMenu
          xPos={xPos}
          yPos={yPos}
          close={closeMenu}
          toggleRename={toggleEditMode}
          contextMenuType="FILE"
        />
      )}
    </div>
  );
};

export default FileItem;
