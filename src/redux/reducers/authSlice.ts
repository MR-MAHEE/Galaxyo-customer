import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "../actions/authActions";
import { errorToast, successToast } from "@/utils/notificationHelper";

interface AuthState {
  signIn: {
    loading: boolean;
    success: boolean;
    data: any;
  };
}

const initialState: AuthState = {
  signIn: {
    loading: false,
    success: false,
    data: {},
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSignInSuccess: (state) => {
      state.signIn.success = false;
    },
  },
  extraReducers: (builder) => {
    // Handle Sign In
    builder
      .addCase(signIn.pending, (state) => {
        state.signIn.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signIn.loading = false;
        state.signIn.success = action.payload.status === 200;
        state.signIn.data = action.payload.data;
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
          // successToast("Sign in successful");
        }
      })
      .addCase(signIn.rejected, (state, action: any) => {
        state.signIn.loading = false;
        errorToast(action.payload || "Sign in failed");
      });
  },
});

export const { resetSignInSuccess } = authSlice.actions;
export default authSlice.reducer;
