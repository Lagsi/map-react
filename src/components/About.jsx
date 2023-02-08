import React from "react";
import { Link } from "react-router-dom";
import AboutCard from "./AboutCard";
import styles from "./About.module.css";
import Footer from "./Footer";

function About() {
  return (
    <div className="about-page-container">
      <p className="words">
        In this application, our main objective is to provide uncensored and
        unbiased news coverage from countries around the world. This means that
        all news topics, including human rights, gender equality, politics from
        various parties, art and sports, should be made accessible to users
        without selective filtering or editorial bias, as opposed to traditional
        television news broadcasting policies.
      </p>

      <div className="about-card-container">
        <AboutCard
          name="Nima"
          image="https://avatars.githubusercontent.com/u/46765718?v=4"
          twitter="https://twitter.com/NimTheZee"
          github="https://github.com/n13a"
          linkedin="https://www.linkedin.com/in/nima-esmaeilzadeh/"
        />
        <AboutCard
          name="Ayla"
          image="https://avatars.githubusercontent.com/u/84172269?v=4"
          twitter="https://twitter.com/CuraAyla"
          github="https://github.com/aylacura"
          linkedin="https://www.linkedin.com/in/aylacura/"
        />
        <AboutCard
          name="Jeppe"
          image="https://avatars.githubusercontent.com/u/28187579?v=4"
          twitter="https://twitter.com/JeppeHauman"
          github="https://github.com/JeppeHauman"
          linkedin="https://www.linkedin.com/in/jeppehauman/"
        />
      </div>
      <div className={styles["button-wrapper"]}>
        <Link className={styles["go-back"]} to="/">
          Go back
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default About;
