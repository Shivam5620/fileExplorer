// reducer.js
import { ADD_ITEM, DELETE_ITEM, RENAME_ITEM } from "./actions";

const initialState = {
  files: [
    // Initial folder structure
    {
      id: "1",
      name: "src",
      type: "folder",
      children: [
        { id: "2", name: "App.js", type: "file" },
        { id: "3", name: "index.js", type: "file" },
      ],
    },
  ],
};

const findItemById = (items, itemId) => {
  for (const item of items) {
    if (item.id === itemId) return item;
    if (item.children) {
      const found = findItemById(item.children, itemId);
      if (found) return found;
    }
  }
  return null;
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const { parentId, newItem } = action.payload;
      const updatedFiles = [...state.files];
      const parent = findItemById(updatedFiles, parentId);
      if (parent && parent.type === "folder") {
        parent.children = [...(parent.children || []), newItem];
      }
      return { ...state, files: updatedFiles };
    }

    case DELETE_ITEM: {
      const updatedFiles = [...state.files];
      const deleteRecursive = (items, itemId) => {
        return items.filter((item) => {
          if (item.id === itemId) return false;
          if (item.children) {
            item.children = deleteRecursive(item.children, itemId);
          }
          return true;
        });
      };
      return { ...state, files: deleteRecursive(updatedFiles, action.payload) };
    }

    case RENAME_ITEM: {
      const { itemId, newName } = action.payload;
      const updatedFiles = [...state.files];
      const item = findItemById(updatedFiles, itemId);
      if (item) {
        item.name = newName;
      }
      return { ...state, files: updatedFiles };
    }

    default:
      return state;
  }
};

export default fileReducer;
