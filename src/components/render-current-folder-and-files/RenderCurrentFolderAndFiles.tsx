import React from "react";

import FileItem from "../file-item/FileItem";
import Folder from "../folder/Folder";

interface RenderCurrentFolderAndFilesProps {
  filepaths: string[];
}

const RenderCurrentFolderAndFiles = ({
  filepaths,
}: RenderCurrentFolderAndFilesProps): JSX.Element => {
  /**
   * Filters the layer of filepaths that we are currently on and removes all
   * the duplicates so we have a clean list of the individual folders, and
   * the seperate files of the content.
   * @param paths
   * @returns A list of the filtered folders and all the files of the current layer.
   */
  const getCurrentLayerOfFoldersAndFiles = (paths: string[]): string[] => {
    return [
      ...new Set(
        paths.map((path) => {
          if (path.includes("/")) {
            return path.split("/").shift();
          }
          return path;
        })
      ),
    ] as string[];
  };

  /**
   * Takes the given filepaths parameter and renders a different type of JSX depending
   * on if it's a folder or a file.
   * @param paths
   * @returns The JSX created from the current layer's different folders and files.
   */
  const renderCurrentFoldersAndFiles = (paths: string[]): JSX.Element[] => {
    const currentLayerOfFoldersAndFiles =
      getCurrentLayerOfFoldersAndFiles(paths);

    return currentLayerOfFoldersAndFiles.map((currentItem): JSX.Element => {
      if (currentItem.includes(".")) {
        return <FileItem key={currentItem} name={currentItem} />;
      }

      const folderContent = paths.filter((path) =>
        path.startsWith(`${currentItem}/`)
      );

      return (
        <Folder
          key={currentItem}
          folderName={currentItem}
          folderContent={folderContent}
        />
      );
    });
  };

  return (
    <div className="render-current-folders-and-files">
      {renderCurrentFoldersAndFiles(filepaths)}
    </div>
  );
};

export default RenderCurrentFolderAndFiles;
