import React, { useEffect } from 'react'
import Articles from './Articles';

const Saved = () => {
    const items = { ...localStorage }
    let articles = []
    for (let article in items) {
        articles.push(JSON.parse(items[article]))
    }
    console.log(articles)
    return (
        <>
            {articles.length > 0 ? <Articles data={articles} /> : <p className='warning'> You haven't saved any news article </p>}
        </>
    )
}

export default Saved