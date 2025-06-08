import { createSlice } from "@reduxjs/toolkit";
import { createCustomer, getCustomer } from "../actions/customerAction";
import { errorToast } from "@/utils/notificationHelper";

interface CustomerState {
  createCustomer: {
    loading: boolean;
    success: boolean;
    data: CustomerData | null;
  };
  getCustomer: {
    loading: boolean;
    success: boolean;
    data: CustomerData | null;
  };
}

interface CustomerData {
  id: string;
  name: string;
  phone: string;
  tableId: string;
  noOfGuest: string;
  // Add other customer properties here if available from the API
}

const initialState: CustomerState = {
  createCustomer: {
    loading: false,
    success: false,
    data: null,
  },
  getCustomer: {
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
        state.createCustomer.data = action.payload.data; // Store the actual customer data
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.createCustomer.loading = false;
        state.createCustomer.success = false;
        state.createCustomer.data = null; // No data on rejection
        errorToast(action.payload || "Create customer failed");
      })
      .addCase(getCustomer.pending, (state) => {
        state.getCustomer.loading = true;
        state.getCustomer.success = false;
        state.getCustomer.data = null;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.getCustomer.loading = false;
        state.getCustomer.success = true;
        state.getCustomer.data = action.payload.data;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.getCustomer.loading = false;
        state.getCustomer.success = false;
        state.getCustomer.data = null;
        errorToast(action.payload || "Failed to get customer data");
      });
  },
});

export const { resetCreateCustomerSuccess } = customerSlice.actions;
export default customerSlice.reducer;
