import React, { useContext, useEffect, useMemo } from "react";
import useStateWithHistory from "../../hooks/useStateWithHistory";
import useFolderOperations from "../../hooks/useFolderOperations";
import { FileSystemContext } from "../../context/FileSystemProvider";

import {
  setCurrentFilepath,
  setCurrentLayerOfFilepaths,
} from "../../context/fileSystemActions";

const FilepathBanner = (): JSX.Element => {
  const { openFolderAndMakeContentAccessible } = useFolderOperations();
  const {
    state: { filepaths, currentFilePath },
    dispatch,
  } = useContext(FileSystemContext);

  const [filepath, setFilepath, { back, forward, history, pointer }] =
    useStateWithHistory(currentFilePath || "");

  const filepathSlashesInverted = useMemo(
    () => filepath.replace(/\//g, "\\"),
    [filepath]
  );

  /**
   * Goes back one slot in the filepath history and executes all the necessary
   * code in order to update the currentFilepath and the currentLayerOfFilepahts.
   */
  const handleOnLastClick: React.MouseEventHandler<HTMLSpanElement> = () => {
    const lastPath = history[pointer - 1];
    const filePathsToGoBackTo = filepaths.filter((path) =>
      path.startsWith(lastPath)
    );

    if (filePathsToGoBackTo.length) {
      dispatch(setCurrentFilepath(lastPath));
      dispatch(
        setCurrentLayerOfFilepaths(
          openFolderAndMakeContentAccessible(filePathsToGoBackTo, lastPath)
        )
      );
    }

    back();
  };

  /**
   * Goes forward one slot in the filepath history and executes all the necessary
   * code in order to update the currentFilepath and the currentLayerOfFilepahts.
   */
  const handleOnNextClick: React.MouseEventHandler<HTMLSpanElement> = () => {
    const nextPath = history[pointer + 1];
    const filePathsToGoTo = filepaths.filter((path) =>
      path.startsWith(nextPath)
    );

    if (filePathsToGoTo.length) {
      dispatch(setCurrentFilepath(nextPath));
      dispatch(
        setCurrentLayerOfFilepaths(
          openFolderAndMakeContentAccessible(filePathsToGoTo, nextPath)
        )
      );
    }

    forward();
  };

  useEffect(() => {
    if (currentFilePath) {
      setFilepath(currentFilePath);
    }
  }, [currentFilePath, setFilepath]);

  return (
    <nav className="filepath">
      <span
        aria-hidden="true"
        className="icon"
        role="button"
        onClick={handleOnLastClick}
      >
        ⏮️
      </span>
      <span
        aria-hidden="true"
        className="icon"
        role="button"
        onClick={handleOnNextClick}
      >
        ⏭️
      </span>
      <span className="path">C:\{filepathSlashesInverted}</span>
    </nav>
  );
};

export default FilepathBanner;
