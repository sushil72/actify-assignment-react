// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../Redux/tableSlice";

const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});

store.subscribe(() => {
  try {
    const tableData = store.getState().table.tableData;
    localStorage.setItem("tableData", JSON.stringify(tableData));
  } catch (err) {
    console.log("Could not save state to localStorage:", err);
  }
});

export default store;
