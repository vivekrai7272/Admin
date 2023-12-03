import React from "react";

const Pagination = ({ currentPage, totalPages, onGoToPage }) => (
  <div className="pagination">
    <button onClick={() => onGoToPage(1)} disabled={currentPage === 1}>
      First
    </button>
    <button
      onClick={() => onGoToPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Prev
    </button>
    <button style={{ backgroundColor: "red" }}>{currentPage}</button>
    <button
      onClick={() => onGoToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
    <button
      onClick={() => onGoToPage(totalPages)}
      disabled={currentPage === totalPages}
    >
      Last
    </button>
  </div>
);
export default Pagination;
