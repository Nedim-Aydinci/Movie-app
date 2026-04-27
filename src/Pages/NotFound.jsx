import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="NotFound">
      <div className="notfound-card">
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to="/">
          <button>Go back home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
