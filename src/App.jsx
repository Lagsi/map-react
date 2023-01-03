import { useState, useRef, useEffect, forwardRef } from "react";
import "./App.css";
import World from "@svg-maps/world";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";

function App() {
  const [count, setCount] = useState(0);
  const mapRef = useRef();
  useEffect(() => {
    console.log(mapRef.current);
  }, []);

  function onClick() {
    console.log(mapRef);
  }

  return (
    <div className="map-container">
      <SVGMap ref={mapRef} map={World} onLocationClick={onClick} />
    </div>
  );
}

export default App;
