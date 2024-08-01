import React from "react";

const FileViewer = ({ file }) => {
  if (!file) {
    return <div>Select a file to view its content</div>;
  }

  return (
    <div>
      <h2>{file.name}</h2>
      {file.type === "file" ? (
        <div>
          {/* You can add more detailed file content display here */}
          <p>This is the content of the file {file.name}</p>
        </div>
      ) : (
        <div>This is a folder. Click on a file to view its content.</div>
      )}
    </div>
  );
};

export default FileViewer;
