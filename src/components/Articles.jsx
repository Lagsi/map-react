import React from "react";
import Article from "./Article";

function Articles({ data }) {
  return (
    <div className="articles">
      {data.map((article) => {
        return (
          <React.Fragment key={article.id}>
            <Article article={article} />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Articles;
