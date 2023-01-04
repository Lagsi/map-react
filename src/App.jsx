import { useState, useRef, useEffect, forwardRef } from "react";
import "./App.css";
import World from "@svg-maps/world";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import { getLocationId, getLocationName } from "./utils";

function App() {
  const [data, setData] = useState();
  const [link, setLink] = useState();
  let header;

  function onClick(event) {
    const country = getLocationName(event);

    try {
      fetch(
        `https://content.guardianapis.com/search?order-by=newest&q=${country}&api-key=${
          import.meta.env.VITE_GUARDIAN_API
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.response.results);
          setData(data.response.results);
          setLink(data.response.results[0].webUrl);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="map-container">
      <SVGMap map={World} onLocationClick={onClick} />
      {
        <h1>
          <a href={link}>{data}</a>
        </h1>
      }
    </div>
  );
}

export default App;
