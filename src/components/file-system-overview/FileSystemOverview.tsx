import { useContext, useMemo } from "react";

import { FileSystemContext } from "../../context/FileSystemProvider";

const FileSystemOverview = () => {
	const {
		state: { filepaths },
		getCurrentLayerOfMapsAndFiles,
	} = useContext(FileSystemContext);

	console.log(getCurrentLayerOfMapsAndFiles(filepaths));

	return <div className="file-system-overview"></div>;
};

export default FileSystemOverview;
