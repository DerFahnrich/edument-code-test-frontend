interface useFolderOperationsReturnType {
  openFolderAndMakeContentAccessible: (
    folder: string[],
    folderName: string
  ) => string[];
}

function useFolderOperations(): useFolderOperationsReturnType {
  /**
   *
   * @param folder The folder that is supposed to be opened. The folder is packaged as a string array.
   * @param folderName The name of the folder, or rather the path to the folder.
   * @returns The opened folder and its content packaged as a string array.
   */
  const openFolderAndMakeContentAccessible = (
    folder: string[],
    folderName: string
  ): string[] => {
    return folder.map((path) => {
      if (folderName) {
        return path.replace(`${folderName}/`, "");
      }
      return path;
    });
  };

  return { openFolderAndMakeContentAccessible };
}

export default useFolderOperations;
