import { useContext } from "react";

import { FileSytemContext } from "context/FileSystemProvider";

const App = () => {
	const {} = useContext(FileSytemContext);

	return (
		<div className="App">
			<h1>Hejsan</h1>
		</div>
	);
};

export default App;
