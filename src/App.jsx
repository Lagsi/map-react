import { useRef, useState } from "react";
import { SVGMap } from "react-svg-map";
import { getLocationName } from "./utils";
import World from "@svg-maps/world";
import Articles from "./components/Articles";
import "react-svg-map/lib/index.css";
import "./App.css";
import HoverDisplay from "./components/hoverDisplay";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./components/About";
import Header from "./components/Header";

// function hoverDisplay({ country }) {
//   return (
//     <div>
//       <span>{country}</span>
//     </div>
//   );
// }

function App() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("Hover a country");
  const myElement = useRef(null);

  function mouseOver(event) {
    setCountry(getLocationName(event));
  }

  const scrollToNews = () => {
    // myElement.current.scrollIntoView({ behavior: "smooth", block: "end" });
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  const onClick = (event) => {
    const country = getLocationName(event);
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
                    setData(filteredArr);
                    console.log(filteredArr);
                    scrollToNews();
                  });
              } catch (error) {
                console.log(error);
              }
            }, 1200);
            return;
          }
          if (data.articles.length > 4) setData(data.articles);
          scrollToNews();
        });
    } catch (error) {
      console.log(error);
    }
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
                <HoverDisplay country={country} />
                <div ref={myElement} className="map-container">
                  <SVGMap
                    map={World}
                    onLocationClick={onClick}
                    onLocationMouseOver={mouseOver}
                  />
                </div>
                <div className="articles-container">
                  <Articles data={data} />
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
