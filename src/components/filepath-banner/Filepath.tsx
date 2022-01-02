import React from "react";

interface FilepathBannerProps {
  filepath: string;
}

const Filepath = ({ filepath }: FilepathBannerProps): JSX.Element => {
  const filepathSlashesInverted = filepath.replace("/", "\\");

  return (
    <nav>
      <input readOnly type="text" value={`C:\\${filepathSlashesInverted}`} />
    </nav>
  );
};

export default Filepath;
