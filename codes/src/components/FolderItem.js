// src/components/FolderItem.js
import React, { useState } from 'react';
import { FaFolder, FaFile, FaPen, FaTrash, FaPlus } from 'react-icons/fa';

function FolderItem({ explorer, handleInsertNode, handleSelectItem, handleRenameItem, handleDeleteItem }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');

  const handleNewItem = (isFolder) => {
    setShowInput(true);
    setExpand(true);
  };

  const onAddItem = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput(false);
    }
  };

  const startRename = () => {
    setNewName(explorer.name);
    setEditMode(true);
  };

  const finishRename = (e) => {
    if (e.key === 'Enter' && newName) {
      handleRenameItem(explorer.id, newName);
      setEditMode(false);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    handleDeleteItem(explorer.id);
  };

  return (
    <div>
      <div
        onClick={() => {
          setExpand(!expand);
          handleSelectItem(explorer);
        }}
        className={`flex items-center justify-between p-2 mb-1 cursor-pointer ${explorer.isFolder ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-300`}
      >
        <div className="flex items-center gap-2">
          {explorer.isFolder ? <FaFolder /> : <FaFile />}
          {editMode ? (
            <input
              type="text"
              value={newName}
              className="border p-1 ml-2"
              autoFocus
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={finishRename}
              onBlur={() => setEditMode(false)}
            />
          ) : (
            <span>{explorer.name}</span>
          )}
        </div>
        {explorer.isFolder && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNewItem(true)}
              className="text-sm bg-white border p-1 rounded flex items-center"
            >
              <FaPlus className="mr-1" /> <FaFolder/>
            </button>
            <button
              onClick={() => handleNewItem(false)}
              className="text-sm bg-white border p-1 rounded flex items-center"
            >
              <FaPlus className="mr-1" /> <FaFile/>
            </button>
            <button
              onClick={startRename}
              className="text-sm bg-white border p-1 rounded flex items-center"
            >
              <FaPen />
            </button>
            <button
              onClick={handleDelete}
              className="text-sm bg-white border p-1 rounded flex items-center"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {expand && (
        <div className="ml-4">
          {showInput && (
            <div className="flex items-center gap-2 mb-2">
              <span>{showInput.isFolder ? <FaFolder /> : <FaFile />}</span>
              <input
                type="text"
                className="border p-1 flex-1"
                autoFocus
                onKeyDown={onAddItem}
                onBlur={() => setShowInput(false)}
              />
            </div>
          )}
          {explorer.items.map((item) => (
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
      )}
    </div>
  );
}

export default FolderItem;
