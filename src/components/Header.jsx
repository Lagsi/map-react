import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header>
      <div className="header">
        <div className="about">
          <Link className={styles["button-wrapper"]} to="/about">
            <button className={styles["go-back"]}>Who we are</button>
          </Link>
        </div>
        <Link to="/">
          <h1 className={styles["app-title"]}>React Map</h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;
