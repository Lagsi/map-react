import { useState, useRef, useEffect, forwardRef } from "react";
import "./App.css";
import World from "@svg-maps/world";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import { getLocationId, getLocationName } from "./utils";

function App() {
  const [count, setCount] = useState(0);
  const mapRef = useRef();
  useEffect(() => {
    console.log(mapRef.current);
  }, []);

  function onClick(event) {
    console.log(getLocationName(event));
  }

  return (
    <div className="map-container">
      <SVGMap map={World} onLocationClick={onClick} />
    </div>
  );
}

export default App;
