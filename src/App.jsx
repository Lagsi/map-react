import { useRef, useState } from "react";
import { SVGMap, Map, RadioSVGMap } from "react-svg-map";
import { getLocationName, getLocationSelected } from "./utils";
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
import Saved from "./components/saved";
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
  const [underFive, setUnderFive] = useState(false);

  function mouseOver(event) {
    setInputValue(getLocationName(event));
  }

  const fetchApiData = async (country) => {
    setUnderFive(false);
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.newscatcherapi.com/v2/search?q=${country}&lang=en,fa&search_in=title&sort_by=date&to_rank=1000&not_sources=cts.businesswire.com,intelligenceonline.com,coinupdate.com,reddit.com
      `,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_NEWSCATCHER_KEY,
          },
        }
      );
      const articles = await response.json();
      let filteredArticles = [];
      let rank = 100;
      if (articles.articles) {
        while (filteredArticles.length < 5 && rank < 1000) {
          filteredArticles = articles.articles.filter((article) => {
            return article.rank <= rank;
          });
          rank += 100;
        }
      }

      // Filtering articles with same title
      const uniqueTitles = new Set();
      filteredArticles = filteredArticles.filter((obj) => {
        if (!uniqueTitles.has(obj.title)) {
          uniqueTitles.add(obj.title);
          return true;
        }
        return false;
      });

      if (!articles.articles || filteredArticles.length < 5) {
        setLoading(false);
        setUnderFive(true);
        setData([]);
        return;
      }

      setData(filteredArticles);
      setLoading(false);
      scrollToNews();
    } catch (error) {
      console.log(error);
    }

    //   try {
    //     fetch(
    //       `https://api.newscatcherapi.com/v2/search?q=${country}&lang=en,fa&search_in=title&sort_by=date&sort_by=rank&sources=ap.org,reuters.com,cnn.com,bbc.com,iranintl.com,bbc.co.uk,nytimes.com,theguardian.com,
    //       `,
    //       {
    //         headers: {
    //           "x-api-key": import.meta.env.VITE_NEWSCATCHER_KEY,
    //         },
    //       }
    //     )
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log(data.articles);
    //         if (!data.articles || data.articles.length < 5) {
    //           setTimeout(() => {
    //             try {
    //               fetch(
    //                 `https://api.newscatcherapi.com/v2/search?q=${country}&lang=en,fa&search_in=title&sort_by=date&to_rank=2000&not_sources=cts.businesswire.com,intelligenceonline.com,coinupdate.com,
    //               `,
    //                 {
    //                   headers: {
    //                     "x-api-key": import.meta.env.VITE_NEWSCATCHER_KEY,
    //                   },
    //                 }
    //               )
    //                 .then((response) => response.json())
    //                 .then((dataWithoutAllSrcs) => {
    //                   let arr = dataWithoutAllSrcs.articles;
    //                   const uniqueTitles = new Set();
    //                   const filteredArr = arr.filter((obj) => {
    //                     if (!uniqueTitles.has(obj.title)) {
    //                       uniqueTitles.add(obj.title);
    //                       return true;
    //                     }
    //                     return false;
    //                   });
    //                   // filteredArr.articles.forEach((article) => {
    //                   //   if (article.title.length > 200) {
    //                   //     article.title = article.title.slice(0, 200);
    //                   //   }
    //                   // });
    //                   setData(filteredArr);
    //                   setLoading(false);
    //                   scrollToNews();
    //                   console.log(filteredArr);
    //                 });
    //             } catch (error) {
    //               console.log(error);
    //             }
    //           }, 1200);
    //           return;
    //         }
    //         data.articles.forEach((article) => {
    //           if (article.title.length > 200) {
    //             article.title = article.title.slice(0, 200);
    //           }
    //         });
    //         if (data.articles.length > 4) setData(data.articles);
    //         setLoading(false);
    //         scrollToNews();
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
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
    // console.log(getLocationSelected(event));
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
                  {underFive && (
                    <div className="loading">
                      <h3>Beware: very few articles from {clickedCountry}</h3>
                    </div>
                  )}
                  {loading && (
                    <div className="loading">
                      <h3>LOADING...</h3>
                    </div>
                  )}

                  {/* <HoverDisplay country={country} /> */}
                  <div ref={myElement} className="map-container">
                    <SVGMap
                      map={World}
                      onLocationMouseOut={mouseOut}
                      onLocationClick={onClick}
                      onLocationMouseOver={mouseOver}
                    // isLocationSelected={(location, index) => {
                    //   console.log(index);
                    // }}
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
          <Route path="/saved" element={<Saved />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
