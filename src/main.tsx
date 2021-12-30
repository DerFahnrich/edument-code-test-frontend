import React from "react";
import ReactDOM from "react-dom";

import FileSystemProvider from "context/FileSystemProvider";

import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<FileSystemProvider>
			<App />
		</FileSystemProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
