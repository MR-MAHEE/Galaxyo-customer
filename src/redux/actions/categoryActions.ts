import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";
import { getErrorMessage } from "@/utils/helper";

export const getCategoriesByBranchId = createAsyncThunk(
  "category/getCategoriesByBranchId",
  async (branchId: any, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/categories/${branchId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);
