import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  restaurant: null,
  documents: [],
  loading: false,
  error: null,
};

// ✅ Async thunk for restaurant creation
export const handleRestaurantCreation = createAsyncThunk(
  "restaurant/create",
  async ({ data, selectedDocuments }, { rejectWithValue }) => {
    try {
      const response = await api.post("/restaurants", data);
      if (selectedDocuments.length > 0 && response?.data?.status?.code === 200) {
        const restaurant_id = response.data?.restaurant?.id;
        const formData = new FormData();
        selectedDocuments.forEach((file) => {
          formData.append("documents[]", file);
        });

        const documentsResponse = await api.post(
          `/restaurant/${restaurant_id}/documents`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        return { restaurant: response.data.restaurant, documents: documentsResponse.data.document_urls };
      }

      return { restaurant: response.data.restaurant };
    } catch (error) {
      console.log(error.response?.data)
      return rejectWithValue(error.response?.data || "Failed to create restaurant.");
    }
  }
);

// ✅ Redux slice
const createRestaurantSlice = createSlice({
  name: "createRestaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleRestaurantCreation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleRestaurantCreation.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload.restaurant;
        state.documents = action.payload.documents || [];
      })
      .addCase(handleRestaurantCreation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

const createRestaurantReducer = createRestaurantSlice.reducer
export default createRestaurantReducer;
