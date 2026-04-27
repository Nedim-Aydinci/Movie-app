import React from "react";
import { useState } from "react";
import "../Styles/Pagination.css";
import MovieWrapper from "./MovieWrapper";
//adjustment of page amount
const WINDOW_SIZE = 10;

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const getPageNumbers = () => {
    //window calculation
    let start = currentPage - Math.floor(WINDOW_SIZE / 2);
    let end = start + WINDOW_SIZE - 1;

    //edge/boundery estimation
    if (start < 1) {
      start = 1;
      end = Math.min(WINDOW_SIZE - 1);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - WINDOW_SIZE + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getPageNumbers();

  return (
    <div className="pagination">
      <button
        className="pagination-nav"
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          className={`pagination-page ${currentPage === page ? "active" : ""}`}
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-nav"
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
