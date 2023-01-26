import { useRef, useState } from "react";
import { SVGMap, Map } from "react-svg-map";
import { getLocationName } from "./utils";
import W from "@svg-maps/world";
const World = W.default ? W.default : W;
import Modal from "./components/Modal";

// import S from "react-switch";
// const Switch = S.default? S.default: S
import Articles from "./components/Articles";
import "react-svg-map/lib/index.css";
import "./App.css";
import HoverDisplay from "./components/hoverDisplay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Header from "./components/Header";
import localData from "../data.json";
import { Countries } from "../countries.js";
import TInput from "react-autocomplete-input";
const TextInput = TInput.default ? TInput.default : TInput;
import "react-autocomplete-input/dist/bundle.css";

function App() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("Hover a country");
  const [clickedCountry, setClickedCountry] = useState(null);
  const myElement = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  function mouseOver(event) {
    setCountry(getLocationName(event));
  }

  const fetchApiData = (country) => {
    setLoading(true);
    try {
      fetch(
        `https://api.newscatcherapi.com/v2/search?q=${country}&lang=en,fa&search_in=title&sort_by=date&sources=ap.org,reuters.com,cnn.com,bbc.com,iranintl.com,bbc.co.uk,nytimes.com,theguardian.com,
        `,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_NEWSCATCHER_KEY,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.articles || data.articles.length < 5) {
            setTimeout(() => {
              try {
                fetch(
                  `https://api.newscatcherapi.com/v2/search?q=${country}&lang=en,fa&search_in=title&sort_by=date&not_sources=cts.businesswire.com,intelligenceonline.com
                `,
                  {
                    headers: {
                      "x-api-key": import.meta.env.VITE_NEWSCATCHER_KEY,
                    },
                  }
                )
                  .then((response) => response.json())
                  .then((dataWithoutAllSrcs) => {
                    let arr = dataWithoutAllSrcs.articles;
                    const uniqueTitles = new Set();
                    const filteredArr = arr.filter((obj) => {
                      if (!uniqueTitles.has(obj.title)) {
                        uniqueTitles.add(obj.title);
                        return true;
                      }
                      return false;
                    });
                    // filteredArr.articles.forEach((article) => {
                    //   if (article.title.length > 200) {
                    //     article.title = article.title.slice(0, 200);
                    //   }
                    // });
                    setData(filteredArr);
                    setLoading(false);
                    scrollToNews();
                  });
              } catch (error) {
                console.log(error);
              }
            }, 1200);
            return;
          }
          data.articles.forEach((article) => {
            if (article.title.length > 200) {
              article.title = article.title.slice(0, 200);
            }
          });
          if (data.articles.length > 4) setData(data.articles);
          setLoading(false);
          scrollToNews();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToNews = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  const onClick = (event) => {
    const country = getLocationName(event);
    setClickedCountry(country);
    fetchApiData(country);
    // setData(localData.articles);
  };
  const handleChange = (event) => {
    setInputValue((prev) => (prev = event));
  };
  const mobileButtonClick = (event) => {
    const country = event.trim();
    setClickedCountry(country);
    setInputValue("");
    fetchApiData(country);
    //setData(localData.articles);
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
                <div className="mobile">
                  <div className="loading">
                    {loading && <h3>LOADING...</h3>}
                  </div>
                  <p>Type the name of the country you wish to see news from</p>
                  <TextInput
                    onSelect={mobileButtonClick}
                    options={Countries}
                    trigger={""}
                    value={inputValue}
                    onChange={handleChange}
                    Component={"input"}
                    passThroughEnter={true}
                  // onChange={handleChange}
                  />
                </div>
                <div className="not-mobile">
                  <div className="loading">
                    {loading && <h3>LOADING...</h3>}
                  </div>
                  <HoverDisplay country={country} />
                  <div ref={myElement} className="map-container">
                    <SVGMap
                      map={World}
                      onLocationClick={onClick}
                      onLocationMouseOver={mouseOver}
                    />
                  </div>
                  <h2 className="clicked-country">{clickedCountry}</h2>
                  <div className="articles-container">
                    <Articles data={data} />
                  </div>
                </div>
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
