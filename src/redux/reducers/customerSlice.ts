import { createSlice } from "@reduxjs/toolkit";
import { createCustomer } from "../actions/customerAction";

interface CustomerState {
  loading: boolean;
  customer: any;
  error: string | null;
}

const initialState: CustomerState = {
  loading: false,
  customer: null,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default customerSlice.reducer;
