import IContextMenu from "./IContextMenu";
import { TDisplay } from "../types/TDisplay";

export default interface IFileSystemState {
  currentFilePath?: string;
  currentLayerOfFilePaths?: string[];
  display: TDisplay;
  filepaths: string[];
  contextMenu: IContextMenu;
}
