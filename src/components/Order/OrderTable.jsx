import React from "react";
import { useState } from "react";
function OrderTable({ orders,perPage}) {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  return (
    <table className="w-full h-full min-w-max border-separate border-spacing-0">
      <thead className="bg-purple-100 text-left sticky top-0">
        <tr className="border-b">
          <th className="px-4 py-3 text-left font-semibold">ID</th>
          <th className="px-4 py-3 text-left font-semibold">NAME</th>
          <th className="px-4 py-3 text-left font-semibold">RESTAURANT NAME</th>
          <th className="px-4 py-3 text-left font-semibold">ITEM NUMBER</th>
          <th className="px-4 py-3 text-left font-semibold">PURCHASED ITEMS</th>
          <th className="px-4 py-3 text-left font-semibold">TOTAL SPEND</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-300 min-h-[400px]">
        {orders.length > 0 ? (
          orders.map((order) => (
            <tr
              key={order.order_id}
              className="text-gray-600 hover:bg-gray-100 border-b"
            >
              <td className="px-4 py-2">{order.order_id}</td>
              <td className="px-4 py-2">{order.name}</td>
              <td className="px-4 py-2">{order.restaurant_name}</td>
              <td className="px-4 py-2">{order.total_quantity}</td>
              <td className="px-4 py-2">
                {order.purchased_items[0]}
                <button
                  onClick={() =>
                    setExpandedOrderId(
                      expandedOrderId === order.order_id ? null : order.order_id
                    )
                  }
                  className="text-blue px-3 py-1 rounded hover:underline"
                >
                  {expandedOrderId === order.order_id ? "Collapse" : "Details"}
                </button>
                {expandedOrderId === order.order_id && (
                  <tr className="bg-gray-100">
                    <td colSpan="6" className="px-4 py-4">
                      <div className="h-auto transition-all duration-300 ease-in-out">
                        {order.purchased_items?.length > 0 ? (
                          order.purchased_items.map((item, index) => (
                            <span key={index} className="text-gray-700">
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">
                            No items available
                          </span>
                        )}{" "}
                      </div>
                    </td>
                  </tr>
                )}
              </td>
              <td className="px-4 py-2 font-semibold text-green-600">
                ₹{order.total_spend}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="6"
              className="px-4 py-2 text-center text-gray-500 border-b"
            >
              No orders available.
            </td>
          </tr>
        )}
        {/* Fill Empty Rows to Maintain Table Height */}
        {orders.length < perPage &&
          Array.from({ length: perPage - orders.length }).map((_, index) => (
            <tr key={`empty-${index}`} className="h-12 border-b">
              <td colSpan="4"></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default OrderTable;
