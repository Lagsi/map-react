import { useState, useEffect } from "react"

const Star = ({ article }) => {
    const [save, setSave] = useState(false);

    useEffect(() => {
        const savedArticle = localStorage.getItem(article._id);
        if (savedArticle) {
            setSave(true);
        }
    }, []);

    useEffect(() => {
        if (save) {
            localStorage.setItem(article._id, JSON.stringify(article));
        } else {
            localStorage.removeItem(article._id);
        }
    }, [save]);

    const handleStar = () => {
        setSave(!save);
    };

    return (
        <svg
            onClick={handleStar}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            height="20"
            width="20"
        >
            <path
                d="M11,13.5l-4-4-4,4V1.5a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z"
                fill={save ? "red" : "none"}
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Star;
