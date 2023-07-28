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
            <button onClick={toggleModal} className="css-button-sliding-to-top--green" >
                Open
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>{title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: summary }}></div>

                        <span className="close-modal" onClick={toggleModal}>&#10006;</span>

                        {/* <span>
                            <a target={"_blank"} href={link}> <button className="css-button-arrow--black"> Read More </button>  </a>
                        </span> */}

                    </div>

                </div>
            )}
        </>
    );
}