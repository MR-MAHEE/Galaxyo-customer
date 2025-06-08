import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";
import { getErrorMessage } from "../../utils/helper";

export const getBranchById = createAsyncThunk(
  "branches/getById",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/branches/${id}`);
      return response.data?.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);
