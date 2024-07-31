// src/redux/actions.js
export const INSERT_NODE = 'INSERT_NODE';
export const SELECT_ITEM = 'SELECT_ITEM';
export const RENAME_ITEM = 'RENAME_ITEM';
export const DELETE_NODE = 'DELETE_NODE';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const CLEAR_SEARCH_TERM = 'CLEAR_SEARCH_TERM';

export const insertNode = (folderId, item, isFolder) => ({
  type: INSERT_NODE,
  payload: { folderId, item, isFolder },
});

export const selectItem = (item) => ({
  type: SELECT_ITEM,
  payload: item,
});

export const renameItem = (id, newName) => ({
  type: 'RENAME_ITEM',
  payload: { id, newName }
});

export const deleteNode = (itemId) => ({
  type: DELETE_NODE,
  payload: itemId,
});
export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: term,
});

export const clearSearchTerm = () => ({
  type: CLEAR_SEARCH_TERM,
});