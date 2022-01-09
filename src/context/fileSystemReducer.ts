/* eslint-disable no-plusplus */

import IAction from "./interfaces/IAction";
import IFileSystemState from "./interfaces/IFileSystemState";

import {
  CREATE_NEW_FILE,
  CREATE_NEW_FOLDER,
  REMOVE_FILE,
  REMOVE_FOLDER,
  SET_CURRENT_FILEPATH,
  SET_CURRENT_LAYER_OF_FILE_PATHS,
  SET_DISPLAY_VALUE,
  SET_FILE_TO_REMOVE,
  SET_FOLDER_TO_REMOVE,
  UPDATE_FILE_NAME,
  UPDATE_FOLDER_NAME,
} from "./fileSystemActions";

function fileSystemReducer(
  state: IFileSystemState,
  action: IAction
): IFileSystemState {
  const args: [IFileSystemState, IAction] = [state, action];

  switch (action.type) {
    case CREATE_NEW_FILE:
      return createNewFile(state);
    case CREATE_NEW_FOLDER:
      return createNewFolder(state);
    case REMOVE_FILE:
      return removeFile(...args);
    case REMOVE_FOLDER:
      return removeFolder(...args);
    case SET_CURRENT_FILEPATH:
      return setCurrentFilepath(...args);
    case SET_CURRENT_LAYER_OF_FILE_PATHS:
      return setCurrentLayerOfFilePaths(...args);
    case SET_DISPLAY_VALUE:
      return setDisplayValue(...args);
    case SET_FILE_TO_REMOVE:
      return setFileToRemove(...args);
    case SET_FOLDER_TO_REMOVE:
      return setFolderToRemove(...args);
    case UPDATE_FILE_NAME:
      return updateFileName(...args);
    case UPDATE_FOLDER_NAME:
      return updateFolderName(...args);
    default:
      return state;
  }
}

export default fileSystemReducer;

function createNewFile(state: IFileSystemState): IFileSystemState {
  // Create copies for manipulation.
  const filepathsCopy = [...state.filepaths];
  const currentLayerOfFilePathsCopy = state.currentLayerOfFilePaths
    ? [...state.currentLayerOfFilePaths]
    : undefined;

  // Get the standard name for a new file.
  const newFileName = getNewFileOrFolderName(state, "FILE");

  if (state.currentFilePath && currentLayerOfFilePathsCopy) {
    filepathsCopy.push(`${state.currentFilePath}/${newFileName}`);
    currentLayerOfFilePathsCopy.push(newFileName);
  } else if (currentLayerOfFilePathsCopy) {
    filepathsCopy.push(`${newFileName}`);
    currentLayerOfFilePathsCopy.push(newFileName);
  } else {
    filepathsCopy.push(`${newFileName}`);
  }

  return {
    ...state,
    filepaths: filepathsCopy,
    currentLayerOfFilePaths: currentLayerOfFilePathsCopy,
  };
}

function createNewFolder(state: IFileSystemState): IFileSystemState {
  // Create copies for manipulation.
  const filepathsCopy = [...state.filepaths];
  const currentFilePath = state.currentFilePath
    ? state.currentFilePath
    : undefined;
  const currentLayerOfFilePathsCopy = state.currentLayerOfFilePaths
    ? [...state.currentLayerOfFilePaths]
    : undefined;

  const newFolderName = getNewFileOrFolderName(state, "FOLDER");

  if (currentFilePath && currentLayerOfFilePathsCopy) {
    currentLayerOfFilePathsCopy.push(newFolderName);
    filepathsCopy.push(`${currentFilePath}/${newFolderName}`);
  } else if (currentLayerOfFilePathsCopy) {
    currentLayerOfFilePathsCopy.push(newFolderName);
    filepathsCopy.push(newFolderName);
  } else {
    filepathsCopy.push(newFolderName);
  }

  return {
    ...state,
    filepaths: filepathsCopy,
    currentLayerOfFilePaths: currentLayerOfFilePathsCopy,
  };
}

