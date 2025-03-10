import React, { useEffect, useState } from "react";
import api from "../../api/api";
import ReactPaginate from "react-paginate";
import OrderTable from "./OrderTable";
import { FaSearch } from "react-icons/fa";
function Order() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  async function handleAllOrders(searchQuery = "",page = 1) {
    try {
      const queryParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : "";
      const page_number = queryParam.length === 0 ? page : 1
      const response = await api.get(
        `/orders?page=${page_number}&per_page=${perPage}${queryParam}`
      );

      setOrders(response.data.transaction);
      setTotalPages(response.data.details.total_pages || 1);
    } catch (err) {
      setError(
        err.response?.data?.status || "An error occurred. Please try again."
      );
    }
  }

  useEffect(() => {
   handleAllOrders(searchQuery,currentPage)
  }, [searchQuery,currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className="flex-grow h-screen w-full overflow-auto bg-white dark:bg-gray-900 rounded-lg shadow-md mx-5">
      <div className="p-4 flex items-center space-x-2">
        {/* Search Input with Icon */}
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by Name or Restaurant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={() => handleAllOrders(1, searchQuery)}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>
      {/* Table */}
      <OrderTable  perPage={perPage} orders={orders} />
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"flex list-none gap-2"}
          pageClassName={"px-3 py-1 border rounded bg-gray-100 cursor-pointer"}
          activeClassName={"bg-red-600 text-black font-bold border-blue-600"}
          previousClassName={
            "px-3 py-1 border rounded bg-gray-300 cursor-pointer"
          }
          nextClassName={"px-3 py-1 border rounded bg-gray-300 cursor-pointer"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
    </div>
  );
}

export default Order;
