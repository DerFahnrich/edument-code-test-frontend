import { createContext, useReducer } from "react";

import IFileSystemContext from "context/interfaces/IFileSystemContext";
import IContext from "context/interfaces/IContext";
import fileSystemReducer from "context/fileSystemReducer";

export const FileSytemContext = createContext<IFileSystemContext>({} as IFileSystemContext);

const FileSystemProvider = ({ children }: IContext) => {
	const [state, dispatch] = useReducer(fileSystemReducer, {
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
	});

	const values = {
		state,
		dispatch,
	};

	return <FileSytemContext.Provider value={values}>{children}</FileSytemContext.Provider>;
};

export default FileSystemProvider;
