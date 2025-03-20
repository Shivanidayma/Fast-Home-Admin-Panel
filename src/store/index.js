import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../slice/orderSlice";
import transactionsReducer from "../slice/transactionSlice";
import userReducer from "../slice/userSlice";
const store = configureStore({
  reducer: {
  orders: orderReducer,
  transactions: transactionsReducer,
  users: userReducer
  }
})

export default store;