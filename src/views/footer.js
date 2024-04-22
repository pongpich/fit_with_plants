import React from "react";
import "./footer.scss";

export default function footer() {
  return (
    <>
      <div className="box-footer">
        <div className="footer-center">
          <div className="row col-12 ">
            <div className="col-12 col-md-4">
              <img
                src="../../assets/img/layer_2.png"
                alt=""
                className="layer1-image"
              />
              <p className="company-bbpf">
                บริษัท บีบีพีเอฟ จำกัด (สำนักงานใหญ่)
              </p>
              <p className="company-address">
                เลขที่ 429/129 ถนนสรงประภา แขวงดอนเมือง เขตดอนเมือง
                กรุงเทพมหานคร 10210
              </p>
            </div>
            <div className="col-12 col-md-4">
              <p className="contact-us">ติดต่อเรา</p>
              <div className="hr" />
              <p className="company-address">
                <img
                  src="../../assets/img/phone-line.png"
                  alt=""
                  className="phone-line"
                />
                093-883-2339
              </p>
              <p className="company-address">
                <img
                  src="../../assets/img/mail.png"
                  alt=""
                  className="phone-line"
                />
                contact@pynk.co
              </p>
            </div>
            <div className="col-12 col-md-4">
              <p className="contact-us">Social Media</p>
              <div className="hr" />
              <div className="social-icons">
                <img
                  src="../../assets/img/fb-icon.png"
                  alt=""
                  className="fb-icon"
                />
                <img
                  src="../../assets/img/ig-icon.png"
                  alt=""
                  className="fb-icon"
                />{" "}
                <img
                  src="../../assets/img/tiktok-icon.png"
                  alt=""
                  className="fb-icon"
                />
                <img
                  src="../../assets/img/line-icon.png"
                  alt=""
                  className="fb-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box-footer-bottom">
        <p>© 2022 BBPF RIGHTS RESERVED</p>

        <div className="policy-bottom">
          <div className="hr-policy policy-none" />
          <p>Privacy Policy</p>
          <div className="hr-policy" />
          <p>Cookies Policy</p>
          <div className="hr-policy" />
          <p>Cookies Setting</p>
        </div>
      </div>
    </>
  );
}
