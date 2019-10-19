import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="welcome">
      <nav className="topbar">
        <Link to="/" className="topbar-logo">
          Kubernetic
        </Link>

        <div className="topbar-menu">
          <div className="topbar-menu-additional">
            <a href="/#pricing">Pricing</a>
            <a href="http://docs.kubernetic.com/">Documentation</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
