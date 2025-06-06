import { createSlice } from "@reduxjs/toolkit";
import { createCustomer } from "../actions/customerAction";
import { errorToast } from "@/utils/notificationHelper";

interface CustomerState {
  createCustomer: {
    loading: boolean;
    success: boolean;
    data: any;
  };
}

const initialState: CustomerState = {
  createCustomer: {
    loading: false,
    success: false,
    data: null,
  },
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    resetCreateCustomerSuccess: (state) => {
      state.createCustomer.success = false;
    },
    // Add reducers here if needed in the future
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.createCustomer.loading = true;
        state.createCustomer.success = false;
        state.createCustomer.data = null; // Reset data on pending
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.createCustomer.loading = false;
        state.createCustomer.success = true; // Assuming fulfilled means success
        state.createCustomer.data = action.payload; // Store the payload
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(createCustomer.rejected, (state, action: any) => {
        state.createCustomer.loading = false;
        state.createCustomer.success = false;
        state.createCustomer.data = null; // No data on rejection
        errorToast(action.payload || "Create customer failed");
      });
  },
});

export const { resetCreateCustomerSuccess } = customerSlice.actions;
export default customerSlice.reducer;
