// FileExplorer.js
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addItem,
  deleteItem,
  renameItem,
  toggleChildren,
} from "../redux/actions";
import { toast } from "react-toastify";

const FileExplorer = ({
  FolderData,
  addItem,
  deleteItem,
  renameItem,
  toggleChildren,
  onFileClick,
}) => {
  const [newItemName, setNewItemName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [itemName, setItemName] = useState(FolderData.name);

  const handleAddFolder = () => {
    if (!newItemName.trim()) {
      toast.error("Folder name cannot be empty");
      return;
    }
    if (FolderData.children.some((child) => child.name === newItemName)) {
      toast.error("Folder name already exists");
      return;
    }
    const newFolder = {
      id: Date.now(),
      name: newItemName,
      type: "folder",
      showChildren: false,
      children: [],
    };
    addItem(FolderData.id, newFolder);
    setNewItemName("");
    toast.success("Folder added successfully");
  };

  const handleAddFile = () => {
    if (!newItemName.trim()) {
      toast.error("File name cannot be empty");
      return;
    }
    if (FolderData.children.some((child) => child.name === newItemName)) {
      toast.error("File name already exists");
      return;
    }
    const newFile = {
      id: Date.now(),
      name: newItemName,
      type: "file",
    };
    addItem(FolderData.id, newFile);
    setNewItemName("");
    toast.success("File added successfully");
  };

  const handleRename = () => {
    setIsRenaming(true);
  };

  const handleSaveRename = () => {
    if (!itemName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    renameItem(FolderData.id, itemName);
    setIsRenaming(false);
    toast.success("Item renamed successfully");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(FolderData.id);
      toast.success("Item deleted successfully");
    }
  };
  

  return (
    <div
      className="ml-4 mb-2 p-2 border border-gray-200 rounded-lg shadow-md bg-white"
      style={{ borderLeft: "1px solid black", paddingLeft: "0.5rem" }}
    >
      {FolderData.showChildren && (
        <div className="mb-2">
          <input
            type="text"
            placeholder="New Folder/File Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="border border-gray-300 p-1 rounded-md mr-2"
          />
          <button
            onClick={handleAddFolder}
            className="p-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600"
          >
            +📂
          </button>
          <button
            onClick={handleAddFile}
            className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            +📄
          </button>
        </div>
      )}
      <div className="flex items-center">
        {FolderData.type === "folder"
          ? FolderData.showChildren
            ? "📂"
            : "📁"
          : "📄"}
        {isRenaming ? (
          <>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSaveRename()}
              className="border border-gray-300 p-1 rounded-md ml-2"
              autoFocus
            />
            <button
              onClick={handleSaveRename}
              className="ml-2 p-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span
              onClick={
                FolderData.type === "file"
                  ? () => onFileClick(FolderData) // Handle file click
                  : () => toggleChildren(FolderData.id)
              }
              className="cursor-pointer ml-2 text-gray-700 hover:text-gray-900 m-2"
            >
              {FolderData.name}
            </span>
            <button
              onClick={handleRename}
              className="ml-2 p-1 bg-gray-300 rounded-md hover:bg-gray-400"
              style={{ marginLeft: "5px" }}
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className="ml-2 p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              style={{ marginLeft: "5px" }}
            >
              🗑️
            </button>
          </>
        )}
      </div>
      {FolderData.showChildren &&
        FolderData.children.map((childdata, index) => (
          <ConnectedFileExplorer
            key={index}
            FolderData={childdata}
            onFileClick={onFileClick}
          />
        ))}
    </div>
  );
};

const mapDispatchToProps = {
  addItem,
  deleteItem,
  renameItem,
  toggleChildren,
};

const ConnectedFileExplorer = connect(null, mapDispatchToProps)(FileExplorer);

export default ConnectedFileExplorer;
