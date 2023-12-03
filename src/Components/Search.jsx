// SearchBar.js
import React from 'react';


const Search = ({ searchTerm, onSearchChange, onSearch }) => {
    
  return (
    <div className="header">
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <button className="search-icon" onClick={onSearch}>Search</button>
  </div>
  )
}

export default Search

