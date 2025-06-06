import { createSlice } from "@reduxjs/toolkit";
import { signIn, fetchUser } from "../actions/authActions";
import { errorToast, successToast } from "@/utils/notificationHelper";

interface AuthState {
  signIn: {
    loading: boolean;
    success: boolean;
    data: any;
  };
  userState: {
    loading: boolean;
    success: boolean;
    data: any; // Consider a more specific type for user data
  };
}

const initialState: AuthState = {
  signIn: {
    loading: false,
    success: false,
    data: {},
  },
  userState: {
    loading: false,
    success: false,
    data: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSignInSuccess: (state) => {
      state.signIn.success = false;
    },
    resetUserState: (state) => {
        state.userState.loading = false;
        state.userState.success = false;
        state.userState.data = null;
    } // Add a reset for user state if needed
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
          // Dispatch fetchUser after successful login
          // This needs to be handled outside the reducer, typically in the component
          // where the signIn action is dispatched, or using RTK query which handles chaining.
          // For now, we'll just update the state.
          successToast("Sign in successful");
        }
      })
      .addCase(signIn.rejected, (state, action: any) => {
        state.signIn.loading = false;
        errorToast(action.payload || "Sign in failed");
      })
      // Handle Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.userState.loading = true;
        state.userState.success = false;
        state.userState.data = null; // Clear previous user data
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userState.loading = false;
        state.userState.success = true;
        state.userState.data = action.payload; // Store fetched user data
      })
      .addCase(fetchUser.rejected, (state, action: any) => {
        state.userState.loading = false;
        state.userState.success = false;
        state.userState.data = null; // Clear user data on rejection
        // Optionally show an error toast for fetching user failure
        // errorToast(action.payload || "Failed to fetch user data");
      });
  },
});

export const { resetSignInSuccess, resetUserState } = authSlice.actions; // Export the new action
export default authSlice.reducer;
