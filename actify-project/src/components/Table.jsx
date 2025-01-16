import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setTableData } from "../Redux/tableSlice";

const Table = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table.tableData);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("tableData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        dispatch(setTableData(parsedData));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, [dispatch]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  // Calculate current entries
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = tableData.slice(indexOfFirstEntry, indexOfLastEntry);

  // Calculate total pages
  const totalPages = Math.ceil(tableData.length / entriesPerPage);

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex w-screen h-[90vh]">
      {/* Left Side Navigation */}
      <nav className="w-64 bg-white text-black p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? "bg-blue-300" : "hover:bg-blue-300"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accounts"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? "bg-blue-300" : "hover:bg-blue-300"
                }`
              }
            >
              Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? "bg-blue-300" : "hover:bg-blue-300"
                }`
              }
            >
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? "bg-blue-300" : "hover:bg-blue-300"
                }`
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 p-6 bg-gray-200">
        <div className="flex p-3 gap-3">
          <NavLink
            to="/accounts"
            className={({ isActive }) =>
              `rounded-md bg-white py-2 px-3 ${isActive ? "bg-blue-100" : ""}`
            }
          >
            Account
          </NavLink>
          <NavLink
            to="/account-form"
            className="rounded-md bg-white py-2 px-3 hover:bg-blue-50"
          >
            Create
          </NavLink>
        </div>

        <div className="rounded-lg bg-white">
          <div className="mb-4">
            <h1 className="text-2xl text-left font-bold px-3 pt-3">
              Account List
            </h1>
            <p className="text-gray-500 p-3">
              Here is the list of your accounts
            </p>

            {tableData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">No accounts found</p>
                <NavLink
                  to="/account-form"
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Create New Account
                </NavLink>
              </div>
            ) : (
              <table className="w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-blue-100 border-b border-gray-200">
                    <th className="px-6 py-2 text-left">Account Name</th>
                    <th className="px-6 py-2 text-left">Email</th>
                    <th className="px-6 py-2 text-left">Phone No.</th>
                    <th className="px-6 py-2 text-left">Website</th>
                    <th className="px-6 py-2 text-left">Industry</th>
                    <th className="px-6 py-2 text-left">Account Status</th>
                    <th className="px-6 py-2 text-left">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((entry, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{entry.accountName}</td>
                      <td className="px-4 py-2">{entry.email}</td>
                      <td className="px-4 py-2">{entry.phone}</td>
                      <td className="px-4 py-2">{entry.website}</td>
                      <td className="px-4 py-2">{entry.industry}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            entry.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">{entry.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        {tableData.length > 0 && (
          <div className="flex justify-center mt-auto">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-3 py-1 mx-1 border rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 hover:bg-blue-50"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
