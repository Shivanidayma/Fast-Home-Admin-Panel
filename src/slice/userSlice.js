import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  users: [],
  error: null,
  totalPages: 1,
  loading: false,
};

export const handleAllUsers = createAsyncThunk(
  "users/handleAllUsers",
  async ({ searchQuery = "", page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const queryParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : "";
      const page_number = queryParam.length === 0 ? page : 1;
      const response = await api.get(
        `/customer_users?page=${page_number}&per_page=${perPage}${queryParam}`
      );
      return {
        users: response.data.customer_users || [],
        totalPages: response.data.details.total_pages || 1,
      };
    } catch (error){
      console.log(error)
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users."
      );
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleAllUsers.pending, (state) => {
        state.loading = true; // ✅ Set loading to true when request starts
        state.error = null;
      })
      .addCase(handleAllUsers.fulfilled, (state, action) => {
        state.loading = false; // ✅ Set loading to false on success
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(handleAllUsers.rejected, (state, action) => {
        state.loading = false; // ✅ Set loading to false on failure
        state.error = action.payload;
      });
  },
});

const userReducer = userSlice.reducer
export default userReducer;