import { useState } from "react";
import "./App.css";
import World from "@svg-maps/world";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import { getLocationName } from "./utils";
import Articles from './components/Articles'
function App() {
  const [data, setData] = useState([]);


  function onClick(event) {
    const country = getLocationName(event);

    try {
      fetch(
        `https://content.guardianapis.com/search?show-tags=contributor&show-references=author&q=${country}&show-fields=thumbnail&api-key=${import.meta.env.VITE_GUARDIAN_API
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.response.results);
          let newArr = [];
          newArr = data.response.results;
          setData(newArr);
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
