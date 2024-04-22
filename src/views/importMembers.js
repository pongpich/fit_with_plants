import React, { Component } from "react";
import { connect } from "react-redux";
import { importMembers, changeEmail } from "../redux/auth";
import { updateStatusLowImpact, updateProgramLevel } from "../redux/update";
import {
  selectProgramInWeek,
  deleteProgramInWeek,
  selectMemberInfo,
  selectBodyInfo,
} from "../redux/exerciseVideos";
import { selectMemberEventLog } from "../redux/challenges";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./importMembers.scss";

class ImportMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRenderPage: "renderImportMembers",
      members: [],
      selectedStartDate: null,
      selectedExpireDate: null,
      selectedFile: null,
      statusSubmitImportMembers: "default",
      statusSubmitAddMember: "default",
      email: "",
      new_email: "",
      statusChangeEmail: "default",
      fullname: "",
      phone: "",
      facebook: "",
      fb_group: 404,
      member_type: "bodyweight",
      member_type2: "bodyweight",
      // exercise_day: 3,
      import_type: "import_members",
      editMemberType: false,
      editProgramLevel: false,
      exercise_day: "3",
    };
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      // เช็คว่า login ยัง
      if (
        user !== null &&
        user.password !== null &&
        user.authorization !== "admin"
      ) {
        // ต้องเป็น admin เท่านั้นถึงจะเข้าหน้า import-members ได้
        this.props.history.push("/login");
      }
    } else {
      this.props.history.push("/login");
    }
  }

  componentDidUpdate(prevProps) {
    const {
      statusUpdateLowImpact,
      statusUpdateProgramLevel,
      statusImportMembers,
    } = this.props;
    if (
      prevProps.statusUpdateLowImpact !== statusUpdateLowImpact &&
      statusUpdateLowImpact === "success"
    ) {
      this.setState({ editMemberType: false });
      this.props.selectMemberInfo(this.state.email);
    }
    if (
      prevProps.statusUpdateProgramLevel !== statusUpdateProgramLevel &&
      statusUpdateProgramLevel === "success"
    ) {
      this.setState({ editProgramLevel: false });
      this.props.selectMemberInfo(this.state.email);
    }

    if (
      prevProps.statusImportMembers !== statusImportMembers &&
      statusImportMembers === "success"
    ) {
      document.getElementById("popupSuccessSubmit").classList.toggle("active");
      document
        .getElementById("overlayPopupSuccessSubmit")
        .classList.toggle("active");
      var delayInMilliseconds = 1750; //1.75 second
      setTimeout(() => {
        // เด้ง Popup SucccessSubmit 1.75 วินาที แล้วปิดเอง
        this.closePopupSuccessSubmit();
      }, delayInMilliseconds);
    }

    if (
      prevProps.statusImportMembers !== statusImportMembers &&
      statusImportMembers === "fail"
    ) {
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }
  // handleExerciseDayChange = (event) => {
  //   this.setState({
  //     exercise_day: event.target.value,
  //   });
  // };
  handleRadioChange = (event) => {
    this.setState({
      exercise_day: event.target.value,
    });
  };
  fileSelectedHandler = (event) => {
    const Papa = require("papaparse");
    var members = [];
    this.setState({
      selectedFile: null,
    });

    if (document.getElementById("upload-csv").files[0]) {
      Papa.parse(document.getElementById("upload-csv").files[0], {
        download: true,
        header: false,
        complete: function (results) {
          var data = results.data;
          console.log("data : ", data);
          for (var i = 1; i <= data.length - 1; i++) {
            // i = 1 เพราะว่า rowที่0 เป็นหัวcolumn
            var member = {
              email: "",
              first_name: "",
              last_name: "",
              phone: "",
              facebook: "",
              fb_group: 404,
              exercise_day: "",
            }; // fb_group = 404 คือ Admin ไม่ใส่ fb_group ตอน Import
            member.email = data[i][0]
              ? data[i][0].trim().split(" ").join("")
              : "";
            const full_name = data[i][1] ? data[i][1].trim().split(" ") : "";
            member.first_name = full_name[0]
              ? full_name[0].split("'").join('"')
              : ""; //ต้องมีการเปลี่ยน ' เป็น " เพื่อป้องกัน syntax error ของ SQL
            member.last_name = full_name[full_name.length - 1]
              ? full_name[full_name.length - 1].split("'").join('"')
              : ""; //ต้องมีการเปลี่ยน ' เป็น " เพื่อป้องกัน syntax error ของ SQL
            if (member.first_name === member.last_name) {
              member.last_name = "";
            } //เช็คสำหรับ กรณีกรอกมาแค่ชื่อ
            member.phone = data[i][2] ? data[i][2] : "";
            member.facebook = data[i][3]
              ? data[i][3].trim().split("'").join('"')
              : ""; //ต้องมีการเปลี่ยน ' เป็น " เพื่อป้องกัน syntax error ของ SQL
            member.fb_group = data[i][4] ? data[i][4] : 404; // fb_group = 404 คือ Admin ไม่ใส่ fb_group ตอน Import
            member.exercise_day = data[i][5] ? data[i][5] : "";
            members.push(member);
            console.log(`members ${i} : `, members);
          }
          console.log("members ALL :", members);
        },
      });
      this.setState({
        selectedFile: document.getElementById("upload-csv").files[0],
        members: members,
      });
    }
  };

  onSubmitImportMembers() {
    const {
      members,
      selectedStartDate,
      selectedExpireDate,
      selectedFile,
      member_type,
    } = this.state;
    const start_date = this.formatDate(selectedStartDate) + " 00:00:00"; // Ex. "2021-02-19 00:00:00"
    const expire_date = this.formatDate(selectedExpireDate) + " 23:59:59"; // Ex. "2021-04-30 23:59:59"
    this.setState({
      statusSubmitImportMembers: "default",
    });
    console.log("444444");
    if (member_type === "gym") {
      this.togglePopupConfirmLowimp(); //สั่งปิด popup ConfirmLowimp
    }

    if (
      selectedFile !== null &&
      selectedStartDate !== null &&
      selectedExpireDate !== null
    ) {
      this.props.importMembers(members, start_date, expire_date, member_type);
      console.log("members :", members);
    } else {
      this.setState({
        statusSubmitImportMembers: "fail",
      });
    }
  }

  onSubmitAddMember() {
    const {
      selectedStartDate,
      selectedExpireDate,
      email,
      fullname,
      phone,
      facebook,
      fb_group,
      member_type2,
      exercise_day,
    } = this.state;
    const start_date = this.formatDate(selectedStartDate) + " 00:00:00"; // Ex. "2021-02-19 00:00:00"
    const expire_date = this.formatDate(selectedExpireDate) + " 23:59:59"; // Ex. "2021-04-30 23:59:59"
    this.setState({
      statusSubmitAddMember: "default",
    });
    const full_name = fullname ? fullname.trim().split(" ") : "";
    const first_name = full_name[0] ? full_name[0].split("'").join('"') : ""; //ต้องมีการเปลี่ยน ' เป็น " เพื่อป้องกัน syntax error ของ SQL
    const last_name = full_name[full_name.length - 1]
      ? full_name[full_name.length - 1].split("'").join('"')
      : ""; //ต้องมีการเปลี่ยน ' เป็น " เพื่อป้องกัน syntax error ของ SQL
    const members = [
      {
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        facebook: facebook.split("'").join('"'), //ต้องมีการเปลี่ยน ' เป็น " เพื่อป้องกัน syntax error ของ SQL
        fb_group: fb_group,
        exercise_day: exercise_day,
      },
    ];

    if (member_type2 === "gym") {
      this.togglePopupConfirmLowimp(); //สั่งปิด popup ConfirmLowimp
    }

    if (
      email &&
      fb_group &&
      selectedStartDate !== null &&
      selectedExpireDate !== null
    ) {
      console.log("members : ", members);
      console.log("start_date : ", start_date);
      console.log("expire_date : ", expire_date);
      console.log("excersise_day : ", exercise_day);
      this.props.importMembers(members, start_date, expire_date, member_type2);
      document.getElementById("popupSuccessSubmit").classList.toggle("active");
      document
        .getElementById("overlayPopupSuccessSubmit")
        .classList.toggle("active");
      var delayInMilliseconds = 1750; //1.75 second
      setTimeout(() => {
        // เด้ง Popup SucccessSubmit 1.75 วินาที แล้วปิดเอง
        this.closePopupSuccessSubmit();
      }, delayInMilliseconds);
    } else {
      this.setState({
        statusSubmitAddMember: "fail",
      });
    }
  }

  deleteProgramInWeek(email) {
    this.props.deleteProgramInWeek(email);
    document.getElementById("popupSuccessSubmit").classList.toggle("active");
    document
      .getElementById("overlayPopupSuccessSubmit")
      .classList.toggle("active");
    var delayInMilliseconds = 1750; //1.75 second
    setTimeout(() => {
      // เด้ง Popup SucccessSubmit 1.75 วินาที แล้วปิดเอง
      this.props.selectProgramInWeek(email);
      this.closePopupSuccessSubmit();
    }, delayInMilliseconds);
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  closePopupSuccessSubmit() {
    document.getElementById("popupSuccessSubmit").classList.toggle("active");
    document
      .getElementById("overlayPopupSuccessSubmit")
      .classList.toggle("active");
  }

  renderPopupSuccessSubmit() {
    return (
      <div>
        <div
          className="overlayContainerPopupSuccessSubmit"
          id="overlayPopupSuccessSubmit"
        ></div>
        <div
          className="popupSuccessSubmit"
          id="popupSuccessSubmit"
          style={{ marginTop: "10%" }}
        >
          <center>
            <h2 style={{ color: "green" }}>
              <i className="fa fa-check fa-lg"> Success</i>
            </h2>
          </center>
        </div>
      </div>
    );
  }

  togglePopupConfirmLowimp(import_type) {
    this.setState({
      import_type: import_type,
    });

    document.getElementById("popupConfirmLowimp").classList.toggle("active");
    document
      .getElementById("overlayPopupConfirmLowimp")
      .classList.toggle("active");
  }

  renderPopupConfirmLowimp() {
    const { import_type } = this.state;
    return (
      <div>
        <div
          className="overlayContainerPopupConfirmLowimp"
          id="overlayPopupConfirmLowimp"
        ></div>
        <div
          className="popupConfirmLowimp"
          id="popupConfirmLowimp"
          style={{ marginTop: "10%" }}
        >
          <center>
            <h2 style={{ color: "red" }}>แน่ใจหรือไม่ ?</h2>
            <h2>คุณกำลังเลือก Import ผู้ใช้เป็นกลุ่ม</h2>
            <h2 style={{ color: "orange" }}>"Gym"</h2>
          </center>
          <center
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 30,
            }}
          >
            <button
              type="button"
              className="btn btn-danger col-lg-5 col-md-6 "
              onClick={() => this.togglePopupConfirmLowimp()}
            >
              ยกเลิก
            </button>
            {import_type === "import_members" && (
              <button
                type="button"
                className="btn btn-success col-lg-5 col-md-6 "
                onClick={() => this.onSubmitImportMembers()}
              >
                ยืนยัน
              </button>
            )}
            {import_type === "add_member" && (
              <button
                type="button"
                className="btn btn-success col-lg-5 col-md-6 "
                onClick={() => this.onSubmitAddMember()}
              >
                ยืนยัน
              </button>
            )}
          </center>
        </div>
      </div>
    );
  }

  changeEmail(email, new_email) {
    this.props.changeEmail(email, new_email);
    var delayInMilliseconds = 1300; //1.3 second
    setTimeout(() => {
      // หน่วงเวลา แล้วค่อย setState
      this.setState({
        statusChangeEmail: this.props.statusChangeEmail,
      });
    }, delayInMilliseconds);
  }

  renderChangeEmail() {
    return (
      <div className="row">
        {this.renderPopupSuccessSubmit()}
        <h1>.</h1>
        <div className="card mt-5 mb-3 col-lg-12">
          <div className="card-body">
            <h1 className="mb-5">เปลี่ยนอีเมล</h1>
            <label for="fname">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={(event) => this.handleChange(event)}
            />
            <br></br>
            {this.state.statusChangeEmail === "email_incorrect" && (
              <small id="emailHelp" className="form-text text-muted mb-3">
                <h6 style={{ color: "red" }}>อีเมลไม่ถูกต้อง</h6>
              </small>
            )}
            <label for="fname">New Email: </label>
            <input
              type="text"
              id="new_email"
              name="new_email"
              value={this.state.new_email}
              onChange={(event) => this.handleChange(event)}
            />
            {this.state.statusChangeEmail === "email_exist" && (
              <small id="emailHelp" className="form-text text-muted mb-3">
                <h6 style={{ color: "red" }}>อีเมลนี้มีในระบบอยู่แล้ว</h6>
              </small>
            )}
            {this.state.statusChangeEmail === "success" && (
              <small id="emailHelp" className="form-text text-muted mb-3">
                <h6 style={{ color: "green" }}>Success</h6>
              </small>
            )}
            <br></br>
            <button
              type="button"
              onClick={() =>
                this.changeEmail(this.state.email, this.state.new_email)
              }
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    );
  }

  onEditMemberType() {
    const { editMemberType } = this.state;
    if (editMemberType) {
      this.setState({ editMemberType: false });
    } else {
      this.setState({ editMemberType: true });
    }
  }

  onEditProgramLevel() {
    const { editProgramLevel } = this.state;
    if (editProgramLevel) {
      this.setState({ editProgramLevel: false });
    } else {
      this.setState({ editProgramLevel: true });
    }
  }

  renderMemberInfo() {
    const { memberInfo, statusUpdateLowImpact, statusUpdateProgramLevel } =
      this.props;
    const { editMemberType, editProgramLevel } = this.state;
    return (
      <div className="row">
        {this.renderPopupSuccessSubmit()}
        <h1>.</h1>
        <div className="card mt-5 mb-3 col-lg-12">
          <div className="card-body">
            <h1 className="mb-5">ข้อมูลผู้ใช้</h1>
            <label for="fname">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={(event) => this.handleChange(event)}
            />
            <button
              type="button"
              onClick={() => this.props.selectMemberInfo(this.state.email)}
            >
              ค้นหา
            </button>
            <br></br>
            {this.props.memberInfo &&
              this.props.memberInfo.other_attributes && (
                <div>
                  <h5>{"Email : " + this.props.memberInfo.email}</h5>
                  <h5>{"Firstname : " + this.props.memberInfo.first_name}</h5>
                  <h5>{"Lastname : " + this.props.memberInfo.last_name}</h5>
                  <h5>{"Phone : " + this.props.memberInfo.phone}</h5>
                  <h5>{"FB Group : " + this.props.memberInfo.fb_group}</h5>
                  <h5>{"Facebook : " + this.props.memberInfo.facebook}</h5>
                  <h5>
                    {"Info : " +
                      " อายุ: " +
                      JSON.parse(this.props.memberInfo.other_attributes).age +
                      "," +
                      " เพศ: " +
                      JSON.parse(this.props.memberInfo.other_attributes).sex +
                      ","}
                  </h5>
                  <h5>
                    {"Body Info : " +
                      " น้ำหนัก: " +
                      JSON.parse(this.props.memberInfo.other_attributes)
                        .weight +
                      "," +
                      " ส่วนสูง: " +
                      JSON.parse(this.props.memberInfo.other_attributes)
                        .height +
                      "," +
                      " อก: " +
                      JSON.parse(this.props.memberInfo.other_attributes).chest +
                      "," +
                      " เอว: " +
                      JSON.parse(this.props.memberInfo.other_attributes).waist +
                      "," +
                      " สะโพก: " +
                      JSON.parse(this.props.memberInfo.other_attributes).hip +
                      ","}
                  </h5>
                  <h5>{"วันเริ่มต้น : " + this.props.memberInfo.start_date}</h5>
                  <h5>{"วันสิ้นสุด : " + this.props.memberInfo.expire_date}</h5>
                  <h5>
                    {`ประเภทผู้ใช้ : ${
                      this.props.memberInfo.exercise_type === "bodyweight"
                        ? "bodyweight"
                        : "gym"
                    }`}
                    <span
                      style={{
                        color: "red",
                        marginLeft: 30,
                        cursor: "pointer",
                      }}
                      onClick={() => this.onEditMemberType()}
                    >
                      แก้ไข
                    </span>
                  </h5>
                  {editMemberType &&
                    statusUpdateLowImpact !== "loading" &&
                    (this.props.memberInfo.exercise_type === "bodyweight" ? (
                      <div>
                        <h6>
                          ต้องการปรับเป็นประเภท{" "}
                          <span style={{ color: "red" }}>"gym"</span>{" "}
                          ใช่หรือไม่?
                        </h6>
                        <span
                          style={{
                            color: "green",
                            marginLeft: 30,
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            this.props.updateStatusLowImpact(
                              memberInfo && memberInfo.user_id,
                              "gym"
                            )
                          }
                        >
                          ยืนยัน
                        </span>
                        <span
                          style={{
                            color: "red",
                            marginLeft: 30,
                            cursor: "pointer",
                          }}
                          onClick={() => this.onEditMemberType()}
                        >
                          ยกเลิก
                        </span>
                      </div>
                    ) : (
                      <div>
                        <h6>
                          ต้องการปรับเป็นประเภท{" "}
                          <span style={{ color: "red" }}>"bodyweight"</span>{" "}
                          ใช่หรือไม่?
                        </h6>
                        <span
                          style={{
                            color: "green",
                            marginLeft: 30,
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            this.props.updateStatusLowImpact(
                              memberInfo && memberInfo.user_id,
                              "bodyweight"
                            )
                          }
                        >
                          ยืนยัน
                        </span>
                        <span
                          style={{
                            color: "red",
                            marginLeft: 30,
                            cursor: "pointer",
                          }}
                          onClick={() => this.onEditMemberType()}
                        >
                          ยกเลิก
                        </span>
                      </div>
                    ))}
                  {editProgramLevel &&
                    statusUpdateProgramLevel !== "loading" &&
                    (memberInfo.program_level !== "bfr_lv2" ? (
                      <div>
                        <h6>
                          ต้องการปรับเป็นโปรแกรม{" "}
                          <span style={{ color: "red" }}>
                            "bfr_lv2 (Standard)"
                          </span>{" "}
                          ใช่หรือไม่?
                        </h6>
                        <span
                          style={{
                            color: "green",
                            marginLeft: 30,
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            this.props.updateProgramLevel(
                              memberInfo && memberInfo.user_id,
                              "bfr_lv2"
                            )
                          }
                        >
                          ยืนยัน
                        </span>
                        <span
                          style={{
                            color: "red",
                            marginLeft: 30,
                            cursor: "pointer",
                          }}
                          onClick={() => this.onEditProgramLevel()}
                        >
                          ยกเลิก
                        </span>
                      </div>
                    ) : (
                      <div>
                        <h6>
                          ต้องการปรับเป็นโปรแกรม{" "}
                          <span style={{ color: "red" }}>"bfr_lv1.5"</span>{" "}
                          ใช่หรือไม่?
                        </h6>
                        <span
                          style={{
                            color: "green",
                            marginLeft: 30,
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            this.props.updateProgramLevel(
                              memberInfo && memberInfo.user_id,
                              "bfr_lv1.5"
                            )
                          }
                        >
                          ยืนยัน
                        </span>
                        <span
                          style={{
                            color: "red",
                            marginLeft: 30,
                            cursor: "pointer",
                          }}
                          onClick={() => this.onEditProgramLevel()}
                        >
                          ยกเลิก
                        </span>
                      </div>
                    ))}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }

  renderMemberEventLog() {
    return (
      <div className="row">
        {this.renderPopupSuccessSubmit()}
        <h1>.</h1>
        <div className="card mt-5 mb-3 col-lg-12">
          <div className="card-body">
            <h1 className="mb-5">Member Event Log</h1>
            <label for="fname">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={(event) => this.handleChange(event)}
            />
            <button
              type="button"
              onClick={() => this.props.selectMemberEventLog(this.state.email)}
            >
              ค้นหา
            </button>
            <table style={{ border: "4px solid black" }}>
              <tr
                style={{
                  border: "4px solid black",
                  backgroundColor: "#CFE2F3",
                  textAlign: "center",
                }}
              >
                <td style={{ border: "1px solid black", width: 220 }}>
                  <h5>
                    <b>{"Log"}</b>
                  </h5>
                </td>
                <td style={{ border: "1px solid black", width: 280 }}>
                  <h5>
                    <b>{"ความหมาย"}</b>
                  </h5>
                </td>
                <td style={{ border: "1px solid black", width: 380 }}>
                  <h5>
                    <b>{"หมายเหตุ"}</b>
                  </h5>
                </td>
              </tr>
              <tr
                style={{
                  border: "4px solid black",
                  backgroundColor: "#ECF0F1",
                }}
              >
                <td style={{ border: "1px solid black" }}>
                  <h6>{"weight"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>{"ชั่งน้ำหนัก"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>{"ได้รับ 10 คะแนน ทันที (เมื่อครบ 2 ครั้ง)"}</h6>
                </td>
              </tr>
              <tr
                style={{
                  border: "4px solid black",
                  backgroundColor: "#ECF0F1",
                }}
              >
                <td style={{ border: "1px solid black" }}>
                  <h6>{"weight bonus"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>{"ในวันนั้นมีสมาชิกในทีมชั่งน้ำหนัก"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>
                    {"ได้รับ 10 คะแนน ทันที (สูงสุด 70 คะแนน ต่อ สัปดาห์)"}
                  </h6>
                </td>
              </tr>
              <tr
                style={{
                  border: "4px solid black",
                  backgroundColor: "#ECF0F1",
                }}
              >
                <td style={{ border: "1px solid black" }}>
                  <h6>{"reduced waist"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>{"รอบเอวลดลงจากสัปดาห์ก่อน"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>{"ได้รับ 10 คะแนน ทันที"}</h6>
                </td>
              </tr>
              <tr
                style={{
                  border: "4px solid black",
                  backgroundColor: "#ECF0F1",
                }}
              >
                <td style={{ border: "1px solid black" }}>
                  <h6>{"reduced weight"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>{"น้ำหนักลดลงจากสัปดาห์ก่อน"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>{"ได้รับ 10 คะแนน วัน อา. เวลา 23:30:XX"}</h6>
                </td>
              </tr>
              <tr
                style={{
                  border: "4px solid black",
                  backgroundColor: "#ECF0F1",
                }}
              >
                <td style={{ border: "1px solid black" }}>
                  <h6>{"exercise complete"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>{"ออกกำลังกายครบ 4 วัน ต่อสัปดาห์"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>{"ได้รับ 10 คะแนน วัน อา. เวลา 23:30:XX"}</h6>
                </td>
              </tr>
              <tr
                style={{
                  border: "4px solid black",
                  backgroundColor: "#ECF0F1",
                }}
              >
                <td style={{ border: "1px solid black" }}>
                  <h6>{"weight team complete"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>
                    {"สมาชิกในทีมทุกคน แต่ละคนชั่งน้ำหนักครบ 2 ครั้ง ในสัปดาห์"}
                  </h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>{"ได้รับ 10 คะแนน วัน อา. เวลา 23:30:XX"}</h6>
                </td>
              </tr>
              <tr
                style={{
                  border: "4px solid black",
                  backgroundColor: "#ECF0F1",
                }}
              >
                <td style={{ border: "1px solid black" }}>
                  <h6>{"rank bonus"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>{"โบนัสคะแนนของแต่ละ rank"}</h6>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <h6>
                    {
                      "ได้รับ 5, 10 คะแนน (ขึ้นอยู่กับ Rank) วัน อา. เวลา 23:30:XX"
                    }
                  </h6>
                </td>
              </tr>
            </table>
            <br></br>

            <table style={{ border: "4px solid black" }}>
              <tr
                style={{
                  border: "4px solid black",
                  backgroundColor: "#EEB2CB",
                  textAlign: "center",
                }}
              >
                <td style={{ border: "1px solid black", width: 220 }}>
                  <h5>
                    <b>{"Log"}</b>
                  </h5>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h5>
                    <b>{"Log Value"}</b>
                  </h5>
                </td>
                <td style={{ border: "1px solid black", width: 120 }}>
                  <h5>
                    <b>{"Log Type"}</b>
                  </h5>
                </td>
                <td style={{ border: "1px solid black", width: 80 }}>
                  <h5>
                    <b>{"Score"}</b>
                  </h5>
                </td>
                <td style={{ border: "0px solid black", width: 120 }}>
                  <h5>
                    <b>{"Created at"}</b>
                  </h5>
                </td>
                <td style={{ border: "0px solid black" }}>
                  <h5></h5>
                </td>
              </tr>

              {this.props.memberEventLog &&
                this.props.memberEventLog.map((item, index) => {
                  return (
                    <tr
                      style={
                        index % 2 === 0
                          ? { border: "1px solid black" }
                          : {
                              border: "1px solid black",
                              backgroundColor: "#ECF0F1",
                            }
                      }
                    >
                      <td style={{ border: "1px solid black" }}>
                        <h6>{item.log}</h6>
                      </td>
                      <td
                        style={{ border: "1px solid black", textAlign: "left" }}
                      >
                        <h6>{item.log_value}</h6>
                      </td>
                      <td
                        style={{ border: "1px solid black", textAlign: "left" }}
                      >
                        <h6>{item.log_type}</h6>
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        <h6 style={item.score > 0 ? { color: "red" } : {}}>
                          {item.score}
                        </h6>
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        <h6>{item.created_at.split("T")[0]}</h6>
                      </td>
                      <td style={{ border: "1px solid black" }}>
                        <h6>{item.created_at.split("T")[1].split(".000Z")}</h6>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
    );
  }

  renderBodyInfo() {
    return (
      <div className="row">
        {this.renderPopupSuccessSubmit()}
        <h1>.</h1>
        <div className="card mt-5 mb-3 col-lg-12">
          <div className="card-body">
            <h1 className="mb-5">Body Info</h1>
            <label for="fname">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={(event) => this.handleChange(event)}
            />
            <button
              type="button"
              onClick={() => this.props.selectBodyInfo(this.state.email)}
            >
              ค้นหา
            </button>
            <br></br>

            {this.props.bodyInfo &&
              this.props.bodyInfo.map((item, index) => {
                return (
                  <div>
                    <h5>
                      {"Week " + item.week_in_program + " : "}
                      <span>
                        {item.body_info &&
                          " น้ำหนัก: " +
                            JSON.parse(item.body_info).weight +
                            "," +
                            " ส่วนสูง: " +
                            JSON.parse(item.body_info).height +
                            "," +
                            " อก: " +
                            JSON.parse(item.body_info).chest +
                            "," +
                            " เอว: " +
                            JSON.parse(item.body_info).waist +
                            "," +
                            " สะโพก: " +
                            JSON.parse(item.body_info).hip +
                            ","}
                      </span>
                    </h5>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  renderDeleteProgramInWeek() {
    return (
      <div className="row">
        {this.renderPopupSuccessSubmit()}
        <h1>.</h1>
        <div className="card mt-5 mb-3 col-lg-12">
          <div className="card-body">
            <h1 className="mb-5">Program In Week</h1>
            <label for="fname">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={(event) => this.handleChange(event)}
            />
            <button
              type="button"
              onClick={() => this.props.selectProgramInWeek(this.state.email)}
            >
              ค้นหา
            </button>
            <br></br>
            <textarea
              id="w3review"
              name="w3review"
              rows="10"
              cols="100"
              value={this.props.programInWeek}
            ></textarea>
            <button
              type="button"
              onClick={() => this.deleteProgramInWeek(this.state.email)}
            >
              ลบ
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderAddMember() {
    const {
      selectedStartDate,
      selectedExpireDate,
      statusSubmitAddMember,
      member_type2,
      exercise_day,
    } = this.state;

    return (
      <div className="row">
        {this.renderPopupSuccessSubmit()}
        {this.renderPopupConfirmLowimp()}

        <h1>.</h1>
        <div className="card mt-5 mb-3 col-lg-12">
          <div className="card-body">
            <h1 className="mb-5">เพิ่มสมาชิก</h1>

            <div className="mb-2">
              <h5>เลือกประเภทของผู้ใช้:</h5>
              <input
                id="member_type2"
                type="radio"
                value="bodyweight"
                checked={member_type2 === "bodyweight"}
                onChange={(event) => this.handleChange(event)}
              />
              <label
                className="ml-2"
                style={{
                  color: member_type2 === "bodyweight" ? "orange" : "black",
                  fontSize: member_type2 === "bodyweight" ? 24 : 16,
                }}
              >
                {" "}
                bodyweight
              </label>
              <br></br>
              <input
                id="member_type2"
                type="radio"
                value="gym"
                checked={member_type2 === "gym"}
                onChange={(event) => this.handleChange(event)}
              />
              <label
                className="ml-2"
                style={{
                  color: member_type2 === "gym" ? "orange" : "black",
                  fontSize: member_type2 === "gym" ? 24 : 16,
                }}
              >
                {" "}
                gym
              </label>
              <br></br>
            </div>

            <div className="mb-2">
              <h5>เลือกจำนวนวันของผู้ใช้:</h5>
              <input
                type="radio"
                value="2"
                checked={exercise_day === "2"}
                onChange={this.handleRadioChange}
              />
              <label
                className="ml-2"
                style={{
                  color: exercise_day === "2" ? "orange" : "black",
                  fontSize: exercise_day === "2" ? 24 : 16,
                }}
              >
                {" "}
                2
              </label>
              <br></br>
              <input
                type="radio"
                value="3"
                checked={exercise_day === "3"}
                onChange={this.handleRadioChange}
              />
              <label
                className="ml-2"
                style={{
                  color: exercise_day === "3" ? "orange" : "black",
                  fontSize: exercise_day === "3" ? 24 : 16,
                }}
              >
                {" "}
                3
              </label>
              <br></br>
            </div>
            {/* <p>Selected Option: {exercise_day}</p> */}
            <label for="fname">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={(event) => this.handleChange(event)}
            />
            <br></br>
            <label for="fname">Fullname: </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={this.state.fullname}
              onChange={(event) => this.handleChange(event)}
            />
            <br></br>
            <label for="fname">Phone: </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={this.state.phone}
              onChange={(event) => this.handleChange(event)}
            />
            <br></br>
            <label for="fname">Facebook: </label>
            <input
              type="text"
              id="facebook"
              name="facebook"
              value={this.state.facebook}
              onChange={(event) => this.handleChange(event)}
            />
            <br></br>
            <label for="fname">fb_group: </label>
            <input
              type="text"
              id="fb_group"
              name="fb_group"
              value={this.state.fb_group}
              onChange={(event) => this.handleChange(event)}
            />
            <br></br>
            <section>
              <div style={{ float: "left" }} className="mr-5">
                <label style={{ display: "block" }} className="h5">
                  วันเริ่มต้น
                </label>
                <DatePicker
                  style={{ display: "block" }}
                  dateFormat="yyyy/MM/dd"
                  selected={selectedStartDate}
                  onChange={(date) =>
                    this.setState({ selectedStartDate: date })
                  }
                  isClearable
                  showYearDropdown
                  showMonthDropdown
                  scrollableMonthYearDropdown
                />
              </div>
              <div style={{ float: "left" }}>
                <label style={{ display: "block" }} className="h5">
                  วันสิ้นสุด
                </label>
                <DatePicker
                  style={{ display: "block" }}
                  dateFormat="yyyy/MM/dd"
                  selected={selectedExpireDate}
                  onChange={(date) =>
                    this.setState({ selectedExpireDate: date })
                  }
                  isClearable
                  showYearDropdown
                  showMonthDropdown
                  scrollableMonthYearDropdown
                />
              </div>
            </section>
          </div>
          {statusSubmitAddMember === "fail" && (
            <small id="emailHelp" className="form-text text-muted mb-3">
              <h6 style={{ color: "red" }}>**กรุณากรอกข้อมูลให้ครบถ้วน</h6>
            </small>
          )}
        </div>

        <button
          type="button"
          className="btn btn-danger ml-auto col-lg-1 col-md-6 "
          onClick={() =>
            this.setState({
              members: [],
              selectedStartDate: null,
              selectedExpireDate: null,
              statusSubmitImportMembers: "default",
              statusSubmitAddMember: "default",
              email: "",
              fullname: "",
              phone: "",
              facebook: "",
              fb_group: 404,
            })
          }
        >
          ยกเลิก
        </button>
        {member_type2 === "gym" ? (
          <button
            type="button"
            className="btn btn-success col-lg-1 col-md-6 "
            onClick={() => this.togglePopupConfirmLowimp("add_member")}
          >
            ยืนยัน
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success col-lg-1 col-md-6 "
            onClick={() => this.onSubmitAddMember()}
          >
            ยืนยัน
          </button>
        )}
      </div>
    );
  }

  renderImportMembers() {
    const {
      selectedStartDate,
      selectedExpireDate,
      statusSubmitImportMembers,
      member_type,
    } = this.state;
    const { statusImportMembers } = this.props;
    return (
      <div className="row">
        {this.renderPopupSuccessSubmit()}
        {this.renderPopupConfirmLowimp()}

        <h1>.</h1>
        <div className="card mt-5 mb-3 col-lg-12">
          <div className="card-body">
            <h1 className="mb-5">เพิ่มสมาชิก</h1>

            <h5>
              <span className="h6 ml-3" style={{ color: "red" }}>
                *ตัวอย่าง รูปแบบ Table
              </span>
            </h5>
            <table style={{ border: "4px solid black" }}>
              <tr
                style={{
                  border: "4px solid black",
                  backgroundColor: "#CFE2F3",
                  textAlign: "center",
                }}
              >
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h5>
                    <b>{"email"}</b>
                  </h5>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h5>
                    <b>{"full_name"}</b>
                  </h5>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h5>
                    <b>{"phone"}</b>
                  </h5>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h5>
                    <b>{"facebook"}</b>
                  </h5>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h5>
                    <b>{"fb_group"}</b>
                  </h5>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h5>
                    <b>{"exercise_day"}</b>
                  </h5>
                </td>
              </tr>
              <tr style={{ border: "1px solid black", textAlign: "center" }}>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h6>{"xxxxxxxx"}</h6>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h6>{"xxxx xxxx"}</h6>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h6>{"xxxxxxxx"}</h6>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h6>{"xxxx xxxx"}</h6>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h6>{"xxx"}</h6>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h6>{"xxx"}</h6>
                </td>
              </tr>
              <tr style={{ border: "1px solid black", textAlign: "center" }}>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h6>{"xxxxxxxx"}</h6>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h6>{"xxxx xxxx"}</h6>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h6>{"xxxxxxxx"}</h6>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h6>{"xxxx xxxx"}</h6>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h6>{"xxx"}</h6>
                </td>
                <td style={{ border: "1px solid black", width: 100 }}>
                  <h6>{"xxx"}</h6>
                </td>
              </tr>
            </table>

            <br></br>

            <h5>
              อัปโหลดไฟล์อีเมล
              <span className="h6 ml-3" style={{ color: "red" }}>
                *ไฟล์นามสกุล .csv
              </span>
            </h5>
            <input
              type="file"
              id="upload-csv"
              accept=".csv"
              ref={(fileInput) => (this.fileInput = fileInput)}
              onChange={this.fileSelectedHandler}
              style={{ display: "none" }}
            />
            <div className="mb-5 col-lg-9 col-md-12">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <button
                    className=""
                    onClick={() => this.fileInput.click()}
                    style={{ background: "#333333", color: "white" }}
                  >
                    อัปโหลด
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control "
                  value={
                    this.state.selectedFile ? this.state.selectedFile.name : ""
                  }
                />
              </div>
              {this.state.statusMaualPayment === "fail" &&
                !this.state.selectedFile && (
                  <small id="emailHelp" className="form-text text-muted mb-3">
                    <h6 style={{ color: "red" }}>
                      กรุณาอัพโหลดหลักฐานการชำระเงิน
                    </h6>
                  </small>
                )}
            </div>

            <div className="mb-2">
              <h5>เลือกประเภทของผู้ใช้cc:</h5>
              <input
                id="member_type"
                type="radio"
                value="bodyweight"
                checked={member_type === "bodyweight"}
                onChange={(event) => this.handleChange(event)}
              />
              <label
                className="ml-2"
                style={{
                  color: member_type === "bodyweight" ? "orange" : "black",
                  fontSize: member_type === "bodyweight" ? 24 : 16,
                }}
              >
                {" "}
                bodyweight
              </label>
              <br></br>
              <input
                id="member_type"
                type="radio"
                value="gym"
                checked={member_type === "gym"}
                onChange={(event) => this.handleChange(event)}
              />
              <label
                className="ml-2"
                style={{
                  color: member_type === "gym" ? "orange" : "black",
                  fontSize: member_type === "gym" ? 24 : 16,
                }}
              >
                {" "}
                gym
              </label>
              <br></br>
            </div>

            <section>
              <div style={{ float: "left" }} className="mr-5">
                <label style={{ display: "block" }} className="h5">
                  วันเริ่มต้น
                </label>
                <DatePicker
                  style={{ display: "block" }}
                  dateFormat="yyyy/MM/dd"
                  selected={selectedStartDate}
                  onChange={(date) =>
                    this.setState({ selectedStartDate: date })
                  }
                  isClearable
                  showYearDropdown
                  showMonthDropdown
                  scrollableMonthYearDropdown
                />
              </div>
              <div style={{ float: "left" }}>
                <label style={{ display: "block" }} className="h5">
                  วันสิ้นสุด
                </label>
                <DatePicker
                  style={{ display: "block" }}
                  dateFormat="yyyy/MM/dd"
                  selected={selectedExpireDate}
                  onChange={(date) =>
                    this.setState({ selectedExpireDate: date })
                  }
                  isClearable
                  showYearDropdown
                  showMonthDropdown
                  scrollableMonthYearDropdown
                />
              </div>
            </section>
          </div>
          {statusSubmitImportMembers === "fail" && (
            <small id="emailHelp" className="form-text text-muted mb-3">
              <h6 style={{ color: "red" }}>**กรุณากรอกข้อมูลให้ครบถ้วน</h6>
            </small>
          )}
          {statusImportMembers === "fail" && (
            <small id="emailHelp" className="form-text text-muted mb-3">
              <h6 style={{ color: "red" }}>
                **พบความผิดปกติ** กรุณาเช็คไฟล์ .csv ให้ถูกต้อง
                (ข้อมูลผู้ใช้ห้ามมี Emoji)
              </h6>
            </small>
          )}
        </div>

        <button
          type="button"
          className="btn btn-danger ml-auto col-lg-1 col-md-6 "
          onClick={() =>
            this.setState({
              members: [],
              selectedStartDate: null,
              selectedExpireDate: null,
            })
          }
        >
          ยกเลิก
        </button>
        {member_type === "gym" ? (
          <button
            type="button"
            className="btn btn-success col-lg-1 col-md-6 "
            onClick={() => this.togglePopupConfirmLowimp("import_members")}
          >
            ยืนยัน
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success col-lg-1 col-md-6 "
            onClick={() => this.onSubmitImportMembers()}
          >
            ยืนยัน
          </button>
        )}
      </div>
    );
  }

  render() {
    const { selectedRenderPage } = this.state;
    return (
      <div>
        <div className="nav mt-5 ml-5" id="myTab" role="tablist">
          <div className="mr-4 mb-3" style={{ cursor: "pointer" }}>
            <a
              className=""
              onClick={() =>
                this.setState({
                  selectedRenderPage: "renderImportMembers",
                  email: "",
                })
              }
              style={{}}
            >
              เพิ่มสมาชิก
            </a>
          </div>
          <div className="mr-4 mb-3" style={{ cursor: "pointer" }}>
            <a
              className=""
              onClick={() =>
                this.setState({
                  selectedRenderPage: "renderChangeEmail",
                  email: "",
                })
              }
              style={{}}
            >
              เปลี่ยนอีเมล
            </a>
          </div>
          <div className="mr-4 mb-3" style={{ cursor: "pointer" }}>
            <a
              className=""
              onClick={() =>
                this.setState({
                  selectedRenderPage: "renderMemberInfo",
                  email: "",
                })
              }
              style={{}}
            >
              ข้อมูลผู้ใช้
            </a>
          </div>
          <div className="mr-4 mb-3" style={{ cursor: "pointer" }}>
            <a
              className=""
              onClick={() =>
                this.setState({
                  selectedRenderPage: "renderBodyInfo",
                  email: "",
                })
              }
              style={{}}
            >
              BodyInfo
            </a>
          </div>
          <div className="mr-4 mb-3" style={{ cursor: "pointer" }}>
            <a
              className=""
              onClick={() =>
                this.setState({
                  selectedRenderPage: "renderMemberEventLog",
                  email: "",
                })
              }
              style={{}}
            >
              MemberEventLog
            </a>
          </div>
        </div>
        {selectedRenderPage === "renderImportMembers" &&
          this.renderImportMembers()}
        {selectedRenderPage === "renderImportMembers" && this.renderAddMember()}
        {selectedRenderPage === "renderDeleteProgramInWeek" &&
          this.renderDeleteProgramInWeek()}
        {selectedRenderPage === "renderChangeEmail" && this.renderChangeEmail()}
        {selectedRenderPage === "renderMemberInfo" && this.renderMemberInfo()}
        {selectedRenderPage === "renderBodyInfo" && this.renderBodyInfo()}
        {selectedRenderPage === "renderMemberEventLog" &&
          this.renderMemberEventLog()}
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, exerciseVideos, challenges, update }) => {
  const { user, status, statusChangeEmail, statusImportMembers } = authUser;
  const { programInWeek, memberInfo, bodyInfo } = exerciseVideos;
  const { memberEventLog } = challenges;
  const { statusUpdateLowImpact, statusUpdateProgramLevel } = update;
  return {
    user,
    status,
    programInWeek,
    memberInfo,
    bodyInfo,
    statusChangeEmail,
    memberEventLog,
    statusUpdateLowImpact,
    statusUpdateProgramLevel,
    statusImportMembers,
  };
};

const mapActionsToProps = {
  importMembers,
  selectProgramInWeek,
  deleteProgramInWeek,
  changeEmail,
  selectMemberInfo,
  selectBodyInfo,
  selectMemberEventLog,
  updateStatusLowImpact,
  updateProgramLevel,
};

export default connect(mapStateToProps, mapActionsToProps)(ImportMembers);
