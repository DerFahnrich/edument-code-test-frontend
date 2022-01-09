import IAction from "./interfaces/IAction";
import { TDisplay } from "./types/TDisplay";

/* #### Action constants #### */
export const CREATE_NEW_FILE = "CREATE_NEW_FILE";
export const CREATE_NEW_FOLDER = "CREATE_NEW_FOLDER";
export const REMOVE_FILE = "REMOVE_FILE";
export const REMOVE_FOLDER = "REMOVE_FOLDER";
export const SET_CURRENT_FILEPATH = "SET_CURRENT_FILEPATH";
export const SET_CURRENT_LAYER_OF_FILE_PATHS =
  "SET_CURRENT_LAYER_OF_FILE_PATHS";
export const SET_DISPLAY_VALUE = "SET_DISPLAY_VALUE";
export const SET_FILE_TO_REMOVE = "SET_FILE_TO_REMOVE";
export const SET_FOLDER_TO_REMOVE = "SET_FOLDER_TO_REMOVE";
export const UPDATE_FILE_NAME = "UPDATE_FILE_NAME";
export const UPDATE_FOLDER_NAME = "UPDATE_FOLDER_NAME";

/* #### Action creators #### */
export const createNewFile = (): IAction => {
  return { type: CREATE_NEW_FILE };
};

export const createNewFolder = (): IAction => {
  return { type: CREATE_NEW_FOLDER };
};

export const removeFile = (fileToRemove: string): IAction => {
  return { type: REMOVE_FILE, payload: fileToRemove };
};

export const removeFolder = (folderToRemove: string[]): IAction => {
  return { type: REMOVE_FOLDER, payload: folderToRemove };
};

export const setCurrentFilepath = (currentFilepath: string): IAction => {
  return { type: SET_CURRENT_FILEPATH, payload: currentFilepath };
};

export const setCurrentLayerOfFilepaths = (
  currentLayerOfFilepaths: string[]
): IAction => {
  return {
    type: SET_CURRENT_LAYER_OF_FILE_PATHS,
    payload: currentLayerOfFilepaths,
  };
};

export const setDisplayValue = (displayValue: TDisplay): IAction => {
  return { type: SET_DISPLAY_VALUE, payload: displayValue };
};

export const setFileToRemove = (fileToRemove: string): IAction => {
  return { type: SET_FILE_TO_REMOVE, payload: fileToRemove };
};

export const setFolderToRemove = (folderpathsToRemove: string[]): IAction => {
  return { type: SET_FOLDER_TO_REMOVE, payload: folderpathsToRemove };
};

export const updateFileName = (
  oldFileName: string,
  newFileName: string
): IAction => {
  return { type: UPDATE_FILE_NAME, payload: { oldFileName, newFileName } };
};

export const updateFolderName = (
  oldFolderName: string,
  newFolderName: string
): IAction => {
  return {
    type: UPDATE_FOLDER_NAME,
    payload: { oldFolderName, newFolderName },
  };
};
