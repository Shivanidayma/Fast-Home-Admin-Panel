import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  transactions: [],
  loading: false,
  error: null,
  totalPages: 1,
};

export const handleAllOrders = createAsyncThunk(
  "orders/handleAllOrders",
  async ({ searchQuery = "", page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const queryParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : "";
      const page_number = queryParam.length === 0 ? page : 1;
      const response = await api.get(
        `/orders?page=${page_number}&per_page=${perPage}${queryParam}`
      );
      return {
        transactions: response.data.transaction || [],
        totalPages: response.data.details.total_pages || 1,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders."
      );
    }
  }
);


export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.totalPages = action.payload.totalPages; // Update totalPages
      })
      .addCase(handleAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {} = transactionSlice.actions;
const transactionsReducer = transactionSlice.reducer;
export default transactionsReducer;




