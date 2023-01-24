import React from 'react'
import Article from './Article'


function Articles({ data }) {
    return (
        <div className="articles">
            {data.map((article, index) => {
                return (
                    <>
                        <Article article={article} key={index} summary={article.summary}/>
                        
                    </>
                );
            })}
        </div>
    )
}

export default Articles