import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.about}>
          <Link className={styles["go-back"]} to="/about">
            Who we are
          </Link>
        </div>
        <div className={styles["app-title-container"]}>
          <Link to="/">
            <h1 className={styles["app-title"]}>News Map</h1>
          </Link>
        </div>
        <div>
          <Link className={styles["go-back"]} to="/saved">
            Saved news
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
