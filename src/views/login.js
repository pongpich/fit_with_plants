import React, { Component } from "react";
import { CardTitle, Form, Label, Input, Button } from "reactstrap";
import { connect } from "react-redux";

import { loginUser } from "../redux/auth";
import "./login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      statusLogin: "default",
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (user !== null) {
      this.props.history.push("/videolist");
    }
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props;
    if (prevProps.status !== status) {
      if (status === "success") {
        if (this.props.user.authorization === "admin") {
          this.props.history.push("/import-members");
        } else {
          this.props.history.push("/VideoList");
        }
      }
      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) &&
        status === "fail"
      ) {
        this.setState({
          statusLogin: "fail",
        });
      }
    }
  }

  onUserLogin(e) {
    e.preventDefault();
    if (!!this.props.user == false && this.props.status === "fail") {
      this.setState({
        statusLogin: "fail",
      });
    }
    if (this.state.email !== "") {
      this.props.loginUser(this.state.email, this.state.password);
      if (
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
      ) {
        this.setState({
          statusLogin: "fail",
        });
      }
    } else if (this.state.email === "") {
      this.setState({
        statusLogin: "fail",
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  render() {
    const { statusLogin } = this.state;
    return (
      <div className="all-row-login">
        <div className="row container">
          <div
            className="auth-card shadow col-lg-10 offset-lg-1 col-md-12 col-12"
            style={{ borderRadius: "16px" }}
          >
            <div className="position-relative image-side-login col-lg-6 col-12">
              <p className="welcome-program mt-3">ยินดีต้อนรับเข้าสู่โปรแกรม</p>
              <img
                className="mb-4 col-12"
                src="/assets/img/group37592.png"
                alt=""
              />
              {/*  <div className="description">
                <h3 className="mb-3" style={{ color: "#F45197" }}>
                  <center>
                    <b>BEBE FIT ROUTINE </b>
                  </center>
                </h3>
                <h6>
                  <center>คอร์สออกกำลังกายสนุกๆ ที่สามารถฝึกได้</center>
                </h6>
                <h6>
                  <center>จากที่บ้าน ไม่ต้องมีอุปกรณ์ก็เสียเหงื่อได้</center>
                </h6>
              </div> */}
            </div>

            <div className="form-side-login col-lg-6 col-12">
              <CardTitle className="h3 mb-4 mt-5" style={{ color: "#F45197" }}>
                {"เข้าสู่ระบบ"}
              </CardTitle>
              <Form onSubmit={(e) => this.onUserLogin(e)}>
                <Label className="form-group2 has-float-label mb-4">
                  {"Email"}
                  <Input
                    type="email"
                    id="email"
                    value={this.state.email}
                    onChange={(event) => this.handleChange(event)}
                  />
                </Label>
                {statusLogin === "fail" &&
                  !(this.props.status === "success") && (
                    <small id="emailHelp" className="form-text text-muted mb-3">
                      <h6 style={{ color: "red" }}>อีเมลไม่ถูกต้อง</h6>
                    </small>
                  )}

                <div className="d-flex justify-content-between align-items-center mb-3 btn-login">
                  <Button
                    style={{
                      backgroundColor: "#F45197",
                      borderColor: "#F45197",
                      borderRadius: "20px",
                    }}
                    className="btn-shadow"
                    size="lg"
                    // onClick={() => this.onUserLogin()}
                    type="submit"
                    block
                  >
                    <span className="h6 text-one">{"LOGIN"}</span>
                  </Button>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Button
                    className="btn-link"
                    color="empty"
                    href="https://content.bebefitroutine.com/onlinecourse/"
                    target="_blank"
                    block
                  >
                    <span
                      className="text-one underline-on-hover"
                      style={{ cursor: "pointer", color: "#F45197" }}
                    >
                      {"ซื้อคอร์สออนไลน์"}
                    </span>
                  </Button>
                </div>
                {/* <div className="d-flex justify-content-between align-items-center mb-3">
                  <Button
                    color="light"
                    className="btn-shadow"
                    size="lg"
                    onClick={() => this.props.history.push('/register')}
                    block
                  >
                    {"สมัครสมาชิก"}
                  </Button>
                </div> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, status } = authUser;
  return { user, status };
};

const mapActionsToProps = { loginUser };

export default connect(mapStateToProps, mapActionsToProps)(Login);
