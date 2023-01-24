import React, { useState } from "react";

export default function Modal({ summary, link, title }) {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <button onClick={toggleModal} className="btn-modal">
                Open
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>{title}</h2>
                        <p>
                            {summary}
                        </p>
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                        <span>
                            <a target={"_blank"} href={link}> Read More </a>
                        </span>
                    </div>

                </div>
            )}
        </>
    );
}