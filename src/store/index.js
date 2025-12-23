import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../slice/orderSlice";
import transactionsReducer from "../slice/transactionSlice";
import userReducer from "../slice/userSlice";
import createRestaurantReducer from "../slice/createRestaurantSlice";
import orderStatisticsReducer from "../slice/ordersStatistics";
import placedOrdersReducer from "../slice/placedOrdersSlice";
const store = configureStore({
  reducer: {
  orders: orderReducer,
  transactions: transactionsReducer,
  users: userReducer,
  createRestaurant: createRestaurantReducer,
  orderStatistics: orderStatisticsReducer,
  placedOrders: placedOrdersReducer
  }
})

export default store;