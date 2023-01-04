import { useState, useRef, useEffect, forwardRef } from "react";
import "./App.css";
import World from "@svg-maps/world";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import { getLocationId, getLocationName } from "./utils";

function App() {
  const [data, setData] = useState([]);
  const [link, setLink] = useState();
  let header;

  function onClick(event) {
    const country = getLocationName(event);

    try {
      fetch(
        `https://content.guardianapis.com/search?show-tags=contributor&show-references=author&order-by=newest&q=${country}&show-fields=thumbnail&api-key=${
          import.meta.env.VITE_GUARDIAN_API
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
      <div className="articles">
        {data.map((article, index) => {
          return (
            <div key={index} className="card">
              <div className="card-image">
                <img src={article.fields.thumbnail} alt="" />
              </div>
              <div className="category">{article.pillarName}</div>
              <div className="heading">
                {article.webTitle}
                <div className="author">
                  {article.tags.length > 0 && (
                    <span>
                      <a href={article.tags[0].webUrl}>
                        {article.tags[0].webTitle}
                      </a>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
