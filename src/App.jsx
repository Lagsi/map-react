import { useRef, useState } from "react";
import { SVGMap } from "react-svg-map";
import { getLocationName } from "./utils";
import W from "@svg-maps/world";
const World = W.default ? W.default : W;

import Articles from "./components/Articles";
import "react-svg-map/lib/index.css";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Header from "./components/Header";

import Saved from "./components/saved";
import { Countries } from "../countries.js";
import TInput from "react-autocomplete-input";
const TextInput = TInput.default ? TInput.default : TInput;
import "react-autocomplete-input/dist/bundle.css";

function App() {
  const [data, setData] = useState([]);
  console.log(data.length);
  const [clickedCountry, setClickedCountry] = useState(null);
  const myElement = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  function mouseOver(event) {
    setInputValue(getLocationName(event));
  }

  const fetchApiData = async (country) => {
    setLoading(true);
    const response = await fetch(
      `https://content.guardianapis.com/search?show-tags=contributor&show-references=author&q=${country}&page-size=20&show-fields=all&api-key=${
        import.meta.env.VITE_GUARDIAN_API
      }`
    );
    const articles = await response.json();
    setData(articles.response.results);
    setLoading(false);
    scrollToNews();
  };

  const scrollToNews = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  const mouseOut = () => {
    setInputValue("");
  };
  const onClick = (event) => {
    const country = getLocationName(event);
    setClickedCountry(country);
    fetchApiData(country);
  };
  const handleChange = (event) => {
    setInputValue((prev) => (prev = event));
  };
  const mobileButtonClick = (event) => {
    const country = event.trim();
    setClickedCountry(country);
    setInputValue("");
    fetchApiData(country);
  };
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="input-container">
                  <p>
                    Type the name of the country you wish to see news from or
                    click the map below
                  </p>
                  <TextInput
                    placeholder="Type a Country"
                    className="input"
                    onSelect={mobileButtonClick}
                    options={Countries}
                    trigger={""}
                    value={inputValue}
                    onChange={handleChange}
                    Component={"input"}
                    passThroughEnter={true}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        const newInputValue =
                          inputValue[0].toUpperCase() + inputValue.slice(1);
                        mobileButtonClick(newInputValue);
                      }
                    }}
                  />
                </div>
                <div className="not-mobile">
                  {loading && (
                    <div className="loading">
                      <h3>LOADING...</h3>
                    </div>
                  )}

                  <div ref={myElement} className="map-container">
                    <SVGMap
                      map={World}
                      onLocationMouseOut={mouseOut}
                      onLocationClick={onClick}
                      onLocationMouseOver={mouseOver}
                    />
                  </div>
                  <h2 className="clicked-country">{clickedCountry}</h2>
                  {data && (
                    <div className="articles-container">
                      <Articles data={data} />
                    </div>
                  )}
                </div>
              </>
            }
          />
          <Route path="/saved" element={<Saved />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
