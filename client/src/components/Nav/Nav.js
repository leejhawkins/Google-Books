import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <ul className="navbar-nav float-right">
        <li className="nav-item">
          <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
            Search
        </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/reading-list"
            className={window.location.pathname === "/reading-list" ? "nav-link active" : "nav-link"}
          >
            Reading List
        </Link>
        </li>
      </ul>
      
    </nav>
  );
}

export default Nav;
