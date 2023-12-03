import React, { useState, useEffect } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import SearchBar from "./Search";
import { MdDelete } from "react-icons/md";
import "./style.css";

const UserManagement = () => {
  const [totalSelected, setTotalSelected] = useState(0);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const rowsPerPage = 10;

  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      search();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.id - b.id);
      setUserData(sortedData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const deleteSelected = () => {
    const updatedData = userData.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUserData(updatedData);
    setSelectedRows([]);
  };
  const toggleRowSelection = (userId) => {
    setSelectedRows((prevSelectedRows) => {
      const isUserSelected = prevSelectedRows.includes(userId);
      const newSelectedRows = isUserSelected
        ? prevSelectedRows.filter((id) => id !== userId)
        : [...prevSelectedRows, userId];
  
      setTotalSelected(newSelectedRows.length);
      return newSelectedRows;
    });
  };

  const editRow = (userId) => {
    console.log("Editing row:", userId);
  };

  const deleteRow = (userId) => {
    const updatedData = userData.filter((user) => user.id !== userId);

    setUserData(updatedData);

    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.filter((id) => id !== userId)
    );
  };

  const search = () => {
    console.log("Searching for:", searchTerm);
  };

  const goToPage = (page) => {
    setCurrentPage(
      Math.max(1, Math.min(page, Math.ceil(userData.length / rowsPerPage)))
    );
  };

  const filteredData = userData.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div id="userManagement">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearch={search}
      />
      <table>
        <div className="btn-delete">
          <button onClick={deleteSelected} className="btn">
            <MdDelete />
          </button>
        </div>

        <Table
          data={filteredData.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
          )}
          selectedRows={selectedRows}
          onToggleRowSelection={toggleRowSelection}
          onEditRow={editRow}
          onDeleteRow={deleteRow}
        />
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onGoToPage={goToPage}
      />
      <div className="paginationInfo">
        {totalSelected >= 0
          ? `${totalSelected} out of ${userData.length} selected`
          : ""}
      </div>
    </div>
  );
};

export default UserManagement;
