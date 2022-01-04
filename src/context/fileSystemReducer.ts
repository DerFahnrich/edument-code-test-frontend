import IAction from "./interfaces/IAction";
import IFileSystemState from "./interfaces/IFileSystemState";

import {
  SET_CURRENT_FILEPATH,
  SET_CURRENT_LAYER_OF_FILE_PATHS,
} from "./fileSystemActions";

function fileSystemReducer(
  state: IFileSystemState,
  action: IAction
): IFileSystemState {
  const args: [IFileSystemState, IAction] = [state, action];

  switch (action.type) {
    case SET_CURRENT_FILEPATH:
      return setCurrentFilepath(...args);
    case SET_CURRENT_LAYER_OF_FILE_PATHS:
      return setCurrentLayerOfFilePaths(...args);
    default:
      return state;
  }
}

export default fileSystemReducer;

function setCurrentFilepath(
  state: IFileSystemState,
  action: IAction
): IFileSystemState {
  return { ...state, currentFilePath: action.payload };
}

function setCurrentLayerOfFilePaths(
  state: IFileSystemState,
  action: IAction
): IFileSystemState {
  return { ...state, currentLayerOfFilePaths: action.payload };
}
