import React from "react";
import Modal from "./Modal";
import Star from "./Star";

function Article({ article }) {
  const date = new Date(article.webPublicationDate).toDateString();
  console.log("🚀 ~ file: Article.jsx:6 ~ Article ~ article:", article)
  return (
    <div className="card">
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
      <div dangerouslySetInnerHTML={{ __html: article.fields.bylineHtml }} className="author">

      </div>
      <Modal
        link={article.webUrl}
        title={article.webTitle}
        summary={article.fields.body}
      />
    </div>
  );
}

export default Article;
