import React, { Component } from "react";
import {
  CardTitle,
  Form,
  Label,
  Input,
  Button
} from "reactstrap";

import { connect } from "react-redux";

import { register, checkUser, loginUser } from "../redux/auth";
import "./register.scss";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "undefined",
      lastname: "undefined",
      phone: "",
      confirmPassword: "",
      statusRegister_email: "default",
      statusRegister_password: "default",
      statusRegister_phone: "default"
    };

    this.onUserRegister = this.onUserRegister.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { email, password } = this.state;
    const { status, statusRegister } = this.props;
    if (prevProps.statusRegister !== statusRegister && statusRegister === "success") {
      this.props.loginUser(email, password);
    }
    if (prevProps.status !== status && status === "success") {
      this.props.history.push('/platform');
    }
  }

  onUserRegister(event) {
    const { email, password, firstname, lastname, phone, confirmPassword } = this.state;
    const { statusRegister } = this.props;
    this.setState({
      statusRegister_email: "default",
      statusRegister_password: "default",
      statusRegister_phone: "default"
    })
    if (email !== "" && password !== "" && phone !== "") {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        if (statusRegister === "new") {
          if (password.length >= 8) {
            if (password === confirmPassword) {
              this.props.register(email, password, firstname, lastname, phone);
            } else {
              this.setState({
                statusRegister_password: "passwordNotMatch"
              })
            }
          } else {
            this.setState({
              statusRegister_password: "password8plus"
            })
          }
        } else {
          this.setState({
            statusRegister_email: "emailExist"
          })
        }
      } else {
        this.setState({
          statusRegister_email: "emailFormat"
        })
      }
    } else {
      if (email === "") {
        this.setState({
          statusRegister_email: "emailFormat"
        })
      }
      if (password === "") {
        this.setState({
          statusRegister_password: "password8plus"
        })
      }
      if (phone === "") {
        this.setState({
          statusRegister_phone: "phoneNotNull"
        })
      }
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
      console.log(value);
    }
  }

  renderRegister() {
    const { statusRegister_email, statusRegister_password, statusRegister_phone } = this.state;
    return (
      <div className="auth-card">
        <div className="position-relative image-side-register col-lg-6 col-12">
          <img className="mb-4 mt-3 col-12" src="/assets/img/loginprofile.jpg" alt="" />
          <div className="description">
            <h3 className="mb-3"><center>BEBE FIT ROUTINE</center></h3>
            <h6><center>คอร์สออกกำลังกายสนุกๆ ที่สามารถฝึกได้</center></h6>
            <h6><center>จากที่บ้าน ไม่ต้องมีอุปกรณ์ก็เสียเหงื่อได้</center></h6>
          </div>
        </div>
        <div className="form-side-register col-lg-6 col-12">
          <CardTitle className="h3 mb-4 mt-5">
            {"สมัครสมาชิก"}
          </CardTitle>
          <Form>
            {/*             <Label className="form-group1 has-float-label mb-2 mr-4">
                  {"ชื่อ"}
                  <Input
                    name="firstname"
                    id="firstname"
                    value={this.state.firstname}
                    onChange={(event) => this.handleChange(event)}
                    validate={{
                      required: { value: true, errorMessage: 'อย่าลืมกรอกชื่อ' }
                    }}
                  />
                </Label>
                <Label className="form-group1 has-float-label mb-2">
                  {"นามสกุล"}
                  <Input
                    name="lastname"
                    id="lastname"
                    value={this.state.lastname}
                    onChange={(event) => this.handleChange(event)}
                    validate={{
                      required: { value: true, errorMessage: 'อย่าลืมกรอกนามสกุล' }
                    }}
                  />
                </Label> */}
            <Label className="form-group2 has-float-label mb-2">
              {"Email Address"}
              <Input
                type="email"
                id="email"
                value={this.state.email} onChange={(event) => this.checkExistedEmail(event)}
              />
            </Label>
            {
              (statusRegister_email === "emailFormat") &&
              <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>กรุณากรอกรูปแบบอีเมลให้ถูกต้อง เช่น aa@example.com</h6></small>
            }
            {
              (statusRegister_email === "emailExist") &&
              <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>อีเมลนี้ถูกใช้ในการสมัครแล้ว กรุณาเข้าสู่ระบบ</h6></small>
            }
            <Label className="form-group2 has-float-label mb-2">
              {"Password"}
              <Input
                type="password"
                id="password"
                value={this.state.password} onChange={(event) => this.handleChange(event)}
              />
            </Label>
            {
              (statusRegister_password === "password8plus") &&
              <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>รหัสผ่านต้องมากกว่า 8 ตัวขึ้นไป</h6></small>
            }
            <Label className="form-group2 has-float-label mb-3">
              {"Confirm password"}
              <Input
                type="password"
                id="confirmPassword"
                value={this.state.confirmPassword} onChange={(event) => this.handleChange(event)}
              />
            </Label>
            {
              (statusRegister_password === "passwordNotMatch") &&
              <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>รหัสผ่านไม่ตรงกัน</h6></small>
            }
            <Label className="form-group1 has-float-label mb-2">
              {"เบอร์ติดต่อ"}
              <Input
                name="phone"
                id="phone"
                value={this.state.phone}
                onChange={(event) => this.handleChange(event)}
              />
            </Label>
            {
              (statusRegister_phone === "phoneNotNull") &&
              <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>กรุณากรอกเบอร์ติดต่อ</h6></small>
            }

            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button
                color="danger"
                className="btn-shadow mt-3"
                size="lg"
                onClick={() => this.onUserRegister()}
                block
              >
                <span className="text-one">
                  {"สมัครสมาชิก"}
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
      <div className="all-row-register">
        <div className="mx-auto my-auto">
          {this.renderRegister()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, statusRegister, status } = authUser;
  return { user, statusRegister, status };
};

const mapActionsToProps = {
  register,
  checkUser,
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Register);
