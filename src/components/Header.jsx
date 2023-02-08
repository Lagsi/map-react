import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.about}>
          <Link className={styles["button-wrapper"]} to="/about">
            <button className={styles["go-back"]}>Who we are</button>
          </Link>
        </div>
        <div>
          <Link to="/">
            <h1 className={styles["app-title"]}>News Map</h1>
          </Link>
        </div>
        <div>
          <Link className={styles["button-wrapper"]} to="/saved">
            <button className={styles["go-back"]}>Saved News</button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
