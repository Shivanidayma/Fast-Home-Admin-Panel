import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handlePlacedOrder } from "../../slice/placedOrdersSlice";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import api from "../../api/api";
function OrderRequest() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handlePlacedOrder());
  }, [dispatch]);

  const { orders } = useSelector((state) => state.placedOrders);

  function handleShowOrderDetails(order_id) {
    if (showDetails === order_id) {
      setShowDetails(null); // Close details
    } else {
      setShowDetails(order_id);
      setIsModalOpen(true);
      fetchOrderDetails(order_id); // Call API when opening
    }
  }

  const handleOrderApprove = async (order_id) => {
    try{
      const requestBody = {
       "status": "admin_accepted"
      };
      console.log(order_id)
      const response = await api.put(`accept_order/${order_id}`,requestBody)
      if (!response || !response.data){
        throw new Error("Invalid API response");
      }
      dispatch(handlePlacedOrder())
    }
    catch(err){
      console.error("Error fetching order details:", err);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setShowDetails(null);
  }

  const fetchOrderDetails = async (order_id) => {
    try {
      const response = await api.get(`/placed_order?search=${order_id}`);
      if (!response || !response.data) {
        throw new Error("Invalid API response");
      }
      console.log("Fetched order details:", response.data.orders); // Debugging
      setOrderDetails(response.data.orders); // Ensure response.data exists before setting state
    } catch (err) {
      console.error("Error fetching order details:", err);
    }
  };

  return (
    <div className="max-w-full min-h-[12rem] flex flex-col bg-[#FFFFFF] border shadow-sm rounded-xl mt-2 mb-7 mx-2">
      <div className="pl-4 pt-2 flex flex-col md:flex-row items-center text-base">
        <h1 className="mb-2 md:mb-0 whitespace-nowrap">Order Request</h1>
        <div dir="rtl" className="md:ml-10 mt-2 md:mt-0">
          <div className="relative h-6 w-[60px] text-blue-600 pr-2 md:pr-8 pl-4 md:pl-5 xl:pl-10 cursor-pointer">
            <a className="text-sm whitespace-nowrap">View All</a>
          </div>
        </div>
      </div>

      {/* Scrollable Order List */}
      <div className="flex flex-auto flex-col p-2 gap-2 overflow-auto max-h-[200px]">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="p-3 bg-gray-100 rounded-md shadow-sm ">
              <p className="text-gray-800 font-medium flex items-center">
                <span>
                  id: {order.id} - {order.status}
                </span>
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => handleShowOrderDetails(order.id)}
                >
                  {showDetails === order.id ? (
                    <EyeIcon className="w-5 h-5" />
                  ) : (
                    <EyeOffIcon className="w-5 h-5" />
                  )}
                </button>
                <button
                  type="button"
                  className="ml-auto text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1 h-full dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={() => handleOrderApprove(order.id)}
                >
                  Approve
                </button>
              </p>
              {isModalOpen && orderDetails && (
                <div className="fixed inset-0 z-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md z-50">
                    <h2 className="text-xl font-bold mb-4">Order Details</h2>
                    {orderDetails.map((order) => (
                      <div key={order.id}>
                        <p>
                          <strong>ID:</strong> {order.id}
                        </p>
                        <p>
                          <strong>Status:</strong> {order.status}
                        </p>
                        <p>
                          <strong>Customer Name:</strong>{" "}
                          {order.customer_name}
                        </p>
                        <p>
                          <strong>Customer Phone:</strong>{" "}
                          {order?.customer_phone}
                        </p>
                        <p>
                          <strong>Total Amount:</strong> €
                          {order.total_amount.id}
                        </p>
                        <p>
                          <strong>Created At:</strong>{" "}
                          {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}

                    <button
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1 className="m-10 flex items-center justify-center text-gray-500">
            No placed orders available
          </h1>
        )}
      </div>
    </div>
  );
}

export default OrderRequest;
