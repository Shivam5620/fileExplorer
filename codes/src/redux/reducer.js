import { ADD_ITEM, DELETE_ITEM, RENAME_ITEM, TOGGLE_CHILDREN } from "./actions";

const initialState = {
  folderData: [
    {
      name: "project-root",
      type: "folder",
      id: 1,
      showChildren: true,
      children: [
        {
          name: ".vscode",
          type: "folder",
          id: 2,
          showChildren: false,
          children: [
            { name: "settings.json", type: "file", id: 3 },
            { name: "launch.json", type: "file", id: 4 },
          ],
        },
        {
          name: "node_modules",
          type: "folder",
          id: 5,
          showChildren: false,
          children: [
            {
              name: "react",
              type: "folder",
              id: 6,
              showChildren: false,
              children: [
                { name: "index.js", type: "file", id: 7 },
              ],
            },
          ],
        },
        {
          name: "public",
          type: "folder",
          id: 8,
          showChildren: false,
          children: [
            { name: "index.html", type: "file", id: 9 },
            { name: "favicon.ico", type: "file", id: 10 },
          ],
        },
        {
          name: "src",
          type: "folder",
          id: 11,
          showChildren: false,
          children: [
            {
              name: "components",
              type: "folder",
              id: 12,
              showChildren: false,
              children: [
                { name: "App.js", type: "file", id: 13 },
                { name: "App.css", type: "file", id: 14 },
              ],
            },
            { name: "index.js", type: "file", id: 15 },
            { name: "index.css", type: "file", id: 16 },
          ],
        },
        { name: ".gitignore", type: "file", id: 17 },
        { name: "package.json", type: "file", id: 18 },
        { name: "README.md", type: "file", id: 19 },
      ],
    },
  ],
};

const updateFolderStructure = (folders, itemId, callback) => {
  return folders
    .map((folder) => {
      if (folder.id === itemId) {
        return callback(folder);
      } else if (folder.children) {
        return {
          ...folder,
          children: updateFolderStructure(folder.children, itemId, callback),
        };
      }
      return folder;
    })
    .filter(Boolean); // Filter out any 'null' values (used in deleteItem)
};

export const fileExplorerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        folderData: updateFolderStructure(
          state.folderData,
          action.payload.parentId,
          (folder) => ({
            ...folder,
            children: [...folder.children, action.payload.item],
          })
        ),
      };
    case DELETE_ITEM:
      return {
        ...state,
        folderData: updateFolderStructure(
          state.folderData,
          action.payload.itemId,
          () => null // Returning null will filter out the item
        ),
      };
    case RENAME_ITEM:
      return {
        ...state,
        folderData: updateFolderStructure(
          state.folderData,
          action.payload.itemId,
          (folder) => ({
            ...folder,
            name: action.payload.newName,
          })
        ),
      };
    case TOGGLE_CHILDREN:
      return {
        ...state,
        folderData: updateFolderStructure(
          state.folderData,
          action.payload.itemId,
          (folder) => ({
            ...folder,
            showChildren: !folder.showChildren,
          })
        ),
      };
    default:
      return state;
  }
};
