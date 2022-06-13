import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src="/images/logo.png" height="60" alt="logo" />
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
              <Link to="/" className="nav-link">
                Community
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tech-info" className="nav-link">
                Tech Info
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/faq" className="nav-link">
                FAQ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/maxja-nft" className="nav-link">
                MAXJA NFT
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <button className="btn btn-primary launch-app">LAUNCH APP</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