function removeFile(
  state: IFileSystemState,
  action: IAction
): IFileSystemState {
  // Create copies of filepaths and currentLayerOfFilePaths for manipulation and a variable
  // from the payload for easier access.
  const fileToRemove: string = action.payload;
  let filepathsCopy = [...state.filepaths];
  let currentLayerOfFilePathsCopy = state.currentLayerOfFilePaths
    ? [...state.currentLayerOfFilePaths]
    : undefined;

  // Remove the fileToRemove from filepathsCopy.
  filepathsCopy = filepathsCopy.filter((filepath) => filepath !== fileToRemove);

  if (currentLayerOfFilePathsCopy) {
    // Remove the fileToRemove from currentLayerOfFilePathsCopy.
    currentLayerOfFilePathsCopy = currentLayerOfFilePathsCopy.filter(
      (filepath) =>
        filepath !== fileToRemove.split(`${state.currentFilePath}/`)[1]
    );
  }

  return {
    ...state,
    filepaths: filepathsCopy,
    currentLayerOfFilePaths: currentLayerOfFilePathsCopy,
  };
}

function removeFolder(
  state: IFileSystemState,
  action: IAction
): IFileSystemState {
  // Create a copies from the state to manipulate and a variables the payload for easier access.
  const filepathsCopy = [...state.filepaths];
  const currentLayerOfFilePathsCopy = state.currentLayerOfFilePaths
    ? [...state.currentLayerOfFilePaths]
    : undefined;
  const folderpathsToRemove: string[] = action.payload;

  // Create two arrays to store the indexes of the folderpaths, both from state.filepaths
  // and state.currentLayerOfFilePaths because they need to be removed from both.
  const folderpathIndexes: number[] = [];
  const currentLayerOfFilePathsIndexes: number[] = [];

  // Find the index positions of the folderpaths in state.filepaths and
  // put in folderpathIndexes.
  folderpathsToRemove.forEach((folderPath) => {
    const index = state.filepaths.indexOf(folderPath);
    if (index !== -1) {
      folderpathIndexes.push(index);
    }
  });

  // Loop through folderpathsIndexes and use splice to remove those indexes from
  // filepathsCopy.
  for (let i = folderpathIndexes.length - 1; i >= 0; i--) {
    filepathsCopy.splice(folderpathIndexes[i], 1);
  }

  if (currentLayerOfFilePathsCopy) {
    // Find the index positions of the folderpaths in currentLayerOfFilePathsCopy and
    // put in currentLayerOfFilePathsIndexes. I make sure to take the state.currentFilePath
    // into account as well
    folderpathsToRemove.forEach((folderpath) => {
      const index = currentLayerOfFilePathsCopy.indexOf(
        folderpath.split(`${state.currentFilePath}/`)[1]
      );

      if (index !== -1) {
        currentLayerOfFilePathsIndexes.push(index);
      }
    });

    // Loop through currentLayerOfFilePathsIndexes and use splice to remove those indexes from
    // currentLayerOfFilePathsCopy.
    for (let i = currentLayerOfFilePathsIndexes.length - 1; i >= 0; i--) {
      currentLayerOfFilePathsCopy.splice(currentLayerOfFilePathsIndexes[i], 1);
    }
  }

  return {
    ...state,
    filepaths: filepathsCopy,
    currentLayerOfFilePaths: currentLayerOfFilePathsCopy,
  };
}

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

function setFileToRemove(
  state: IFileSystemState,
  action: IAction
): IFileSystemState {
  return {
    ...state,
    contextMenu: { ...state.contextMenu, fileToRemove: action.payload },
  };
}

