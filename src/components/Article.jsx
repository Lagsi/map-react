import React from "react";
import Modal from "./Modal";
import Star from "./Star";

function Article({ article }) {
  const date = new Date(article.publishedAt).toDateString();

  return (
    <div className="card">
      <a href={article.url} target={"_blank"}>
        <div className="card-image">
          {
            <img
              src={
                article.urlToImage
                  ? article.urlToImage
                  : "/news-default-image.png"
              }
              alt=""
            />
          }
        </div>
      </a>
      <div className="category">
        <Star article={article} />
      </div>
      <div className="heading">
        {" "}
        <a target={"_blank"} href={article.url}>
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
      <Modal
        link={article.url}
        title={article.title}
        summary={
          article.content.split("[")[0].startsWith("We use")
            ? article.description
            : article.content.split("[")[0]
        }
      />
    </div>
  );
}

export default Article;
