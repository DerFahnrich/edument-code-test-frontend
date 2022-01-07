import IAction from "./interfaces/IAction";
import { TDisplay } from "./types/TDisplay";

/* #### Action constants #### */
export const SET_CURRENT_FILEPATH = "SET_CURRENT_FILEPATH";
export const SET_CURRENT_LAYER_OF_FILE_PATHS =
  "SET_CURRENT_LAYER_OF_FILE_PATHS";
export const SET_DISPLAY_VALUE = "SET_DISPLAY_VALUE";
export const UPDATE_FILE_NAME = "UPDATE_FILE_NAME";

/* #### Action creators #### */
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

export const updateFileName = (
  oldFileName: string,
  newFileName: string
): IAction => {
  return { type: UPDATE_FILE_NAME, payload: { oldFileName, newFileName } };
};
