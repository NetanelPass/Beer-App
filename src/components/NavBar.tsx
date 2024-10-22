import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Beer App</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Browse Beers</Link>
        </li>
        <li>
          <Link to="/favorites">Favorite Beers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
