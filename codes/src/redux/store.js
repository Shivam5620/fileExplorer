// store.js
import { createStore } from "redux";
import { fileExplorerReducer } from "./reducer";

const store = createStore(fileExplorerReducer);

export default store;
