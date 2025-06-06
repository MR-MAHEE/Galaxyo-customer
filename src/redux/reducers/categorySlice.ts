import { createSlice } from "@reduxjs/toolkit";
import { getCategoriesByBranchId } from "../actions/categoryActions";
import { errorToast } from "@/utils/notificationHelper";

interface CategoryState {
  getCategoriesByBranchId: {
    loading: boolean;
    success: boolean;
    data: any[]; // Assuming data will be an array of categories
  };
}

const initialState: CategoryState = {
  getCategoriesByBranchId: {
    loading: false,
    success: false,
    data: [],
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // Add reducers here if needed in the future, e.g., resetCategoryState
    resetGetCategoriesSuccess: (state) => {
      state.getCategoriesByBranchId.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesByBranchId.pending, (state) => {
        state.getCategoriesByBranchId.loading = true;
        state.getCategoriesByBranchId.success = false;
        state.getCategoriesByBranchId.data = []; // Reset data on pending
      })
      .addCase(getCategoriesByBranchId.fulfilled, (state, action) => {
        state.getCategoriesByBranchId.loading = false;
        state.getCategoriesByBranchId.success = true;
        state.getCategoriesByBranchId.data = action.payload; // Store the fetched categories
      })
      .addCase(getCategoriesByBranchId.rejected, (state, action: any) => {
        state.getCategoriesByBranchId.loading = false;
        state.getCategoriesByBranchId.success = false;
        state.getCategoriesByBranchId.data = []; // No data on rejection
        errorToast(action.payload || "Failed to fetch categories");
      });
  },
});

export const { resetGetCategoriesSuccess } = categorySlice.actions;
export default categorySlice.reducer;
