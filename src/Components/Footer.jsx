import "../Styles/Footer.css";
import { FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <h2>
              Movie <br /> Library
            </h2>
          </div>

          <div className="footer-middle">
            <p>About</p>
            <p>Contact</p>
            <p>Help</p>
          </div>

          <div className="footer-right">
            <p>Socials:</p>
            <div className="footer-icons">
              <FaFacebook />
              <FaInstagram />
              <FaGithub />
            </div>
          </div>
        </div>

        <div className="footer-trademark">
          <p>© Movie Library 2026</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
