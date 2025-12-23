import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
const initialState ={
  placed_orders: 0,
  ongoing_orders: 0,
  orders_completed: 0,
  merchant_opened: 0,
  loading: false,
  error: null,
}

export const handleOrderStatistics = createAsyncThunk(
  "orders/fetchOrderStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/posts");
        console.log(response.data)
      return {
        placed_orders: response.data.placed_orders || [],
        ongoing_orders: response.data.ongoing_orders || [],
        orders_completed: response.data.orders_completed || [],
        merchant_opened: response.data.merchant_opened || []
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders.");
    }
  }
);

export const orderStatisticsSlice = createSlice({
  name : "orderStatistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
     builder
       .addCase(handleOrderStatistics.pending, (state) => {
         state.loading = true;
         state.error = null;
       })
       .addCase(handleOrderStatistics.fulfilled, (state, action) => {
         state.loading = false;
         state.placed_orders = action.payload.placed_orders;
         state.orders_completed = action.payload.orders_completed; 
         state.ongoing_orders = action.payload.ongoing_orders; 
         state.merchant_opened = action.payload.merchant_opened; 
       })
       .addCase(handleOrderStatistics.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload || action.error.message;
       });
   },
 });


 export const {} = orderStatisticsSlice.actions
 const orderStatisticsReducer = orderStatisticsSlice.reducer
 export default orderStatisticsReducer