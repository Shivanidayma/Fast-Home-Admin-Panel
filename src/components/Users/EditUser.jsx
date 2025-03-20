import React, { useState } from "react";
import {FaUserCircle,FaEnvelope,FaPhone,FaUser,FaMapMarkerAlt,FaRoad,FaCity,FaMap,FaHome,FaEnvelopeOpenText,} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import api from "../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditUser({ customer, onClose }) {
  const blockUser = async (customer) => {
    try {
      console.log(customer)
      await api.patch(`/user/${customer.id}`);
      toast.success("User has been blocked successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error("Failed to block user. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error blocking user:", err);
    }
  };

  if (!customer) return null; // Hide if no customer is selected

  return (
    <div className="fixed top-4 right-0 w-96 h-full bg-white shadow-xl border-l p-6 transition-transform transform translate-x-0">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl transition"
      >
        <IoClose />
      </button>

      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-4 gap-x-10">
        <FaUserCircle className="text-blue-500" /> Edit User Details
      </h2>

      <div className="space-y-8">
        {/* Image */}
        <div className="flex justify-center">
          {customer.image ? (
            <img
              src={customer.image}
              alt={customer.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-md"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400 border-2 border-gray-300 shadow-md p-2 rounded-full" />
          )}
        </div>

        {/* Name */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            defaultValue={customer.name}
            className="w-full bg-transparent focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            defaultValue={customer.email}
            className="w-full bg-transparent focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
          <FaPhone className="text-gray-500 mr-2" />
          <input
            type="text"
            defaultValue={customer.phone}
            className="w-full bg-transparent focus:outline-none"
          />
        </div>

        {/* CUstomer address*/}
        <div className="mt-3 bg-gray-50 p-3 rounded-md border border-gray-200">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" /> Customer Address:
          </h3>
          <p className="flex items-center gap-2">
            <FaRoad className="text-gray-500" /> <strong>Street:</strong>{" "}
            {customer.addresses[0]?.street}
          </p>
          <p className="flex items-center gap-2">
            <FaMap className="text-gray-500" /> <strong>State:</strong>{" "}
            {customer.addresses[0]?.state}
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelopeOpenText className="text-gray-500" />{" "}
            <strong>Zip code:</strong> {customer.addresses[0]?.zip_code}
          </p>
          <p className="flex items-center gap-2">
            <FaHome className="text-gray-500" /> <strong>Address 1:</strong>{" "}
            {customer.addresses[0]?.address1}
          </p>
          <p className="flex items-center gap-2">
            <FaCity className="text-gray-500" /> <strong>City:</strong>{" "}
            {customer.addresses[0]?.city}
          </p>
        </div>

        <div className="mt-3 bg-gray-50 p-3 rounded-md border border-gray-200">
  <div className="flex gap-4">
    {/* Block User button */}
    <button className="w-1/2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
    onClick={() => blockUser(customer)}
     >
      Block User
    </button>
    
    {/* Cancel button */}
    <button className="w-1/2 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition font-semibold"
    onClick={onClose}
    >
      Cancel
    </button>
  </div>
</div>

      </div>
    </div>
  );
}

export default EditUser;
