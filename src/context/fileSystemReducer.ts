import IAction from "context/interfaces/IAction";
import IFileSystemState from "context/interfaces/IFileSystemState";

function fileSystemReducer(state: IFileSystemState, action: IAction): IFileSystemState {
	const args: [IFileSystemState, IAction] = [state, action];

	switch (action.type) {
		default:
			return state;
	}
}

export default fileSystemReducer;
