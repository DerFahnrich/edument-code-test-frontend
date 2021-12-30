import { createContext, useReducer } from "react";

import IFileSystemContext from "./interfaces/IFileSystemContext";
import IContext from "./interfaces/IContext";
import fileSystemReducer from "./fileSystemReducer";

export const FileSystemContext = createContext<IFileSystemContext>({} as IFileSystemContext);

const FileSystemProvider = ({ children }: IContext) => {
	const [state, dispatch] = useReducer(fileSystemReducer, {
		currentFilePath: "",
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

	const getCurrentLayerOfMapsAndFiles = (filepaths: string[]): string[] =>
		[
			...new Set(
				filepaths.map((filepath) => {
					if (filepath.includes("/")) {
						return filepath.split("/").shift();
					} else {
						return filepath;
					}
				})
			),
		] as string[];

	const values = {
		state,
		dispatch,
		getCurrentLayerOfMapsAndFiles,
	};

	return <FileSystemContext.Provider value={values}>{children}</FileSystemContext.Provider>;
};

export default FileSystemProvider;
