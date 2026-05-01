import { FaHeart, FaUser, FaDice } from "react-icons/fa";
import "../Styles/Navbar.css";
import { useState } from "react";
import { Link } from "react-router";
import useSearchStore from "../store/SearchStore.js";

function Navbar({ onReset }) {
  //Retrieves state and setters directly from the state store
  const { query, setQuery, setMode } = useSearchStore();

  const handleSearch = (e) => {
    if (e.key !== "Enter" || query.trim() === "") return;
    setMode("search");
  };

  //Resets all filters and switches back to browse mode.
  //Called, when the user clicks on logotype or "Clear search".
  const handleReset = () => {
    setQuery("");
    setMode("browse");
    //calls the reset function from App.jsx if it's passed in as a prop
    if (onReset) onReset();
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" onClick={handleReset}>
            <h1 className="logo">
              Movie
              <br />
              Library
            </h1>
          </Link>

          <Link to="RandomMovie" className="random-movie">
            <FaDice />
          </Link>

          <div className="nav-right">
            <input
              className="search-bar"
              placeholder="Search for movies..."
              value={query} //Kontrollera vad som visas i fältet
              onChange={(e) => setQuery(e.target.value)} //Uppdatera query vid varje knapptryckning
              onKeyDown={handleSearch} //På varje knapptryckning körs handleSearch funktionen
            />

            <div className="nav-icons">
              <Link to="Favorites">
                <FaHeart />
              </Link>

              <FaUser />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
