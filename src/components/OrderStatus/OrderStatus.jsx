import React, { useState } from "react";
import { useEffect } from "react";
import OrderCard from "./OrderCard";
import { ClipLoader } from "react-spinners";
import { fetchOrderStatus } from "../../slice/orderSlice";
import { useSelector,useDispatch } from "react-redux";
function OrderStatus() {
  const dispatch = useDispatch();
  const { new_order, under_preparation, on_the_way, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderStatus());
  }, [dispatch]);

  return (
    <div className="flex-1 flex gap-6 p-8 bg-gray-140 overflow-hidden">
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          {/* New Orders */}
          <div className="w-1/3 bg-white shadow-lg rounded-xl p-6 max-h-screen overflow-y-auto border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 bg-gray-200 py-2 px-4 rounded-md text-center">
              🆕 New Orders
            </h2>
            {new_order.length > 0 ? (
              new_order.map((order) => <OrderCard key={order.id} order={order} />)
            ) : (
              <p className="text-gray-500 text-center">No new orders.</p>
            )}
          </div>

          {/* Under Preparation */}
          <div className="w-1/3 bg-white shadow-lg rounded-xl p-6 max-h-screen overflow-y-auto border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-yellow-600 bg-yellow-200 py-2 px-4 rounded-md text-center">
              🍳 Under Preparation
            </h2>
            {under_preparation.length > 0 ? (
              under_preparation.map((order) => <OrderCard key={order.id} order={order} />)
            ) : (
              <p className="text-gray-500 text-center">No orders under preparation.</p>
            )}
          </div>

          {/* On The Way */}
          <div className="w-1/3 bg-white shadow-lg rounded-xl p-6 max-h-screen overflow-y-auto border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-green-600 bg-green-200 py-2 px-4 rounded-md text-center">
              🚚 On The Way
            </h2>
            {on_the_way.length > 0 ? (
              on_the_way.map((order) => <OrderCard key={order.id} order={order} />)
            ) : (
              <p className="text-gray-500 text-center">No orders on the way.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}



export default OrderStatus;