import axiosInstance from "@/services/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTableById = createAsyncThunk(
  "table/getTableById",
  async (tableId: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/table/${tableId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
