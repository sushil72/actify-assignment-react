// src/components/Table.js
import React, { useState } from "react";

const Table = () => {
  // Dummy data
  const dummyData = Array.from({ length: 50 }, (_, index) => ({
    accountName: `Account ${index + 1}`,
    email: `account${index + 1}@example.com`,
    phone: `123-456-789${index % 10}`,
    website: `www.account${index + 1}.com`,
    industry: index % 2 === 0 ? "Technology" : "Finance",
    status: index % 3 === 0 ? "Active" : "Inactive",
    remark: index % 2 === 0 ? "Good standing" : "Needs attention",
  }));

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  // Calculate current entries
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = dummyData.slice(indexOfFirstEntry, indexOfLastEntry);

  // Calculate total pages
  const totalPages = Math.ceil(dummyData.length / entriesPerPage);

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex w-screen h-screen justify-between max-w-full	overflow-hidden border border-red-700">
      {/* Left Side Navigation */}
      <nav className="w-[20%] text-left  bg-white text-black p-4 ">
        <h2 className="text-xl font-bold mb-6">Navigation</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="block py-2 px-4 rounded hover:bg-blue-300">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 rounded hover:bg-blue-300">
              Account
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 rounded hover:bg-blue-300">
              Reports
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 rounded hover:bg-blue-300">
              Settings
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className=" ">
        <h1 className="text-2xl font-bold mb-4">Dummy Data Table</h1>

        <div className="overflow-x-auto">
          <table className=" bg-white border  border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-4 py-2 text-left">Account Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone No.</th>
                <th className="px-4 py-2 text-left">Website</th>
                <th className="px-4 py-2 text-left">Industry</th>
                <th className="px-4 py-2 text-left">Account Status</th>
                <th className="px-4 py-2 text-left">Remark</th>
              </tr>
            </thead>
            <tbody className="">
              {currentEntries.map((entry, index) => (
                <tr key={index} className="border-b  border-gray-200">
                  <td className="px-4 py-2">{entry.accountName}</td>
                  <td className="px-4 py-2">{entry.email}</td>
                  <td className="px-4 py-2">{entry.phone}</td>
                  <td className="px-4 py-2">{entry.website}</td>
                  <td className="px-4 py-2">{entry.industry}</td>
                  <td className="px-4 py-2">{entry.status}</td>
                  <td className="px-4 py-2">{entry.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 mx-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
