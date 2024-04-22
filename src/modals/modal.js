import React, { Component } from 'react';

import '../modals/modal.css';
import modal_img from "../assets/img/modal.jpg";
import close from "../assets/img/icon-close.png";

const Modal = ({ handleClose, show, children, handleForm }) => {
    const showHideClassName = show ? "display-block" : "display-none";

    console.log(showHideClassName);
    return (
        <div className={showHideClassName}>
            <section className="modal-main">

                {/* <img src={modal_img} alt="Girl in a jacket" className="image"></img> */}

                {/* <div className="content" id="close_button">
                    <img
                        style={{ width: "30px" }}
                        src={close}
                        alt="close icon"
                        onClick={handleClose}
                    />
                </div>
                <div className="click" id="close_button">
                    <img
                        style={{ width: "81px", height: "39px" }}
                        src={close}
                        alt="close icon"
                        onClick={handleForm}
                    />
                </div> */}
                <div class="image-container">
                    <img src={modal_img} alt="Girl in a jacket" className="image"></img>
                    <div className="top-right-button" id="close_button">
                        <img
                            style={{ width: "30px" }}
                            src={close}
                            alt="close icon"
                            onClick={handleClose}
                        />
                    </div>
                    <button class="bottom-right-button" onClick={handleForm}>Click Me</button>
                </div>
            </section>
        </div>
    );
};

export default Modal
