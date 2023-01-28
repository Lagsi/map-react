import React, { useEffect } from 'react'
import Articles from './Articles';

const Saved = () => {

    const items = { ...localStorage }
    let articles = []
    for (let article in items) {
        articles.push(JSON.parse(items[article]))
        console.log(article)
    }
    console.log(articles)
    return (
        <Articles data={articles} />
    )
}

export default Saved