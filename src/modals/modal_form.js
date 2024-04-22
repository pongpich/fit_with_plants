import React, { Component } from 'react';

import './modal.css';
import modal_img from "../assets/img/modal.jpg";
import close from "../assets/img/icon-close.png";
import { useState, useEffect } from 'react'
import axios from 'axios'

const Modal_Form = ({ handleClose, modal_show, children, handleSuccess }) => {
    const showHideClassName = modal_show ? "display-block" : "display-none";
    const [Company_Name, setCompanyName] = useState('');
    const [Employee_Qty, setEmployeeQty] = useState('');
    const [Contact_Name, setContactName] = useState('');
    const [Contact_Position, setContactPosition] = useState('');
    const [Phone_Number, setPhoneNumber] = useState('');
    const [Email, setEmail] = useState('');

    // retrived data state
    const [data, setData] = useState([]);

    // submit event
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name, age, designation, salary);

        // our object to pass
        const data = {
            Company_Name, Employee_Qty, Contact_Name, Contact_Position, Phone_Number, Email
        }
        console.log(data);
        axios.post('https://sheet.best/api/sheets/03babb10-1054-4b02-8a3d-a9b6dbe5e941', data).then(response => {
            // console.log(response);
            setCompanyName('');
            setEmployeeQty('');
            setContactName('');
            setContactPosition('');
            setPhoneNumber('');
            setEmail('');

        })
            .then((response) => {
                console.log('สำเร็จการส่งข้อมูลไป googlesheet');
                handleSuccess();
            }, (error) => {
                console.log(error);
            });
    }
    return (
        <div className={showHideClassName}>
            <section className="modal-main2">
                {children}
                <p><b>เพีงแค่กรอกข้อมูล เราจะติดต่อไปยังฝ่ายที่เกี่ยวข้อง เพื่อนำเสนอสวัสดิการให้แก่บริษัทของคุณ</b></p>
                <p><b>และรับโบนัสพิเศษ ถ้าเราได้ร่วมเป็นส่วนหนึ่งในสวัสดิการของคุณ</b></p>
                <form autoComplete="off" className='form-group'
                    onSubmit={handleSubmit}>
                    <label>ชื่อบริษัท</label>
                    <input type='text' className='form-control' required
                        onChange={(e) => setCompanyName(e.target.value)}
                        value={Company_Name}
                    />
                    <br></br>
                    <label>จำนวนพนักงาน (ประมาณ)</label>
                    <input type='text' className='form-control'
                        onChange={(e) => setEmployeeQty(e.target.value)}
                        value={Employee_Qty}
                    />
                    <br></br>

                    <label>ชื่อบุคคลที่ควรติดต่อ</label>
                    <input type='text' className='form-control' required
                        onChange={(e) => setContactName(e.target.value)}
                        value={Contact_Name}
                    />
                    <br></br>
                    <label>ตำแหน่ง (ถ้าทราบ)</label>
                    <input type='text' className='form-control'
                        onChange={(e) => setContactPosition(e.target.value)}
                        value={Contact_Position}
                    />
                    <br></br>
                    <label>เบอร์โทร</label>
                    <input type='text' className='form-control' required
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={Phone_Number}
                    />
                    <br></br>
                    <label>Email</label>
                    <input type='text' className='form-control' required
                        onChange={(e) => setEmail(e.target.value)}
                        value={Email}
                    />
                    <br></br>
                    <p><b>สอบถามข้อมูลเพิ่มเกี่ยวกับรายละเอียดและสิทธิประโยชน์ โทร. 0938832339</b></p>
                    <a href="https://lin.ee/7RdqH3v" target="_blank"
                        rel="noopener noreferrer">
                        หรือคลิกเพื่อ Add Line
                    </a>

                    <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                </form>
                <div className="content" id="close_button">
                    <img
                        style={{ width: "20px" }}
                        src={close}
                        alt="close icon"
                        onClick={handleClose}
                    />
                </div>
            </section>
        </div >
    );
};

export default Modal_Form
