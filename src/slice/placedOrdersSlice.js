import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
const initialState = {
  orders: [],
  error:null,
  loading:true
}

export const handlePlacedOrder = createAsyncThunk(
  "orders/fetchPlacedOrders",
  async (_,{rejectWithValue}) =>{
    try {
      const response = await api.get("/placed_order")
      return {
        orders: response.data.orders
      };
    }
      catch(error){
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders.");
      }
  }
)



export const placedOrdersSlice = createSlice({
  name: "placedOrders",
  initialState,
  reducers: {},
   extraReducers: (builder) => {
      builder
        .addCase(handlePlacedOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(handlePlacedOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.orders = action.payload.orders; 
        })
        .addCase(handlePlacedOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        });
    },
  });
 
const placedOrdersReducer = placedOrdersSlice.reducer;
export default placedOrdersReducer;