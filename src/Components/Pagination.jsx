import React from "react";
import { useState } from "react";

const Pagination = () => {
  //using state to select pages. 1 is the start, default value.
  const [currentPage, setCurrentpage] = useState(1);
  return (
    <div>
      <button onClick={() => setCurrentpage(currentPage - 1)}>Prev</button>
      <button>{currentPage}</button>
      <button onClick={() => setCurrentpage(currentPage + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
Ö;
