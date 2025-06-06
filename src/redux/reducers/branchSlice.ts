import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { errorToast } from "@/utils/notificationHelper";
import { getBranchById } from "../actions/branchActions";

interface BranchState {
  branchData: {
    loading: boolean;
    success: boolean;
    data: any | null; // You might want to replace 'any' with a specific Branch type
    error: string | null;
  };
}

const initialState: BranchState = {
  branchData: {
    loading: false,
    success: false,
    data: null,
    error: null,
  },
};

const branchSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBranchById.pending, (state) => {
        state.branchData.loading = true;
        state.branchData.success = false;
        state.branchData.error = null;
      })
      .addCase(getBranchById.fulfilled, (state, action: PayloadAction<any>) => {
        state.branchData.loading = false;
        state.branchData.success = true; // Assuming any successful response is a success
        state.branchData.data = action.payload;
        state.branchData.error = null;
      })
      .addCase(getBranchById.rejected, (state, action: PayloadAction<any>) => {
        state.branchData.loading = false;
        state.branchData.success = false;
        state.branchData.error =
          action.payload || "Failed to fetch branch data";
        errorToast(action.payload || "Failed to fetch branch data");
      });
  },
});

export default branchSlice.reducer;
