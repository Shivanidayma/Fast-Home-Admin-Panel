import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {FaSearch } from "react-icons/fa";
import UserTable from "./UserTable";
import { useSelector,useDispatch } from "react-redux";
import { handleAllUsers } from "../../slice/userSlice";
function User() {
  const dispatch = useDispatch()
  const { users, totalPages, error,loading } = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("Dispatching handleAllUsers...");
    dispatch(handleAllUsers({ searchQuery, page: currentPage }))
  }, [currentPage, searchQuery, dispatch]);

  
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
            onClick={() => handleAllUsers(1, searchQuery)}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
  {/* ✅ Show Loading State Before Rendering UserTable */}
        {loading ? (
          <p className="text-gray-500">Loading users...</p> // ✅ Show loading text
        ) : (
          <UserTable users={users} />
        )}        {/* Pagination */}
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
