import IAction from "./interfaces/IAction";
import IFileSystemState from "./interfaces/IFileSystemState";

import {
  SET_CURRENT_FILEPATH,
  SET_CURRENT_LAYER_OF_FILE_PATHS,
  SET_DISPLAY_VALUE,
  UPDATE_FILE_NAME,
  UPDATE_FOLDER_NAME,
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
    case SET_DISPLAY_VALUE:
      return setDisplayValue(...args);
    case UPDATE_FILE_NAME:
      return updateFileName(...args);
    case UPDATE_FOLDER_NAME:
      return updateFolderName(...args);
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

function setDisplayValue(
  state: IFileSystemState,
  action: IAction
): IFileSystemState {
  return { ...state, display: action.payload };
}

function updateFileName(
  state: IFileSystemState,
  action: IAction
): IFileSystemState {
  const {
    oldFileName,
    newFileName,
  }: { oldFileName: string; newFileName: string } = action.payload;
  // Create a copy of the state.filepaths to manipulate.
  const filePathsCopy = [...state.filepaths];

  // Get the filepath that will be renamed from the filepaths.
  const filePathToRename = state.filepaths.find((filepath) =>
    filepath.includes(oldFileName)
  );

  // Check if the file exists and is inside a folder or folders, than we need to do
  // some extra in order to access the actual file.
  if (filePathToRename && filePathToRename.includes("/")) {
    // Convert to array for easier manipulations. It will be converted back
    // to a string in the end.
    const filePathToRenameAsArray = filePathToRename.split("/");

    // The pop() removes the actual filename since it's always at the end.
    filePathToRenameAsArray.pop();

    // Push() justs add the new filename to the end.
    filePathToRenameAsArray.push(newFileName);

    // Index is needed in order to replace the old filepath with the new
    // at the same index place.
    const indexOfFilePathToRename = filePathsCopy.findIndex(
      (filePath) => filePath === filePathToRename
    );

    // The splice method handles the replacement.
    filePathsCopy.splice(
      indexOfFilePathToRename,
      1,
      filePathToRenameAsArray.join("/")
    );

    // The else handles if the file exists and is in the top layer of filepaths.
  } else if (filePathToRename) {
    // Get the index position of the filepath to be renamed.
    const indexOfFilePathToRename = filePathsCopy.findIndex(
      (filePath) => filePath === filePathToRename
    );

    // Replace the existing filepath with the renamed filepath.
    filePathsCopy.splice(indexOfFilePathToRename, 1, newFileName);
  }

  return { ...state, filepaths: filePathsCopy };
}

function updateFolderName(
  state: IFileSystemState,
  action: IAction
): IFileSystemState {
  const {
    oldFolderName,
    newFolderName,
  }: { oldFolderName: string; newFolderName: string } = action.payload;
  // Create a copy of the state.filepaths to manipulate.
  let filepathsCopy = [...state.filepaths];

  // Find all the filepaths containing the old folder name with the trailing
  // slash included ("dc/" for example)
  let filepathsToRename = filepathsCopy.filter((filepath) =>
    filepath.includes(`${oldFolderName}/`)
  );

  // Replace the old folder name with the new folder name in all filepaths.
  filepathsToRename = filepathsToRename.map((filepath) =>
    filepath.replace(`${oldFolderName}/`, `${newFolderName}/`)
  );

  // Remove all the filepaths containg the old folder name with the trailing slash.
  filepathsCopy = filepathsCopy.filter(
    (filepath) => !filepath.includes(`${oldFolderName}/`)
  );

  // Add the renamed filepaths to filepathsCopy.
  filepathsCopy.push(...filepathsToRename);

  return { ...state, filepaths: filepathsCopy };
}
