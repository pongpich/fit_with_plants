import React, { Component } from "react";
import {
  CardTitle,
  Form,
  Label,
  Input,
  Button
} from "reactstrap";

import { connect } from "react-redux";

import { register, checkUser, loginUser, forgotPassword, resetPassword, setPassword } from "../redux/auth";
import "./forgotPassword.scss";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      comfirmPassword: "",
      status_email: "default",
      statusSetPassword: "default"
    };

  }

  componentDidMount() {
    const { user } = this.props;
    const href = window.location.href;
    const params = href.split('?')[1]; //Ex. email=akkewach@planforfit.com&user_id=e58928b1-2045-4265-8cdd-70de7208a73c&expire_time=1613474821289

    // Be sure url params exist
    if (params && params !== '') {
      const result = params.split('&').reduce(function (res, item) {
        const parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
      }, {});
      const email = result.email;
      const user_id = result.user_id;
      const expire_time = result.expire_time;
      const curr = new Date().getTime();

      if (expire_time > curr) {
        this.setState({
          email: email
        });
        this.props.resetPassword(
          email,
          user_id,
          expire_time
        );
      } else {
        this.setState({
          status_email: "timeout"
        });
      }
    }

    if (user !== null && user.password !== null) {
      this.props.history.push('/platform');
    }
  }

  componentDidUpdate(prevProps) {

  }

  onSubmitEmail() {
    const { email } = this.state;
    const { statusRegister } = this.props;
    this.setState({
      status_email: "default"
    })
    if (email !== "") {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        if (statusRegister === "exist") {
          this.props.forgotPassword(email);
          this.setState({
            status_email: "success"
          });
        } else {
          this.setState({
            status_email: "emailNotExist"
          });
        }
      } else {
        this.setState({
          status_email: "emailFormat"
        });
      }
    } else if (this.state.email === "") {
      this.setState({
        status_email: "emailFormat"
      });
    }
  }

  onSetPassword(event) {
    const { email, password, comfirmPassword } = this.state;
    this.setState({
      statusSetPassword: "default"
    })
    if ((password === comfirmPassword) && ((password.length >= 8) || (comfirmPassword.length >= 8))) {
      this.props.setPassword(email, password);
      this.setState({
        statusSetPassword: "success"
      })
    } else if (((password.length < 8) || (comfirmPassword.length < 8)) && (password === comfirmPassword)) {
      this.setState({
        statusSetPassword: "password8Plus"
      })
    } else if ((password !== comfirmPassword)) {
      this.setState({
        statusSetPassword: "passwordNotMatch"
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  async checkExistedEmail(event) {
    const { value } = event.target;
    this.setState({
      [event.target.id]: event.target.value
    })
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      this.props.checkUser(value);
    }
  }

  renderForgotPassword() {
    const { status_email, statusSetPassword } = this.state;
    return (
      <div className="auth-card">
        <div className="position-relative image-side-forgotPassword col-lg-6 col-12">
          <img className="mb-4 mt-3 col-12" src="/assets/img/loginprofile.jpg" alt="" />
          <div className="description">
            <h3 className="mb-3"><center>BEBE FIT ROUTINE</center></h3>
            <h6><center>คอร์สออกกำลังกายสนุกๆ ที่สามารถฝึกได้</center></h6>
            <h6><center>จากที่บ้าน ไม่ต้องมีอุปกรณ์ก็เสียเหงื่อได้</center></h6>
          </div>
        </div>
        <div className="form-side-forgotPassword col-lg-6 col-12">
          <CardTitle className="h3 mb-4 mt-5">
            {"ลืมรหัสผ่าน"}
          </CardTitle>
          <Form>
            {
              (status_email === "timeout") &&
              <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>คำขอเปลี่ยนรหัสผ่านของคุณหมดอายุ กรุณากรอกข้อมูลเพื่อยื่นคำขออีกครั้ง</h6></small>
            }
            {
              (status_email === "success") ?
                <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>เราได้ส่งคำร้องลืมรหัสผ่านไปยังอีเมลของคุณ "{this.state.email}"</h6></small>
                :
                (statusSetPassword === "success") ?
                  <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>การเปลี่ยนแปลงรหัสผ่านใหม่เสร็จสิ้น</h6></small>
                  :
                  <Label className="form-group2 has-float-label mb-2">
                    {"Email Address"}
                    <Input
                      type="email"
                      id="email"
                      value={this.state.email}
                      onChange={(event) => this.checkExistedEmail(event)}
                    />
                  </Label>
            }
            {
              (status_email === "emailFormat") &&
              <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>กรุณากรอกรูปแบบอีเมลให้ถูกต้อง เช่น aa@example.com</h6></small>
            }
            {
              (status_email === "emailNotExist") &&
              <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>อีเมลนี้ไม่มีอยู่ในระบบ</h6></small>
            }
            {
              (statusSetPassword !== "success") &&
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Button
                  color="danger"
                  className="btn-shadow mt-3"
                  size="lg"
                  onClick={() => this.onSubmitEmail()}
                  block
                >
                  <span className="text-one">
                    {(status_email === "success") ? "ส่งอีกครั้ง" : "ยืนยัน"}
                  </span>
                </Button>
              </div>
            }
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button
                className="btn-link"
                color="empty"
                onClick={() => this.props.history.push('/login')}
                block
              >
                <span className="text-one">
                  {"เข้าสู่ระบบ"}
                </span>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }

  renderSetPassword() {
    const { statusSetPassword } = this.state;
    return (
      <div className="auth-card">
        <div className="position-relative image-side-forgotPassword col-lg-6 col-12">
          <img className="mb-4 mt-3 col-12" src="/assets/img/loginprofile.jpg" alt="" />
          <div className="description">
            <h3 className="mb-3"><center>BEBE FIT ROUTINE</center></h3>
            <h6><center>คอร์สออกกำลังกายสนุกๆ ที่สามารถฝึกได้</center></h6>
            <h6><center>จากที่บ้าน ไม่ต้องมีอุปกรณ์ก็เสียเหงื่อได้</center></h6>
          </div>
        </div>
        <div className="form-side-forgotPassword col-lg-6 col-12">
          <CardTitle className="h3 mb-4 mt-5">
            {"ตั้งรหัสผ่าน"}
          </CardTitle>
          <Form>
            <Label className="form-group2 has-float-label mb-2">
              {"Password"}
              <Input
                type="password"
                id="password"
                value={this.state.password} onChange={(event) => this.handleChange(event)}
              />
            </Label>
            <Label className="form-group2 has-float-label mb-1">
              {"ยืนยัน Password"}
              <Input
                type="password"
                name="comfirmPassword" required
                id="comfirmPassword"
                value={this.state.comfirmPassword} onChange={(event) => this.handleChange(event)}
              />
            </Label>
            {(statusSetPassword === "passwordNotMatch") && <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>รหัสผ่านไม่ตรงกัน</h6></small>}
            {(statusSetPassword === "password8Plus") && <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>รหัสผ่านต้องมากกว่า 8 ตัวขึ้นไป</h6></small>}
            <div className="d-flex justify-content-between align-items-center mb-3 btn-login">
              <Button
                color="danger"
                className="btn-shadow"
                size="lg"
                onClick={() => this.onSetPassword()}
                block
              >
                <span className="h6 text-one">
                  {"ตั้งรหัสผ่าน"}
                </span>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="all-row-forgotPassword">
        <div className="mx-auto my-auto">
          {
            (this.props.statusResetPassword === "success") ?
              this.renderSetPassword()
              :
              this.renderForgotPassword()
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, statusRegister, status, statusResetPassword } = authUser;
  return { user, statusRegister, status, statusResetPassword };
};

const mapActionsToProps = {
  register,
  checkUser,
  loginUser,
  forgotPassword,
  resetPassword,
  setPassword
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ForgotPassword);
