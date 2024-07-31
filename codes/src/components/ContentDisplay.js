// src/components/ContentDisplay.js
import React from 'react';

const ContentDisplay = ({ selectedItem }) => {
  return (
    <div style={{marginLeft:"200px"}}>
      {selectedItem ? (
        <div >
          <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
          <p>{selectedItem.isFolder ? 'This is a folder.' : 'This is a file.'}</p>
        </div>
      ) : (
        <p>Select a file or folder to view details.</p>
      )}
    </div>
  );
};

export default ContentDisplay;
