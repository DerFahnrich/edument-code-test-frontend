import React, { useContext } from "react";

import { FileSystemContext } from "./context/FileSystemProvider";

import Filepath from "./components/filepath-banner/Filepath";
import FileSystemDisplay from "./components/file-system-display/FileSystemDisplay";

const App = (): JSX.Element => {
  const {
    state: { currentFilePath },
  } = useContext(FileSystemContext);

  return (
    <div className="App">
      <Filepath filepath={currentFilePath} />
      <FileSystemDisplay />
    </div>
  );
};

export default App;
