// src/features/table/tableSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableData: [], //Initial empty table data
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addRow(state, action) {
      state.tableData.push(action.payload);
      localStorage.setItem("tableData", JSON.stringify(state.tableData));
    },
    setTableData(state, action) {
      state.tableData = action.payload;
      localStorage.setItem("tableData", JSON.stringify(action.payload));
    },
  },
});

export const { addRow, setTableData } = tableSlice.actions;
export default tableSlice.reducer;
