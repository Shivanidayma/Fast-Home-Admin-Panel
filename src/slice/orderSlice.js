import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const fetchOrderStatus = createAsyncThunk(
  "orders/fetchOrderStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/order_status");
      return {
        new_order: response.data.new_order || [],
        under_preparation: response.data.under_preparation || [],
        on_the_way: response.data.on_the_way || []
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders.");
    }
  }
);

const initialState ={
    new_order: [],
    under_preparation: [],
    on_the_way: [],
    loading: false,
    error: null,
}

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.new_order = action.payload.new_order;
        state.under_preparation = action.payload.under_preparation;
        state.on_the_way = action.payload.on_the_way;
      })
      .addCase(fetchOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});



export const {} = orderSlice.actions;
const orderReducer = orderSlice.reducer;
export default orderReducer;