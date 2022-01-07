type TTypeOfFile = "FOLDER" | "FILE" | "WINDOW";

export default interface IContextMenu {
  showMenu: boolean;
  currentDirectory?: string;
  fileToEdit?: string;
  typeOfFile?: TTypeOfFile;
  xPos: string;
  yPos: string;
}
