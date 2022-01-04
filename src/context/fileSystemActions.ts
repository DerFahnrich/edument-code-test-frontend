import IAction from "./interfaces/IAction";

/* #### Action constans #### */
export const SET_CURRENT_FILEPATH = "SET_CURRENT_FILEPATH";
export const SET_CURRENT_LAYER_OF_FILE_PATHS =
  "SET_CURRENT_LAYER_OF_FILE_PATHS";

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
