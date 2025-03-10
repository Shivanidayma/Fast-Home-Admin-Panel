import React, { useState } from "react";
import { FaUserCircle, FaAngleRight } from "react-icons/fa";
import api from "../../api/api";
import EditUser from "./EditUser";

function UserTable({ customers }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const showCustomerDetails = async (customer) => {
    try {
      const response = await api.get(`/customer_user/${customer.id}`);
      setSelectedCustomer(response.data.customer_user);
    } catch (err) {
      console.error("Failed to fetch details", err);
    }
  };

  return (
    <div className="relative flex w-full">
      {/* Table Content */}
      <div className={`w-full ${selectedCustomer ? "pr-96" : ""} space-y-4`}>
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 transition hover:bg-gray-50"
          >
            <div className="w-1/6 flex justify-center">
              {customer.image ? (
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
              ) : (
                <FaUserCircle className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <div className="w-1/4 text-gray-700 font-semibold">
              {customer.name}
            </div>
            <div className="w-1/4 text-gray-600">{customer.email}</div>
            <div className="w-1/4 text-gray-500">{customer.phone}</div>
            <div className="w-1/4 text-gray-400">{customer.total_orders}</div>
            <div className="w-1/6 flex justify-center">
              <button
                className="bg-black-500 text-black p-2 rounded-full hover:bg-gray-800 transition"
                onClick={() =>
                  selectedCustomer?.id === customer.id
                    ? setSelectedCustomer(null)
                    : showCustomerDetails(customer)
                }
              >
                <FaAngleRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit User Panel (Slides in from right) */}
      {selectedCustomer && (
        <EditUser
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}

export default UserTable;
