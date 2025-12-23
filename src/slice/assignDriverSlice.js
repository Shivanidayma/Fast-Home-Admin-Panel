import api from '../../api/api'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const handleAssignDriver = async() =>{
  try{
    const response = await api.get("order_without_driver")
    if (!response || !response.data){
      throw new Error("Invalid API response");
    }
    setDrivers(d)
  }
  catch(err){
    console.error("Error fetching order details:", err);
    }
}

export const assignDriver = createSlice({
  name: 'assignDriver',
  initialState: {
    drivers: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDrivers: (state, action) => {
      state.drivers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleAssignDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleAssignDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(handleAssignDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

const assignDriverReducer = assignDriver.reducer;
export default assignDriverReducer;
