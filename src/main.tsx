import React from "react";
import ReactDOM from "react-dom";

import FileSystemProvider from "./context/FileSystemProvider";

import App from "./App";

import "material-icons/iconfont/material-icons.css";
import "./assets/scss/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <FileSystemProvider>
      <App />
    </FileSystemProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
