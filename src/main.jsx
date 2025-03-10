import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import OrderStatus from "./components/Dashboard/OrderStatus.jsx";
import LandingPage from "./components/LandingPage.jsx"; 
import User from "./components/Users/User.jsx";
import Order from "./components/Order/Order.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Import ProtectedRoute

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
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
