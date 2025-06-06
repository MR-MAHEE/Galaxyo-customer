import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";
import { errorToast } from "../../utils/notificationHelper";
import { getErrorMessage } from "@/utils/helper";

export const signIn = createAsyncThunk(
  "signIn",
  async (data: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post("login", data);
      return {
        status: response?.status,
        data: response?.data,
        token: response?.data?.token,
      };
    } catch (error: any) {
      console.log("error trigger", JSON.stringify(error));
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/user");
      return response.data?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);
