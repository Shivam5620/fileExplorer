// actions.js
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const RENAME_ITEM = "RENAME_ITEM";
export const TOGGLE_CHILDREN = "TOGGLE_CHILDREN";

export const addItem = (parentId, item) => ({
  type: ADD_ITEM,
  payload: { parentId, item },
});

export const deleteItem = (itemId) => ({
  type: DELETE_ITEM,
  payload: { itemId },
});

export const renameItem = (itemId, newName) => ({
  type: RENAME_ITEM,
  payload: { itemId, newName },
});

export const toggleChildren = (itemId) => ({
  type: TOGGLE_CHILDREN,
  payload: { itemId },
});
