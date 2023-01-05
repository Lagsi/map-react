import React from 'react'

function Article({ article }) {
    return (
        <div className="card">
            <a href={article.webUrl} target={'_blank'}>
                <div className="card-image">
                    {article.fields && (

                        <img src={article.fields.thumbnail} alt="" />
                    )}
                </div>
            </a>
            <div className="category">{article.pillarName}</div>
            <div className="heading"> <a target={'_blank'} href={article.webUrl}>{article.webTitle}</a>
                <div className="author">
                    {article.tags.length > 0 && (
                        <span>
                            <a href={article.tags[0].webUrl}>
                                {article.tags[0].webTitle}
                            </a>
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Article