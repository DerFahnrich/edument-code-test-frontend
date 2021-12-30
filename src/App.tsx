import { useContext } from "react";

import { FileSystemContext } from "./context/FileSystemProvider";

import Filepath from "./components/filepath-banner/Filepath";
import FileSystemOverview from "./components/file-system-overview/FileSystemOverview";

const App = () => {
	const {
		state: { currentFilePath },
	} = useContext(FileSystemContext);

	return (
		<div className="App">
			<Filepath filepath={currentFilePath} />
			<FileSystemOverview />
		</div>
	);
};

export default App;
