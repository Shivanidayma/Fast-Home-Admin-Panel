import React from 'react'
import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleOrderStatistics } from "../../slice/ordersStatistics";
function OrderStatistics() {
   const dispatch = useDispatch();
    const {
      placed_orders,
      ongoing_orders,
      orders_completed,
      merchant_opened,
      loading,
      error,
    } = useSelector((state) => state.orderStatistics);

    useEffect(() => {
      dispatch(handleOrderStatistics());
    }, [dispatch]);

    const dashboardData = [
      { count: placed_orders, label: "Placed Orders", bgColor: "bg-[#D8D6F9]" },
      {
        count: ongoing_orders,
        label: "Processing Orders",
        bgColor: "bg-[#FFD700]",
      },
      {
        count: orders_completed,
        label: "Completed Orders",
        bgColor: "bg-[#90EE90]",
      },
      {
        count: merchant_opened,
        label: "Cancelled Orders",
        bgColor: "bg-[#FF6B6B]",
      },
    ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 mr-2">
    {dashboardData.map((item, index) => (
      <div
        key={index}
        className="flex flex-col justify-center overflow-hidden pl-3"
      >
        <div className="max-w-7xl whitespace-pre-line">
          <div className="relative py-6 bg-white rounded-lg flex items-center gap-3 h-[116px] shadow-md px-4">
            {/* Icon Placeholder */}
            <div
              className={`w-16 h-16 rounded-full ${item.bgColor} flex items-center justify-center`}
            >
              {/* Add Icon Here */}
            </div>
            {/* Order Details */}
            <div>
              <p className="text-slate-800 font-bold text-2xl">
                {item.count}
              </p>
              <span className="text-[#828A95] text-lg font-bold">
                {item.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default OrderStatistics
