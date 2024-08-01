import React, { useState } from "react";
import { connect } from "react-redux";
import ConnectedFileExplorer from "./components/FileExploere";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileContent from './components/FileContent'
const App = ({ folderData }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className="App flex">
      <div className="w-1/3 bg-gray-100 p-4 border-r border-gray-200">
        {folderData.map((folder) => (
          <ConnectedFileExplorer
            key={folder.id}
            FolderData={folder}
            onFileClick={handleFileClick}
          />
        ))}
      </div>
      <div className="w-2/3 p-4" style={{display:"flex",justifyContent:"center", marginTop:"-200px"}}>
        <FileContent file={selectedFile} />
      </div>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  folderData: state.folderData,
});

export default connect(mapStateToProps)(App);
