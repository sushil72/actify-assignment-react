import { createSlice } from "@reduxjs/toolkit";

const initialDummyData = Array.from({ length: 20 }, (_, index) => ({
  accountName: `Account ${index + 1}`,
  email: `account${index + 1}@example.com`,
  phone: `123-456-78${index}`,
  website: `https://website${index + 1}.com`,
  industry: index % 2 === 0 ? "Technology" : "Finance",
  status: index % 2 === 0 ? "Active" : "Inactive",
  remark: index % 2 === 0 ? "Good account" : "Needs review",
}));

const initialState = {
  tableData: JSON.parse(localStorage.getItem("tableData")) || initialDummyData,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
      localStorage.setItem("tableData", JSON.stringify(state.tableData));
    },
    addTableData: (state, action) => {
      state.tableData.push(action.payload);
      localStorage.setItem("tableData", JSON.stringify(state.tableData));
    },
  },
});

export const { setTableData, addTableData } = tableSlice.actions;
export default tableSlice.reducer;
