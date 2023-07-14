import React from "react";
import { Link } from "react-router-dom";
import AboutCard from "./AboutCard";
import styles from "./About.module.css";
import Footer from "./Footer";

function About() {
  return (
    <div className="about-page-container">
      <p className="words">
        Our React application combines the power of The Guardian's API with an interactive map of the world. Through this innovative integration, users can explore news articles and stories from The Guardian's extensive database, all displayed on an intuitive and visually appealing map interface. By simply navigating the map, users can discover articles related to specific regions or countries, gaining valuable insights and a global perspective on the latest news and events. With its seamless blend of real-time journalism and geographic visualization, our application offers a unique and engaging way to stay informed about the world.
      </p>

      <p className="words">
        We are using <a href="https://open-platform.theguardian.com/">The Guardian API</a> as our source
        for news.{" "}
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
