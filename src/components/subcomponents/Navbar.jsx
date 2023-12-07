import React from "react";
import { Logo } from "../Imports";
import { Link } from "react-router-dom";



function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg  bg-dark fixed"  data-bs-theme="dark">
      <div className="container text-light">
        <Link to="/" className="navbar-brand">
        <img src={Logo} alt="logo" width="150" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page" >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/rooms" className="nav-link" aria-current="page" >
                Rooms & Suites
              </Link>
            </li>
         
            <li className="nav-item">
              <Link to="/gallery" className="nav-link">
                Gallery
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link" >
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contacts" className="nav-link">
                Contacts
              </Link>
            </li>

          </ul>

          <div className="d-flex">
          <Link to="/rooms" className="btn btn-outline-success me-2" >BOOK NOW</Link>
        </div>
        <Link to="/login" className="btn btn-outline-light">
              <i className="bi bi-person-lock me-1"></i>
            </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
