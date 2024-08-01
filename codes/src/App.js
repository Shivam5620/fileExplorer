// App.js
import React from "react";
import { connect } from "react-redux";
import ConnectedFileExploere from "./components/FileExploere";

const App = ({ folderData, onFileClick }) => {
  return (
    <div className="App">
      {folderData.map((folder) => (
        <ConnectedFileExploere
          key={folder.id}
          FolderData={folder}
          onFileClick={onFileClick}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  folderData: state.folderData,
});

export default connect(mapStateToProps)(App);
