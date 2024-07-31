export const ADD_ITEM = 'ADD_ITEM';
export const RENAME_ITEM = 'RENAME_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const addItem = (parentPath, newItem) => ({
  type: ADD_ITEM,
  payload: { parentPath, newItem },
});

export const renameItem = (itemPath, newName) => ({
  type: RENAME_ITEM,
  payload: { itemPath, newName },
});

export const deleteItem = (itemPath) => ({
  type: DELETE_ITEM,
  payload: itemPath,
});
