import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ArrowUpDown, Download, Search } from "lucide-react";

const Table = () => {
  const tableData = useSelector((state) => state.table.tableData);

  // State for pagination, sorting, and search
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("ascending"); // "ascending" or "descending"
  const [searchTerm, setSearchTerm] = useState("");
  const entriesPerPage = 10;

  // Sort function
  const sortData = (data, order) => {
    return [...data].sort((a, b) => {
      const nameA = a.accountName.toLowerCase();
      const nameB = b.accountName.toLowerCase();
      return order === "ascending"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = tableData.filter((entry) =>
      Object.values(entry).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    return sortData(filtered, sortOrder);
  }, [tableData, searchTerm, sortOrder]);

  // Pagination calculations
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredAndSortedData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredAndSortedData.length / entriesPerPage);

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "Account Name",
      "Email",
      "Phone No.",
      "Website",
      "Industry",
      "Account Status",
      "Remark",
    ];
    const dataKeys = [
      "accountName",
      "email",
      "phone",
      "website",
      "industry",
      "status",
      "remark",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredAndSortedData.map((entry) =>
        dataKeys.map((key) => `"${entry[key]}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "account_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex w-screen h-[90vh]">
      {/* Left Side Navigation */}
      <nav className="w-64 bg-white text-black p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/table"
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
            <div className="flex justify-between items-center px-3 pt-3">
              <h1 className="text-2xl font-bold">Account List</h1>
              <div className="flex gap-4 items-center">
                <button
                  onClick={toggleSortOrder}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <ArrowUpDown size={20} />
                  View {sortOrder === "ascending" ? "A to Z" : "Z to A"}
                </button>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <Download size={20} />
                  Export CSV
                </button>
              </div>
            </div>

            <p className="text-gray-500 p-3">
              Showing {indexOfFirstEntry + 1} to{" "}
              {Math.min(indexOfLastEntry, filteredAndSortedData.length)} of{" "}
              {filteredAndSortedData.length} entries
            </p>

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
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded bg-white text-blue-500 hover:bg-blue-50 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 hover:bg-blue-50"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded bg-white text-blue-500 hover:bg-blue-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
