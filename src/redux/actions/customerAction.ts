import axiosInstance from '@/services/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
      const response = await axiosInstance.post('/customers', payload);
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

export const getCustomer = createAsyncThunk(
  'customer/getCustomer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/customer');
      return {
        status: response?.status,
        data: response?.data,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
