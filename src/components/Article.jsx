import React from "react";

function Article({ article }) {
  const date = new Date(article.published_date).toDateString();

  return (
    <div className="card">
      <a href={article.link} target={"_blank"}>
        <div className="card-image">
          {article.media && <img src={article.media} alt="" />}
        </div>
      </a>
      <div className="category">{article.topic}</div>
      <div className="heading">
        {" "}
        <a target={"_blank"} href={article.link}>
          {article.title}
        </a>
      </div>
        <div className="author">
          {article.author && (
            <span>
              <a href={`https://www.google.com/search?q=${article.author}`}>
                {article.author}
              </a>
            </span>
          )}
          {article.authors && !article.author && (
            <span>
              <a href={`https://www.google.com/search?q=${article.authors}`}>
                {article.authors}
              </a>
            </span>
          )}
          {!article.authors && !article.author && (
            <span>
              <a target={"_blank"} href={"https://" + article.clean_url}>
                {article.clean_url}
              </a>
            </span>
          )}

          <span>{date}</span>
        </div>
    </div>
  );
}

export default Article;
