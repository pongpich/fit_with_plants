import React, { Component }  from 'react';
import './modal.css';


const Success_Modal = ({ handleClose, success_modal_show, children, handleForm }) => {
    const showHideClassName = success_modal_show ? "display-block" : "display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main3">
                {children}
                <b>ขอบคุณสำหรับข้อมูล เราจะติดต่อกลับไปในเร็วๆนี้</b>
                {/* <button style={{ backgroundSize: "cover", width: "40px", height: "40px" }} type="button" onClick={handleClose}>
                    Close
                </button> */}
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
                        style={{ width: "81px", height:"39px" }}
                        src={close}
                        alt="close icon"
                        onClick={handleForm}
                    />
                </div> */}
                <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                    <button onClick={handleClose} className='btn btn-primary'>ปิด</button>
                </div>
            </section>
        </div>
    );
};

export default Success_Modal
