import React, { Component } from "react";
import { connect } from "react-redux";
import "./package.scss";
import { trialPackage, logoutUser } from "../redux/auth";
import { clearVideoList } from "../redux/exerciseVideos";
import { getTreepayHash, clearPayment, createOrder } from "../redux/payment";
import moment from 'moment';
import { s3Upload } from "../helpers/awsLib";


class Package extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusTrial: "default",
      pay_type: "",
      order_no: "",
      manualPayment: "",
      statusMaualPayment: "default",
      selectedFile: null,
      urlPaySlip: null
    }
  }

  componentDidMount() {
    const { user, program } = this.props;
    this.props.clearPayment();
    if (user === null || program === null) {
      this.props.history.push('/platform');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { user, hash_data } = this.props;
    const { selectedFile, urlPaySlip } = this.state;
    if (prevProps.user !== user && user === null) {
      this.props.history.push('/login');
    }
    if (prevProps.hash_data !== hash_data && hash_data !== null) {
      var hash_input = document.createElement("input");
      hash_input.setAttribute("type", "hidden");
      hash_input.setAttribute("name", "hash_data");
      hash_input.setAttribute("id", "hash_data");
      hash_input.setAttribute("value", hash_data);
      if (!document.getElementById("hash_data")) {
        document.getElementById("treepay_form").appendChild(hash_input);
      } else if (document.getElementById("hash_data")) {
        document.getElementById("treepay_form").removeChild(document.getElementById("hash_data"));
        document.getElementById("treepay_form").appendChild(hash_input);
      }
    }
    if (prevState.selectedFile !== selectedFile) {
      this.setState({
        selectedFile: selectedFile,
        urlPaySlip: urlPaySlip
      });
    }
  }

  onSelectedManualPayment(pay_type) {
    this.setState({
      pay_type: pay_type
    })
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: null,
      urlPaySlip: null
    });
    const file = event.target.files[0];
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    var time = today.getTime();
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    var addPrefix = year + "-" + month + "-" + date + "-" + time;
    const customPrefixName = `images/pay_slip/${this.props.user.email}/${addPrefix}`;
    const urlPaySlip = `https://bebe-platform.s3-ap-southeast-1.amazonaws.com/public/${customPrefixName}`;
    this.onUploadImg(file, customPrefixName, urlPaySlip);
  }

  async onUploadImg(file, customPrefixName, urlPaySlip) {
    await s3Upload(file, customPrefixName);
    this.setState({
      selectedFile: file,
      urlPaySlip: urlPaySlip
    });
  }

  showPaySlipImg() {
    if (document.getElementById("pay-slip-Img").style.display === "none") {
      document.getElementById("pay-slip-Img").style.display = "block";
    } else {
      document.getElementById("pay-slip-Img").style.display = "none";
    }
  }

  submitOrder() {
    const { order_no, pay_type } = this.state
    const { user, program } = this.props;
    this.props.createOrder(order_no, user.user_id, program.program_id, program.price, pay_type);
  }

  submitPaySlip() {
    const { selectedFile, pay_type, urlPaySlip } = this.state
    const { user, program } = this.props;
    if (selectedFile) {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var date = today.getDate();
      var time = today.getTime();

      if (parseInt(month) < 10) {
        month = "0" + month;
      }

      const order_no = program.program_id + "-" + year + "" + month + "" + date + "" + time;
      this.props.createOrder(order_no, user.user_id, program.program_id, program.price, pay_type, urlPaySlip);
      this.setState({ statusMaualPayment: "success" });
    } else {
      this.setState({ statusMaualPayment: "fail" });
    }
  }

  onSelectedPayTypeTreepay(pay_type) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    var time = today.getTime();

    if (parseInt(month) < 10) {
      month = "0" + month;
    }

    var order_no = this.props.program.program_id + "-" + year + "" + month + "" + date + "" + time;
    var trade_mony = this.props.program.price * 100; // * 100 เพราะ Treepay จะขยับทศนิยมเข้า 2ตำแหน่ง
    var user_id = this.props.user.user_id;
    this.props.getTreepayHash(pay_type, order_no, trade_mony, user_id)

    this.setState({
      pay_type: pay_type,
      order_no: order_no
    })
  }

  onSelectedTrialPackage(event) {
    const { user } = this.props;
    const period = 14;
    const expire_date = `${moment().add(period, 'days').format('YYYY/MM/DD')} 23:59:59`;
    this.props.trialPackage(user.email, expire_date);
    this.setState({
      statusTrial: "success"
    })
  }

  renderTrialPackage() {
    return (
      <div className="row mt-5">
        <div className="col-lg-4 mt-5">
          <div className="container" style={{ backgroundColor: "grey", height: "100%", width: "90%", marginTop: "15%" }}>
          </div>
        </div>
        <div className="col-lg-8 mt-5">
          <h1 className="mt-5 ml-2">แพ็คเกจ</h1>
          <div className="card col-lg-11 mt-3 shadow-sm">
            <div className="card-body">
              <h5 class="card-title mb-4">Platform</h5>
              <p class="card-text">- Benefit 1</p>
              <p class="card-text">- Benefit 2</p>
              <p class="card-text">- Benefit 3</p>
              <h5 class="card-title" style={{ float: "right" }}>ใช้ฟรี 14 วัน</h5>
            </div>
          </div>
          <div className="col-lg-11 mt-4">
            <div style={{ float: "right" }}>
              <button type="button" class="btn btn-light border mr-4" onClick={() => this.props.history.push('/platform')}>
                ยกเลิก
              </button>
              <button type="button" class="btn btn-danger" onClick={() => this.onSelectedTrialPackage()}>
                ทดลองใช้
              </button>
            </div>
          </div>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
        </div>
      </div>
    )
  }

  renderTrialPackageSuccess() {
    return (
      <div className="row mt-5">
        <div className="col-lg-4 mt-5">
          <div className="container" style={{ backgroundColor: "grey", height: "100%", width: "90%", marginTop: "15%" }}>
          </div>
        </div>
        <div className="col-lg-8 mt-5">
          <h1 className="mt-5 ml-2">สำเร็จ</h1>
          <center><h4 className="mt-3">thank you</h4></center>
          <center><h4 className="">XXXXXXXXXXXXXXXXXX</h4></center>
          <div className="card col-lg-11 mt-3 shadow-sm">
            <div className="card-body">
              <h5 class="card-title mb-4">แพ็คเกจ</h5>
              <p class="card-text">Platform</p>
              <h5 class="card-title" style={{ float: "right" }}>ใช้ฟรี 14 วัน</h5>
            </div>
          </div>
          <div className="col-lg-11 mt-4">
            <button type="button" class="btn btn-danger" style={{ width: "100%" }} onClick={() => this.props.history.push('/videolist')}>
              ใช้งาน Platform
            </button>
          </div>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
        </div>
      </div>
    )
  }

  renderFit60DaysPackage() {
    return (
      <div className="row mt-5">
        <div className="col-lg-4 mt-5">
          <div className="container" style={{ backgroundColor: "grey", height: "100%", width: "90%", marginTop: "15%" }}>
          </div>
        </div>
        <div className="col-lg-8 mt-5">
          <h1 className="mt-5 ml-2">แพ็คเกจแบบเสียเงิน (ทดสอบ)</h1>
          <div className="card col-lg-11 mt-3 shadow-sm">
            <div className="card-body">
              <h5 class="card-title mb-4">Platform X เดือน</h5>
              <p class="card-text">- Benefit 1</p>
              <p class="card-text">- Benefit 2</p>
              <p class="card-text">- Benefit 3</p>
              <h5 class="card-title" style={{ float: "right" }}>ราคา {this.props.program.price} บาท</h5>
            </div>
            <div className="card-body row">
              <h5 class="card-title mb-4 col-lg-12">เลือกช่องทางการชำระเงิน</h5>
              <div class="paymentCard form-check card row shadow-sm ml-1 mb-4 col-lg-6" onClick={() => this.onSelectedManualPayment("Maual")}>
                <input
                  class="paymentRadioButton form-check-input ml-2"
                  type="radio"
                  name="inlineRadioOptions"
                  checked={(this.state.pay_type === "Maual") ? 'check' : ''}
                  onClick={() => this.onSelectedManualPayment("Maual")}
                />
                <div className="paymentLabel">
                  <span>โอนเงิน<b> (รอยืนยัน 48 ชม.)</b></span>
                </div>
              </div>
              <div className="col-lg-1">
              </div>
              <div class="paymentCard form-check card row shadow-sm ml-1 mb-4 col-lg-6" onClick={() => this.onSelectedPayTypeTreepay("PACA")}>
                <input
                  class="paymentRadioButton form-check-input ml-2"
                  type="radio"
                  name="inlineRadioOptions"
                  checked={(this.state.pay_type === "PACA") ? 'check' : ''}
                  onClick={() => this.onSelectedPayTypeTreepay("PACA")}
                />
                <div className="paymentLabel">
                  <h5 class="card-text">บัตรเดบิต/เครดิต</h5>
                </div>
              </div>
              <div className="col-lg-1">
              </div>
              <div class="paymentCard form-check card row shadow-sm ml-1 mb-4 col-lg-6" onClick={() => this.onSelectedPayTypeTreepay("PABK")}>
                <input
                  class="paymentRadioButton form-check-input ml-2"
                  type="radio"
                  name="inlineRadioOptions"
                  checked={(this.state.pay_type === "PABK") ? 'check' : ''}
                  onClick={() => this.onSelectedPayTypeTreepay("PABK")}
                />
                <div className="paymentLabel">
                  <h5 class="card-text">E-banking</h5 >
                </div>
              </div>
              <div className="col-lg-1">
              </div>
              <div class="paymentCard form-check card row shadow-sm ml-1 mb-4 col-lg-6" onClick={() => this.onSelectedPayTypeTreepay("PAIN")}>
                <input
                  class="paymentRadioButton form-check-input ml-2"
                  type="radio"
                  name="inlineRadioOptions"
                  checked={(this.state.pay_type === "PAIN") ? 'check' : ''}
                  onClick={() => this.onSelectedPayTypeTreepay("PAIN")}
                />
                <div className="paymentLabel">
                  <h5 class="card-text">ผ่อนชำระ</h5 >
                </div>
              </div>
              <div className="col-lg-1">
              </div>
            </div>
          </div>
          <div className="col-lg-11 mt-4">
            <form
              action={
                (process.env.REACT_APP_STAGE === "prod") ?
                  "https://pay.treepay.co.th/total/hubInit.tp"
                  :
                  "https://paytest.treepay.co.th/total/hubInit.tp"
              }
              id="treepay_form"
              method="post"
            >
              <div style={{ float: "right" }}>
                <button type="button" class="btn btn-light border mr-4" onClick={() => this.props.history.push('/platform')}>
                  ยกเลิก
                </button>
                {
                  (this.state.pay_type === "Maual") ?
                    <button class="btn btn-danger" onClick={() => this.setState({ manualPayment: "show" })}>
                      ถัดไป {/* ของ pay_type === Maual */}
                    </button>
                    :
                    <button type="submit" name="submit" class="btn btn-danger" alt="" onClick={() => this.submitOrder()}>
                      ถัดไป
                    </button>
                }
              </div>
              <input type="hidden" name="pay_type" value={this.state.pay_type} /><br></br>
              <input type="hidden" name="currency" value="764" /><br></br>
              <input type="hidden" name="tp_langFlag" value="en" /><br></br>
              <input type="hidden" name="site_cd" value={this.props.site_cd} /><br></br>
              <input
                type="hidden"
                name="ret_url"
                value={
                  (process.env.REACT_APP_STAGE === "prod") ?
                    `https://api.planforfit.com/bebe/execute_paytree`
                    :
                    (process.env.REACT_APP_STAGE === "dev") ?
                      "https://api.planforfit.com/bebedev/execute_paytree"
                      :
                      "http://localhost:3003/execute_paytree"
                } /><br></br>
              <input type="hidden" name="user_id" value={this.props.user.user_id} /><br></br>
              <input type="hidden" name="order_no" value={this.state.order_no} /><br></br>
              <input type="hidden" name="good_name" value={this.props.program.program_id} /><br></br>
              <input type="hidden" name="trade_mony" value={this.props.program.price * 100} /><br></br>
              <input type="hidden" name="order_first_name" value={this.props.user.first_name} /><br></br>
              <input type="hidden" name="order_last_name" value={this.props.user.last_name} /><br></br>
              <input type="hidden" name="order_addr" value="" /><br></br>
              <input type="hidden" name="order_email" value={this.props.user.email} /><br />
              <input type="hidden" name="res_cd" value="" />
              <input type="hidden" name="res_msg" value="" />
            </form>

          </div>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
        </div>
      </div>
    )
  }

  renderManualPayment() {
    return (
      <div className="row mt-5">
        <div className="col-lg-4 mt-5">
          <div className="container" style={{ backgroundColor: "grey", height: "100%", width: "90%", marginTop: "15%" }}>
          </div>
        </div>
        <div className="col-lg-8 mt-5">
          <h1 className="mt-5 ml-2">ข้อมูลการชำระเงิน</h1>
          <div className="card col-lg-11 mt-3 shadow-sm">
            <div className="card-body">
              <h5 class="card-title mb-4">แพ็คเกจ</h5>
              <p class="card-text">Platform X เดือน</p>
              <h5 class="card-title" style={{ float: "right" }}>ราคา {this.props.program.price} บาท</h5>
            </div>
            <div className="card-body">
              <h5 class="card-title mb-4">ข้อมูลบัญชีผู้รับโอน</h5>
              <p class="card-text">- ชื่อ xxxxxx xxxxxxx</p>
              <p class="card-text">- เลขที่บัญชี ธนาคารxxx xxxxxxx</p>
              <p class="card-text">- อัพโหลดหลักฐานการชำระเงิน</p>
              <input
                type="file"
                onChange={this.fileSelectedHandler}
                ref={fileInput => this.fileInput = fileInput}
                style={{ display: "none" }}
              />
              <div class="col-lg-9 col-md-12">
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <button
                      class=""
                      onClick={() => this.fileInput.click()}
                      style={{ background: "#333333", color: "white" }}
                    >
                      อัปโหลด
                    </button>
                  </div>
                  <input type="text" class="form-control " value={(this.state.selectedFile) ? this.state.selectedFile.name : ""} />
                  {
                    (this.state.selectedFile) &&
                    <i
                      class="fa fa-info-circle ml-3 mt-4 fa-lg "
                      style={{ cursor: "pointer" }}
                      onClick={() => this.showPaySlipImg()}
                      data-toggle="tooltip" data-placement="top" title="ดูรูปภาพที่อัปโหลด"
                    ></i>
                  }
                  <img className="pay-slip-Img col-12" id="pay-slip-Img" alt="" src={(this.state.selectedFile) ? this.state.urlPaySlip : ""}></img>
                </div>
                {
                  ((this.state.statusMaualPayment === "fail") && !(this.state.selectedFile)) &&
                  <small id="emailHelp" className="form-text text-muted mb-3"><h6 style={{ color: "red" }}>กรุณาอัพโหลดหลักฐานการชำระเงิน</h6></small>
                }
              </div>
            </div>
          </div>
          <div className="col-lg-11 mt-4">
            <div style={{ float: "right" }}>
              <button type="button" class="btn btn-light border mr-4" onClick={() => this.setState({ manualPayment: "" })}>
                ย้อนกลับ
              </button>
              <button
                class="btn btn-danger"
                onClick={() => this.submitPaySlip()}
              >
                ส่งหลักฐาน
              </button>
            </div>
          </div>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
        </div>
      </div>
    )
  }

  renderManualPaymentSuccess() {
    return (
      <div className="row mt-5">
        <div className="col-lg-4 mt-5">
          <div class="container" style={{ backgroundColor: "grey", height: "100%", width: "90%", marginTop: "15%" }}>
          </div>
        </div>
        <div className="col-lg-8 mt-5">
          <h2 className="mt-5 ml-2">รอการตรวจสอบชำระเงิน</h2>
          <center>
            <h5 className="ml-2">Thank you</h5>
            <h5 className="ml-2">หลังจากเจ้าหน้าที่ตรวจสอบ จะมีอีเมล์ตอบกลับภายใน 48 ชม.</h5>
            <h5 className="ml-2">จึงจะสามารถใช้งาน Platform ได้</h5>
            <h5 className="ml-2">หากมีข้อสงสัยสามารถติดต่อเข้ามาได้ที่ 02XXXXXXX หรือ bebe@XXX.com</h5>
          </center>
          <div className="card col-lg-11 mt-3 shadow-sm">
            <div className="card-body">
              <h5 class="card-title mb-4">แพ็คเกจ</h5>
              <p class="card-text">Platform X เดือน</p>
              <h5 class="card-title" style={{ float: "right" }}>ราคา {this.props.program.price} บาท</h5>
            </div>
          </div>
          <button type="button" class="btn btn-danger border col-lg-11 mt-4 mr-4 ml-2" onClick={() => this.props.history.push('/platform')}>
            กลับหน้าหลัก
          </button>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
          <h1 className="mt-5 text-light">.</h1>
        </div>
      </div>
    )
  }

  render() {
    const { statusTrial, manualPayment, statusMaualPayment } = this.state;
    const { program } = this.props;
    return (
      <div className="center">
        {
          (program !== null && program.program_id === "trial14") && (
            (statusTrial === "success") ?
              this.renderTrialPackageSuccess()
              :
              this.renderTrialPackage()
          )
        }
        {
          (program !== null && program.program_id === "fit60days") && (
            (manualPayment === "show") ?
              (statusMaualPayment === "success") ?
                this.renderManualPaymentSuccess()
                :
                this.renderManualPayment()
              :
              this.renderFit60DaysPackage()
          )
        }
      </div>
    )
  }

}

const mapStateToProps = ({ authUser, exerciseProgram, payment }) => {
  const { user } = authUser;
  const { program } = exerciseProgram;
  const { hash_data, site_cd } = payment;
  return { user, program, hash_data, site_cd };
};

const mapActionsToProps = {
  trialPackage,
  logoutUser,
  clearVideoList,
  getTreepayHash,
  clearPayment,
  createOrder
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Package);
