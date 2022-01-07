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
import { updateFileName } from "../../context/fileSystemActions";

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
    state: { display, currentFilePath, currentLayerOfFilePaths },
    dispatch,
  } = useContext(FileSystemContext);

  const { showMenu, xPos, yPos, closeMenu } = useContextMenu(fileItem);

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

  useEffect(() => {
    if (editMode) {
      input.current?.focus();
      input.current?.select();
    }
  }, [editMode]);

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(updateFileName(currentFileName.current, value));
    toggleEditMode();
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={displayFileStyle} ref={fileItem}>
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
