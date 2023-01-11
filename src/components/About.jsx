import React from "react";
import { Link } from "react-router-dom";
import AboutCard from "./AboutCard";

function About() {
  return (
    <>
      <p className="words">This is our baby. We love this map to death</p>

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
      <Link to="/">
        <p className="go-back">Go back</p>
      </Link>
    </>
  );
}

export default About;
