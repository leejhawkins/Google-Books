import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <header className="navbar navbar-expand-lg navbar-dark flex-column flex-md-row bg-info">
      <a class="navbar-brand mr-0 mr-md-2" href="/">My Reading List <i class="material-icons">bookmark</i> </a>
      <ul className="navbar-nav ml-md-auto" >
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
      
      
    </header>
  );
}

export default Nav;
