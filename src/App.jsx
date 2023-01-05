import { useState } from "react";
import { SVGMap } from "react-svg-map";
import { getLocationName } from "./utils";
import World from "@svg-maps/world";
import Articles from './components/Articles'
import "react-svg-map/lib/index.css";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const onClick = (event) => {
    const country = getLocationName(event);
    try {
      fetch(
        `https://content.guardianapis.com/search?show-tags=contributor&show-references=author&q=${country}&show-fields=thumbnail&api-key=${import.meta.env.VITE_GUARDIAN_API
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data.response.results);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="map-container">
        <SVGMap map={World} onLocationClick={onClick} />
      </div>
      <Articles data={data} />
    </>
  );
}

export default App;