function setFolderToRemove(
  state: IFileSystemState,
  action: IAction
): IFileSystemState {
  return {
    ...state,
    contextMenu: { ...state.contextMenu, folderToRemove: action.payload },
  };
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
  let currentLayerOfFilePathsCopy = state.currentLayerOfFilePaths
    ? [...state.currentLayerOfFilePaths]
    : undefined;

  // Find all the filepaths in filepathsCopy containing the old folder name with the trailing
  // slash included if they have any content ("dc/" for example), otherwise
  // just all filepaths that ends with the old folder name.
  let filepathsToRename = filepathsCopy.filter(
    (filepath) =>
      filepath.includes(`${oldFolderName}/`) || filepath.endsWith(oldFolderName)
  );

  // Replace the old folder name with the new folder name in all filepaths that
  // has content.
  filepathsToRename = filepathsToRename.map((filepath) =>
    filepath.replace(`${oldFolderName}/`, `${newFolderName}/`)
  );

  // Replace the old folder name with the new folder name in all filepaths that
  // ends with the old folder name.
  const regex = new RegExp(`${oldFolderName}$`);
  filepathsToRename = filepathsToRename.map((filepath) =>
    filepath.replace(regex, newFolderName)
  );

  // The same procedure for currentLayerOfFilePathsCopy.
  let currentLayerOfFilePathsToRename: string[] = [];

  if (currentLayerOfFilePathsCopy) {
    currentLayerOfFilePathsToRename = currentLayerOfFilePathsCopy.filter(
      (filepath) =>
        filepath.includes(`${oldFolderName}/`) ||
        filepath.endsWith(oldFolderName)
    );

    currentLayerOfFilePathsToRename = currentLayerOfFilePathsToRename.map(
      (filepath) => filepath.replace(`${oldFolderName}/`, `${newFolderName}/`)
    );

    const regexForCurrentLayer = new RegExp(`${oldFolderName}$`);
    currentLayerOfFilePathsToRename = currentLayerOfFilePathsToRename.map(
      (filepath) => filepath.replace(regexForCurrentLayer, newFolderName)
    );
  }

  // Remove all the filepaths containg the old folder name with the trailing slash
  // and the filepaths that end in the old folder name.
  filepathsCopy = filepathsCopy.filter(
    (filepath) => !filepath.includes(`${oldFolderName}/`)
  );

  filepathsCopy = filepathsCopy.filter(
    (filepath) => !filepath.endsWith(oldFolderName)
  );

  // The same procedure for currentLayerOfFilePathsCopy.
  if (currentLayerOfFilePathsCopy) {
    currentLayerOfFilePathsCopy = currentLayerOfFilePathsCopy.filter(
      (filepath) => !filepath.includes(`${oldFolderName}/`)
    );

    currentLayerOfFilePathsCopy = currentLayerOfFilePathsCopy.filter(
      (filepath) => !filepath.endsWith(oldFolderName)
    );
  }

  // Add the renamed filepaths to filepathsCopy and currentLayerOfFilePathsCopy.
  filepathsCopy.push(...filepathsToRename);

  if (currentLayerOfFilePathsCopy) {
    currentLayerOfFilePathsCopy.push(...currentLayerOfFilePathsToRename);
  }

  return {
    ...state,
    filepaths: filepathsCopy,
    currentLayerOfFilePaths: currentLayerOfFilePathsCopy,
  };
}

/* ########## Helper functions ########## */
function getNewFileOrFolderName(
  state: IFileSystemState,
  type: "FILE" | "FOLDER"
): string {
  switch (type) {
    case "FILE":
      return createNewFileName(state);
    case "FOLDER":
      return createNewFolderName(state);
    default:
      return "new file.txt";
  }
}

function createNewFileName(state: IFileSystemState): string {
  // Create variable for easier access.
  const currentFilePath = state.currentFilePath
    ? state.currentFilePath
    : undefined;

  // Check if currentFilePath is defined.
  if (currentFilePath) {
    // Find all the files in the currentFilePath.
    const allFilesInCurrentFilePath = state.filepaths
      .filter((filepath) => filepath.includes(`${currentFilePath}/`))
      .map((filepath) => filepath.split(`${currentFilePath}/`).pop());

    // Create a new name, try the name out in a loop till it's unique.
    let i = 1;
    let newFileName = "new file.txt";
    while (allFilesInCurrentFilePath.includes(newFileName)) {
      newFileName = `new file(${i}).txt`;
      i++;
    }

    return newFileName;
  }

  // If we have no currentFilePath, then we are at the top and we can filter
  // out all the files from there.
  const allFiles = state.filepaths.filter(
    (filepath) => !filepath.includes("/")
  );

  // Same thing here, loop till the name is unique.
  let i = 1;
  let newFileName = "new file.txt";
  while (allFiles.includes(newFileName)) {
    newFileName = `new file(${i}).txt`;
    i++;
  }

  return newFileName;
}

function createNewFolderName(state: IFileSystemState): string {
  const currentFilePath = state.currentFilePath
    ? state.currentFilePath
    : undefined;

  // Filter out all the unique folders in the currentFilePath, if the
  // currentFilePath is undefined, than we just check the top level.
  const allFoldersInCurrentFilepath = [
    ...new Set(
      state.filepaths
        .filter((filepath) => filepath.startsWith(currentFilePath || ""))
        .map((filepath) => filepath.replace(`${currentFilePath}/`, ""))
        .filter((filepath) => filepath.includes("/") || !filepath.includes("."))
        .map((filepath) => filepath.split("/").shift())
    ),
  ];

  // Same thing here, loop till the name is unique.
  let i = 1;
  let newFolderName = "new folder";
  while (allFoldersInCurrentFilepath.includes(newFolderName)) {
    newFolderName = `new folder(${i})`;
    i++;
  }

  return newFolderName;
}
