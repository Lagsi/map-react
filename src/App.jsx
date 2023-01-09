import { useRef, useState } from "react";
import { SVGMap } from "react-svg-map";
import { getLocationName } from "./utils";
import World from "@svg-maps/world";
import Articles from "./components/Articles";
import "react-svg-map/lib/index.css";
import "./App.css";
import HoverDisplay from "./components/hoverDisplay";

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
      top: 500,
      behavior: "smooth",
    });
  };

  const onClick = (event) => {
    const country = getLocationName(event);
    try {
      fetch(
        `https://api.newscatcherapi.com/v2/search?q=${country}&lang=en,fa&search_in=title&sort_by=date&sources=ap.org,reuters.com,cnn.com,bbc.com,iranintl.com
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
                  `https://api.newscatcherapi.com/v2/search?q=${country}&lang=en,fa&search_in=title&sort_by=date&not_sources=cts.businesswire.com
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
                    scrollToNews();
                  });
              } catch (error) {
                console.log(error);
              }
            }, 1200);
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
  );
}

export default App;
