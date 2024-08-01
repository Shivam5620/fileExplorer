// FileContent.js
import React from "react";

const FileContent = ({ file }) => {
  if (!file) {
    return <div>Select a file to view its content</div>;
  }

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-2">{file.name}</h2>
      <div className="whitespace-pre-wrap">{file.content || "No content available"}</div>
    </div>
  );
};

export default FileContent;
