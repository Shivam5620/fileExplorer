// src/redux/reducer.js
import { INSERT_NODE, SELECT_ITEM, RENAME_ITEM, DELETE_NODE, SET_SEARCH_TERM, CLEAR_SEARCH_TERM } from './actions';

// Initial state with your data structure
const initialState = {
  explorerData: {
    id: "1",
    name: "root",
    isFolder: true,
    items: [
      {
        id: "2",
        name: "public",
        isFolder: true,
        items: [
          {
            id: "3",
            name: "public nested 1",
            isFolder: true,
            items: [
              {
                id: "4",
                name: "index.html",
                isFolder: false,
                items: []
              },
              {
                id: "5",
                name: "hello.html",
                isFolder: false,
                items: []
              }
            ]
          },
          {
            id: "6",
            name: "public_nested_file",
            isFolder: false,
            items: []
          }
        ]
      },
      {
        id: "7",
        name: "src",
        isFolder: true,
        items: [
          {
            id: "8",
            name: "App.js",
            isFolder: false,
            items: []
          },
          {
            id: "9",
            name: "Index.js",
            isFolder: false,
            items: []
          },
          {
            id: "10",
            name: "styles.css",
            isFolder: false,
            items: []
          }
        ]
      },
      {
        id: "11",
        name: "package.json",
        isFolder: false,
        items: []
      }
    ]
  },
  selectedItem: null,
  searchTerm: '',
};

// Helper function to insert a node
const insertNode = (tree, folderId, item, isFolder) => {
  if (tree.id === folderId && tree.isFolder) {
    tree.items.unshift({
      id: new Date().getTime().toString(),
      name: item,
      isFolder: isFolder,
      items: []
    });
    return { ...tree };
  }

  return {
    ...tree,
    items: tree.items.map(subTree => insertNode(subTree, folderId, item, isFolder))
  };
};

// Helper function to rename a node
const renameNode = (tree, itemId, newName) => {
  if (tree.id === itemId) {
    return { ...tree, name: newName };
  }

  return {
    ...tree,
    items: tree.items.map(subTree => renameNode(subTree, itemId, newName))
  };
};

// Helper function to delete a node
const deleteNode = (tree, itemId) => {
  if (tree.id === itemId) {
    return null; // Remove the node
  }

  return {
    ...tree,
    items: tree.items
      .map(subTree => deleteNode(subTree, itemId))
      .filter(item => item !== null)
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_NODE:
      return {
        ...state,
        explorerData: insertNode(state.explorerData, action.payload.folderId, action.payload.item, action.payload.isFolder),
      };

    case SELECT_ITEM:
      return {
        ...state,
        selectedItem: action.payload,
      };

    case RENAME_ITEM:
      return {
        ...state,
        explorerData: renameNode(state.explorerData, action.payload.id, action.payload.newName),
      };

    case DELETE_NODE:
      return {
        ...state,
        explorerData: deleteNode(state.explorerData, action.payload),
      };

    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };

    case CLEAR_SEARCH_TERM:
      return {
        ...state,
        searchTerm: '',
      };

    default:
      return state;
  }
};

export default reducer;
