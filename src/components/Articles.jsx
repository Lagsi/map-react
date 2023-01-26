import React from 'react'
import Article from './Article'


function Articles({ data }) {
    return (
        <div className="articles">
            {data.map((article) => {
                return (
                    <React.Fragment key={article._id}>
                        < Article article={article} summary={article.summary} />
                    </React.Fragment>
                );
            })}
        </div >
    )
}

export default Articles