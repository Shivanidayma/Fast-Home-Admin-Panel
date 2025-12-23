import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import OrderStatus from "./components/OrderStatus/OrderStatus.jsx";
import LandingPage from "./components/LandingPage.jsx"; 
import User from "./components/Users/User.jsx";
import Order from "./components/Order/Order.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Import ProtectedRoute
import { Provider } from "react-redux";
import store from "./store/index.js";
import CreateRestaurant from "./components/Restaurant/CreateRestaurant.jsx";
import DashboardItem from "./components/Dashboard/DashboardItem.jsx";
const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { 
        path: "/dashboard/order-status", 
        element: (
          <ProtectedRoute>
            <OrderStatus />
          </ProtectedRoute>
        )
      },
      { 
        path: "/dashboard/users", 
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/dashboard/transactions", 
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/dashboard//create-restaurant", 
        element: (
          <ProtectedRoute>
            <CreateRestaurant/>
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/dashboard/", 
        element: (
          <ProtectedRoute>
            <DashboardItem/>
          </ProtectedRoute>
        ) 
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);



