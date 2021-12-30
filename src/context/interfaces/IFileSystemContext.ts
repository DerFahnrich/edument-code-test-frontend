import IAction from "context/interfaces/IAction";
import IFileSystemState from "context/interfaces/IFileSystemState";

export default interface IFileSystemContext {
	state: IFileSystemState;
	dispatch: React.Dispatch<IAction>;
	getCurrentLayerOfMapsAndFiles: (filepaths: string[]) => string[];
}
