import { FaHeart, FaUser } from "react-icons/fa";
import "../Styles/Navbar.css";
import { useState } from "react";
import { Link } from "react-router";

function Navbar({ onSearch }) {
  //Skickar onSearch som prop så att allt kopplas ihop i App.jsx
  //När användaren söker skickas query-värdet upp till App.jsx via onSearch-propen

  const [query, setQuery] = useState(""); //Börja med tom sträng

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      //Om användaren trycker på enter så skickar onSearch(query), alltså det användaren har skrivit
      onSearch(query);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to=""><h1 className="logo">
            Movie <br />
            Library
          </h1></Link>

          <div className="nav-right">
            <input
              className="search-bar"
              placeholder="Search for movies..."
              value={query} //Kontrollera vad som visas i fältet
              onChange={(e) => setQuery(e.target.value)} //Uppdatera query vid varje knapptryckning
              onKeyDown={handleSearch} //På varje knapptryckning körs handleSearch funktionen
            />

            <div className="nav-icons">
              <Link to="Favorites"><FaHeart /></Link>
              <FaUser />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
