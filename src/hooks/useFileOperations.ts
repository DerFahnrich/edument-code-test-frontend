interface UseFileOperationsReturnValue {
  getCurrentLayerOfFoldersAndFiles: (filepaths: string[]) => string[];
}

function useFileOperations(): UseFileOperationsReturnValue {
  /**
   * Filters the layer of filepaths that we are currently on and removes all
   * the duplicates so we have a clean list of the individual folders, and
   * the seperate files of the content.
   * @param filepaths
   * @returns A list of the filtered folders and all the files of the current layer.
   */
  const getCurrentLayerOfFoldersAndFiles = (filepaths: string[]): string[] => {
    return [
      ...new Set(
        filepaths.map((filepath) => {
          if (filepath.includes("/")) {
            return filepath.split("/").shift();
          }
          return filepath;
        })
      ),
    ] as string[];
  };

  return { getCurrentLayerOfFoldersAndFiles };
}

export default useFileOperations;
