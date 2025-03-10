import React from 'react';

function OrderCard({ order }) {
  return (
    <div className="border border-gray-300 p-4 mb-4 rounded-lg shadow-md bg-white">
      {/* Order Details */}
      <div className="mb-3">
        <p className="text-lg font-semibold text-gray-700">🆔 Order ID: {order.id}</p>
        <p><strong>🍽️ Restaurant:</strong> {order.restaurant}</p>
        <p><strong>👤 Ordered By:</strong> {order.ordered_by}</p>
        <p><strong>📞 Contact:</strong> {order.customer_contact_no}</p>
      </div>

      {/* Pricing & Time Details */}
      <div className="bg-gray-100 p-3 rounded-md mb-3">
        <p><strong>💰 Total Amount:</strong> ₹{order.total_amount}</p>
        <p><strong>⏳ Remaining Time:</strong> {order.remaining_time}</p>
        <p><strong>🚚 Delivery Time:</strong> {order.delivery_time}</p>
      </div>

      {/* Customer Note */}
      <p className="text-sm italic text-gray-600 bg-gray-200 p-2 rounded-md">
        <strong>📝 Note:</strong> {order.customer_note || "No special instructions"}
      </p>

      {/* Cart Items */}
      <div className="mt-3">
        <h3 className="font-semibold text-gray-700">🛒 Cart Items:</h3>
        <ul className="ml-4 mt-1 space-y-2">
          {order.cart_items.map((item) => (
            <li key={item.id} className="border border-gray-200 p-3 rounded-lg bg-gray-50 shadow-sm">
              <p><strong>🍕 Item:</strong> {item.item_name}</p>
              <p><strong>🔢 Quantity:</strong> {item.item_quantity}</p>
              <p><strong>💲 Price:</strong> ₹{item.item_price}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Customer Address */}
      <div className="mt-3 bg-gray-50 p-3 rounded-md border border-gray-200">
        <h3 className="font-semibold text-gray-700">📍 Customer Address:</h3>
        <p><strong>🏠 Street:</strong> {order.customer_address.street}</p>
        <p><strong>🗺️ State:</strong> {order.customer_address.state}</p>
        <p><strong>🏡 Full Address:</strong> {order.customer_address.address}</p>
      </div>
    </div>
  );
}

export default OrderCard;
