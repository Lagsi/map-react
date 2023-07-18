import React from "react";
import Modal from "./Modal";
import Star from "./Star";

function Article({ article }) {
  console.log(article.fields.bylineHtml);
  let authorUrl = article.fields.bylineHtml;
  if (authorUrl.startsWith("<")) {
    authorUrl = `<a href="https://theguardian.com/${
      authorUrl.split('"')[1]
    }"> ${article.fields.byline} <a/>`;
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
