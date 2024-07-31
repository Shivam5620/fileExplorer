import React, { useState } from "react";
import { toast } from "react-toastify";

const FileExploere = ({ FolderData, onDelete, onFileClick }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [children, setChildren] = useState(FolderData.children || []);
  const [newItemName, setNewItemName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [itemName, setItemName] = useState(FolderData.name);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  const handleAddFolder = () => {
    if (!newItemName.trim()) {
      toast.error("Folder name cannot be empty");
      return;
    }
    if (children.some((child) => child.name === newItemName)) {
      toast.error("Folder name already exists");
      return;
    }
    const newFolder = {
      name: newItemName,
      type: "folder",
      children: [],
    };
    setChildren([...children, newFolder]);
    setNewItemName("");
    toast.success("Folder added successfully");
  };

  const handleAddFile = () => {
    if (!newItemName.trim()) {
      toast.error("File name cannot be empty");
      return;
    }
    if (children.some((child) => child.name === newItemName)) {
      toast.error("File name already exists");
      return;
    }
    const newFile = {
      name: newItemName,
      type: "file",
    };
    setChildren([...children, newFile]);
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
    setIsRenaming(false);
    FolderData.name = itemName;
    toast.success("Item renamed successfully");
  };

  const handleDelete = () => {
    onDelete(FolderData);
    toast.success("Item deleted successfully");
  };

  return (
    
    <div
      className="ml-4 mb-2 p-2 border border-gray-200 rounded-lg shadow-md bg-white"
      style={{ borderLeft: "1px solid black", paddingLeft: "0.5rem" }}
    
    >
      
      {showChildren && (
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
      <div className="flex items-center ">
        {FolderData.type === "folder" ? (showChildren ? "📂" : "📁") : "📄"}
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
              onClick={FolderData.type === "file" ? () => onFileClick(FolderData) : handleClick}
              className="cursor-pointer ml-2 text-gray-700 hover:text-gray-900 m-2"
            >
              {FolderData.name}
            </span>
            <button
              onClick={handleRename}
              className="ml-2 p-1 bg-gray-300 rounded-md hover:bg-gray-400" style={{marginLeft:"5px"}}
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className="ml-2 p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              🗑️
            </button>
          </>
        )}
      </div>
      {showChildren &&
        children.map((childdata, index) => (
          <FileExploere
            key={index}
            FolderData={childdata}
            onDelete={(item) => {
              setChildren(children.filter((child) => child !== item));
            }}
            onFileClick={onFileClick}
          />
        ))}
    </div>
  );
};

export default FileExploere;
