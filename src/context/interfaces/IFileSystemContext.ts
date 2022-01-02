import IAction from "./IAction";
import IFileSystemState from "./IFileSystemState";

export default interface IFileSystemContext {
  state: IFileSystemState;
  dispatch: React.Dispatch<IAction>;
}
