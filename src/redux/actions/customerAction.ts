import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CustomerPayload {
  name: string;
  phone: string;
  tableId: string;
  noOfGuest: string;
}

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (payload: CustomerPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/customers', payload);
      console.log("response", response)
      return {
        status: response?.status,
        data: response?.data,
        token: response?.data?.token,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
