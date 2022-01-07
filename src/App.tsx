import React from "react";
import FilepathBanner from "./components/filepath-banner/FilepathBanner";
import FileSystemDisplay from "./components/file-system-display/FileSystemDisplay";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <FilepathBanner />
      <FileSystemDisplay />
    </div>
  );
};

export default App;
