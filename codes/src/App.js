// src/App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FolderTree from './components/FolderTree';
import ContentDisplay from './components/ContentDisplay';
import { insertNode, selectItem, renameItem, deleteNode, setSearchTerm, clearSearchTerm } from './redux/actions';

export default function App() {
  const searchTerm = useSelector((state) => state.searchTerm);
  const explorerData = useSelector((state) => state.explorerData);
  const selectedItem = useSelector((state) => state.selectedItem);
  const dispatch = useDispatch();

  const handleInsertNode = (folderId, item, isFolder) => {
    dispatch(insertNode(folderId, item, isFolder));
  };

  const handleSelectItem = (item) => {
    dispatch(selectItem(item));
  };

  const handleRenameItem = (itemId, newName) => {
    dispatch(renameItem(itemId, newName));
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteNode(itemId));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(clearSearchTerm());
  };

  const filteredData = (data, term) => {
    if (!term) return data;
    return data.reduce((acc, item) => {
      if (item.name.toLowerCase().includes(term.toLowerCase())) {
        acc.push(item);
      }
      if (item.items) {
        const filteredItems = filteredData(item.items, term);
        if (filteredItems.length) {
          acc.push({ ...item, items: filteredItems });
        }
      }
      return acc;
    }, []);
  };

  const searchResults = filteredData([explorerData], searchTerm);

  return (
    <div className="flex h-screen " style={{display:"flex",height:"100vh"}}>
      <div className="w-1/4 bg-gray-100 p-4 overflow-auto aside">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <button onClick={handleClearSearch} className="mb-2 p-2 bg-red-500 text-white rounded">
          Clear Search
        </button>
        <FolderTree
          explorerData={searchResults[0].items}
          handleInsertNode={handleInsertNode}
          handleSelectItem={handleSelectItem}
          handleRenameItem={handleRenameItem}
          handleDeleteItem={handleDeleteItem}
        />
      </div>
      <div className="w-3/4 bg-white p-4 overflow-auto" style={{padding:"20px"}}>
        <ContentDisplay selectedItem={selectedItem} />
      </div>
    </div>
  );
}
