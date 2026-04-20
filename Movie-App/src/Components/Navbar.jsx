import { FaHeart, FaUser } from "react-icons/fa"
import "./Navbar.css"

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">

                    <h1 className="logo">Movie Library</h1>

                    <input className="search-bar" placeholder="Search for movies..."></input>

                    <div className="nav-icons">
                        <button id="myList-btn">My List</button>
                        <FaHeart />
                        <FaUser />
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;