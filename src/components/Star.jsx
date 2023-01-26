import { useState, useEffect } from "react"

const Star = ({ article }) => {
    console.log(article)
    const [save, setSave] = useState(false)

    const handleStar = () => {
        setSave(!save)

    }

    useEffect(() => {
        if (save) {
            localStorage.setItem(article._id, JSON.stringify(article))
        } else {
            localStorage.removeItem(article._id)
        }
        console.log(JSON.parse(localStorage.getItem("article")))
    }, [save])

    return (
        <svg onClick={handleStar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" height="20" width="20"><path d="M11,13.5l-4-4-4,4V1.5a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z" fill={save ? 'gold' : 'none'} stroke="#ffffff" strokeLinecap="round" stroke-linejoin="round"></path></svg>
    )
}

export default Star