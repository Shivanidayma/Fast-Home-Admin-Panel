import React, { useEffect, useState } from 'react'


  function AssignDriver(){
  return (
    <div className="max-w-full  min-h-[12rem] flex flex-col bg-[#FFFFFF] border shadow-sm rounded-xl mt-2 ml-2 mb-7">
    <div className="pl-4 pt-2 inline-flex text-base whitespace-nowrap">
      Assign Drivers
      <div dir="rtl" className="md:ml-10 mt-2 md:mt-0">
        <div className="relative h-6 w-15 text-blue-600 pr-2 md:pr-8 pl-4 md:pl-5 xl:pl-10 cursor-pointer ">
          <a className="text-sm whitespace-nowrap">View All</a>
        </div>
      </div>
    </div>
      {/* Scrollable Order List */}
      <div className="flex flex-auto flex-col p-2 gap-2 overflow-auto max-h-[200px]">
        {/* {orders.length > 0 ? (
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
             
            </div>
          ))
        ) : (
          <h1 className="m-10 flex items-center justify-center text-gray-500">
            No placed orders available
          </h1>
        )} */}
      </div>
    <div className="flex flex-auto flex-col p-2 gap-2 overflow-auto">
      <h1 className="m-10 flex items-center justify-center">
        No data available
      </h1>
      <div className=" pt-2 pb-2">
        <a className="pl-3 text-blue-500 cursor-pointer text-sm">
          View Pending Requests (0)
        </a>
      </div>
    </div>
  </div>
  )
}
export default AssignDriver
