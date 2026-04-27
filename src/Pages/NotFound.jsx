import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div stlye={{ textAlign: "center", marginTop: "20rem" }}>
      <h1>404</h1>
      <p>page not found</p>

      <Link to="/">
        <button>Go back home</button>
      </Link>
    </div>
  );
};

export default NotFound;
