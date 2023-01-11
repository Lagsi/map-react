import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="header">
        <div className="about">
          <Link to="/about">Who we are</Link>
        </div>

        <h1>React Map</h1>
      </div>
    </header>
  );
}

export default Header;
