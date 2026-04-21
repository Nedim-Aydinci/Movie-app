import React from "react";
import { useState } from "react";

const Pagination = (
  currentPage,
  setCurrentPage,
  totalMovies,
  moviesPerPage,
) => {
  //using state to select pages. 1 is the start, default value.
  //const [currentPage, setCurrentpage] = useState(1);

  const pages = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      <button onClick={() => setCurrentpage(currentPage - 1)}>Prev</button>
      {pages.map((page) => (
        <button key={page} onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
      <button onClick={() => setCurrentpage(currentPage + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
Ö;
