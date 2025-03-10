import React, { useEffect, useState } from "react";
import api from "../../api/api";
import ReactPaginate from "react-paginate";
import {FaSearch } from "react-icons/fa";
import UserTable from "./UserTable";
function User() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  async function handleCustomers(currentPage = 1, searchQuery = "") {
    const queryParam = searchQuery
      ? `&search=${encodeURIComponent(searchQuery.trim())}`
      : "";
    const page_number = queryParam.length === 0 ? currentPage : 1;
    const response = await api
      .get(
        `/customer_users?per_page=${perPage}&page=${page_number}${queryParam}`
      )
      .then((response) => {
        setCustomers(response.data.customer_users);
        setTotalPages(response?.data?.details?.total_pages);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "An error occurred.");
      });
  }

  useEffect(() => {
    handleCustomers(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <div className="ml-[50px] flex-grow h-screen w-full overflow-auto bg-gray-100 p-6">
        {/* Adjust ml-[250px] based on your sidebar width */}

        <h2 className="text-2xl font-semibold mb-4">Customer List</h2>

        {error && <p className="text-red-500">{error}</p>}
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
            onClick={() => handleCustomers(1, searchQuery)}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
      <UserTable customers={customers}/>
        {/* Pagination */}
      </div>
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
    </>
  );
}

export default User;
