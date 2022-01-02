import React from "react";

import FileItem from "../file-item/FileItem";
import Folder from "../folder/Folder";
import useFileOperations from "../../hooks/useFileOperations";

interface RenderCurrentFolderAndFilesProps {
  filepaths: string[];
}

const RenderCurrentFolderAndFiles = ({
  filepaths,
}: RenderCurrentFolderAndFilesProps): JSX.Element => {
  const { getCurrentLayerOfFoldersAndFiles } = useFileOperations();

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
