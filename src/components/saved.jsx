import React, { useEffect } from "react";
import Articles from "./Articles";
import Footer from "./Footer";

const Saved = () => {
  const items = { ...localStorage };
  let articles = [];
  for (let article in items) {
    articles.push(JSON.parse(items[article]));
  }
  return (
    <>
      {articles.length > 0 ? (
        <Articles data={articles} />
      ) : (
        <p className="warning"> You haven't saved any news article </p>
      )}
      <Footer />
    </>
  );
};

export default Saved;