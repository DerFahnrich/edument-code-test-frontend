import React, { createContext, useReducer } from "react";

import IFileSystemContext from "./interfaces/IFileSystemContext";
import IContext from "./interfaces/IContext";
import fileSystemReducer from "./fileSystemReducer";

export const FileSystemContext = createContext<IFileSystemContext>(
  {} as IFileSystemContext
);

const FileSystemProvider = ({ children }: IContext): JSX.Element => {
  const [state, dispatch] = useReducer(fileSystemReducer, {
    display: "ICONS",
    filepaths: [
      "marvel/black_widow/bw.png",
      "marvel/drdoom/the-doctor.png",
      "fact_marvel_beats_dc.txt",
      "dc/aquaman/mmmmmomoa.png",
      "marvel/black_widow/why-the-widow-is-awesome.txt",
      "dc/aquaman/movie-review-collection.txt",
      "marvel/marvel_logo.png",
      "dc/character_list.txt",
    ],
    contextMenu: {
      showMenu: false,
      xPos: "0px",
      yPos: "0px",
    },
  });

  const values = {
    state,
    dispatch,
  };

  return (
    <FileSystemContext.Provider value={values}>
      {children}
    </FileSystemContext.Provider>
  );
};

export default FileSystemProvider;
