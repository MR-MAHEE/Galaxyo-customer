import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";
import { errorToast } from "../../utils/notificationHelper";
import { getErrorMessage } from "@/utils/helper";

interface SignIn {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

export const signIn = createAsyncThunk(
  "signIn",
  async (data: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
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
