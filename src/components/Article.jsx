import React from "react";
import Modal from "./Modal";
import Star from "./Star";

function Article({ article }) {
  let authorUrl = "unknown author";
  if (article.fields.bylineHtml) {
    if (article.fields.bylineHtml.startsWith("<")) {
      authorUrl = `<a href="https://theguardian.com/${
        authorUrl.split('"')[1]
      }"> ${article.fields.byline} <a/>`;
    } else if (article.fields.bylineHtml.length > 0) {
      authorUrl = article.fields.byline;
    }
  }
  const date = new Date(article.webPublicationDate).toDateString();
  return (
    <div key={article.add} className="card">
      <a href={article.webUrl} target={"_blank"}>
        <div className="card-image">
          {
            <img
              src={
                article.fields.thumbnail
                  ? article.fields.thumbnail
                  : "/news-default-image.png"
              }
              alt=""
            />
          }
        </div>
      </a>
      <div className="category">
        <Star article={article} />
        <span className="date">{date}</span>
      </div>
      <div className="heading">
        {" "}
        <a target={"_blank"} href={article.webUrl}>
          {article.webTitle}
        </a>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: authorUrl }}
        className="author"
      ></div>
      <Modal
        link={article.webUrl}
        title={article.webTitle}
        summary={article.fields.body}
      />
    </div>
  );
}

export default Article;
