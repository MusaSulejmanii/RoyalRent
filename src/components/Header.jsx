import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">
            <NavLink to="/">
              <img src="/assets/logo.png" alt="Logo" width={50} />
            </NavLink>
          </div>
          <span className="logo-text" style={{ fontSize: "30px" }}>
            RoyalRent
          </span>
        </div>

        <nav className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Vehicles
          </NavLink>

          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            News
          </NavLink>
        </nav>

        <div className="header-actions">
          <div className="contact-info">
            <div className="contact-icon">
              <img src="/assets/phone-icon.png" alt="Phone-Icon" />
            </div>
            <div className="contact-text">
              <span className="contact-label">Need help?</span>
              <span className="contact-number">+389 71 311 030</span>
            </div>
          </div>

          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
