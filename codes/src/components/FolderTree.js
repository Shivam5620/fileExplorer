// src/components/FolderTree.js
import React from 'react';
import FolderItem from './FolderItem';

function FolderTree({ explorerData, handleInsertNode, handleSelectItem, handleRenameItem, handleDeleteItem }) {
  return (
    <div>
      {explorerData.map((item) => (
        <FolderItem
          key={item.id}
          explorer={item}
          handleInsertNode={handleInsertNode}
          handleSelectItem={handleSelectItem}
          handleRenameItem={handleRenameItem}
          handleDeleteItem={handleDeleteItem}
        />
      ))}
    </div>
  );
}

export default FolderTree;
