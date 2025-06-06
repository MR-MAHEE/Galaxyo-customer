import { createSlice } from "@reduxjs/toolkit";
import { getTableById } from "../actions/tableActions";
import { errorToast } from "@/utils/notificationHelper";

interface TableState {
  getTableById: {
    loading: boolean;
    success: boolean;
    data: any; // Consider replacing 'any' with a more specific type if possible
  };
}

const initialState: TableState = {
  getTableById: {
    loading: false,
    success: false,
    data: null,
  },
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    resetGetTableByIdSuccess: (state) => {
      state.getTableById.success = false;
    },
    // Add reducers here if needed in the future
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTableById.pending, (state) => {
        state.getTableById.loading = true;
        state.getTableById.success = false;
        state.getTableById.data = null; // Reset data on pending
      })
      .addCase(getTableById.fulfilled, (state, action) => {
        state.getTableById.loading = false;
        state.getTableById.success = true; // Assuming fulfilled means success
        state.getTableById.data = action.payload; // Store the payload
      })
      .addCase(getTableById.rejected, (state, action: any) => {
        state.getTableById.loading = false;
        state.getTableById.success = false;
        state.getTableById.data = null; // No data on rejection
        // errorToast(action.payload || "Get table by ID failed");
      });
  },
});

export const { resetGetTableByIdSuccess } = tableSlice.actions;
export default tableSlice.reducer;
