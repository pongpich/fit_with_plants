import React, { Component } from "react";
import './ChallengesDashboard1.css';

import {
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { connect } from "react-redux";

import { getGamification, clearGamification, getChallengeEvent } from "../../redux/dashboard";

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ChallengesDashboard1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: "เลือก season",
      dropdownOpen: false
    };
  }

  componentDidMount() {
    const { season } = this.state;
    this.props.clearGamification();
    this.props.getChallengeEvent();
  }

  componentDidUpdate(prevProps) {

  }

  toggle() {
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen })
  }

  selectSeason(season) {
    this.props.getGamification(season);
    this.setState({ season: season });
  }

  activateLasers() {



  }

  render() {
    const { season, dropdownOpen } = this.state;
    const {
      percentCompleteOfWeightResult,
      percentCompleteOfExerciseComplete,
      percentCompleteOfWeightBonusResult,
      percentCompleteOfWeightTeamComplete,
      percentCompleteOfReducedWeight,
      numberOfMembersInSeason,
      numberOfMembersInEndSeason,
      numberOfMembersNotInGamification,
      numberOfMembersActiveMoreThan1Week,
      challengeEvent
    } = this.props;
    const myStyle = {
      width: { percentCompleteOfWeightResult }
    };


    return (
      <div className="background">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div className="box-background">
                <div className="dropdown">
                  <Dropdown isOpen={dropdownOpen} toggle={() => this.toggle()}>
                    <DropdownToggle style={{ backgroundColor: "white", color: "black" }} caret>{season}</DropdownToggle>
                    <DropdownMenu>
                      {
                        challengeEvent && challengeEvent.map((item, index) => (
                          <DropdownItem onClick={() => this.selectSeason(item.event_name)}>{item.event_name}</DropdownItem>
                        ))
                      }
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="export-dashboard1" >
                  {/* <Button style={{ backgroundColor: "white", color: "black" }} onClick={() => this.activateLasers()}>Export .csv  <i class="fas fa-download"></i></Button> */}
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls1"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText={<h5>Export .csv <i class="fa-solid fa-arrow-up-from-bracket"></i></h5>}
                  />
                </div>
                <br />
                <p className="text-progress">บันทึกน้ำหนักครบ 2 ครั้ง <span className="text-progressRight"> สำเร็จ {percentCompleteOfWeightResult}% </span></p>
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style={{ "width": `${percentCompleteOfWeightResult}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <br />
                <p className="text-progress">ออกกำลังกายครบ 4 วันต่อสัปดาห์ <span className="text-progressRight"> สำเร็จ {percentCompleteOfExerciseComplete}% </span></p>
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style={{ "width": `${percentCompleteOfExerciseComplete}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <br />
                <p className="text-progress">ทีมชั่งน้ำหนักครบ 7 วัน  <span className="text-progressRight"> สำเร็จ {percentCompleteOfWeightBonusResult}% </span></p>
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style={{ "width": `${percentCompleteOfWeightBonusResult}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <br />
                <p className="text-progress">สมาชิกชั่งครบ 2 ครั้ง <span className="text-progressRight"> สำเร็จ {percentCompleteOfWeightTeamComplete}% </span></p>
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style={{ "width": `${percentCompleteOfWeightTeamComplete}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <br />
                <p className="text-progress">น้ำหนักลดลงจากสัปดาห์ที่แล้ว <span className="text-progressRight"> สำเร็จ {percentCompleteOfReducedWeight}% </span></p>
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style={{ "width": `${percentCompleteOfReducedWeight}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="col-md-6">
                    <div className="gamification">
                      <p>จำนวนคนที่เล่น Gamification ใน season นี้</p>
                      <p className="people"> {numberOfMembersInSeason} คน</p>
                    </div>
                  </div>
                  <div class="col-6 col-md-6">
                    <div className="active-season">
                      <p>จำนวนคนที่ Active อยู่ในทีมมากกว่า 1 อาทิตย์</p>
                      <p className="people"> {numberOfMembersActiveMoreThan1Week} คน</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-4">
              <div className="box-number-people">
                <p>จำนวนคนที่อยู่ในทีมจนจบ season</p>
                <p className="people"> {numberOfMembersInEndSeason} คน</p>
                <hr />
                <br />
                <p>จำนวนคนที่ไม่มีทีมจนจบ season</p>
                <p className="people"> {numberOfMembersNotInGamification} คน</p>
              </div>
            </div>
          </div>
        </div>
        <div className="background" style={{ display: 'none' }} >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="box-background">
                  <div className="table-responsive">
                    <table id="table-to-xls1" className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">หัวข้อ</th>
                          <th scope="col" className="text-center">จำนวน</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">บันทึกน้ำหนักครบ 2 ครั้ง</th>
                          <td>{percentCompleteOfWeightResult}%</td>

                        </tr>
                        <tr>
                          <th scope="row">ออกกำลังกายครบ 4 วันต่อสัปดาห์</th>
                          <td> {percentCompleteOfExerciseComplete}%</td>
                        </tr>
                        <tr>
                          <th scope="row">ทีมชั่งน้ำหนักครบ 7 วัน</th>
                          <td>{percentCompleteOfWeightBonusResult}%</td>
                        </tr>
                        <tr>
                          <th scope="row">สมาชิกชั่งครบ 2 ครั้ง</th>
                          <td> {percentCompleteOfWeightTeamComplete}%</td>
                        </tr>
                        <tr>
                          <th scope="row">น้ำหนักลดลงจากสัปดาห์ที่แล้ว</th>
                          <td>{percentCompleteOfReducedWeight}%</td>
                        </tr>
                        <tr>
                          <th scope="row">จำนวนคนที่เล่น Gamification ใน season นี้</th>
                          <td> {numberOfMembersInSeason} คน</td>
                        </tr>
                        <tr>
                          <th scope="row">จำนวนคนที่ Active อยู่ในทีมมากกว่า 1 อาทิตย์</th>
                          <td>{numberOfMembersActiveMoreThan1Week} คน</td>
                        </tr>
                        <tr>
                          <th scope="row">จำนวนคนที่อยู่ในทีมจนจบ season</th>
                          <td>{numberOfMembersInEndSeason} คน</td>
                        </tr>
                        <tr>
                          <th scope="row">จำนวนคนที่ไม่มีทีมจนจบ season</th>
                          <td>{numberOfMembersNotInGamification} คน</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ dashboard }) => {
  const {
    percentCompleteOfWeightResult,
    percentCompleteOfExerciseComplete,
    percentCompleteOfWeightBonusResult,
    percentCompleteOfWeightTeamComplete,
    percentCompleteOfReducedWeight,
    numberOfMembersInSeason,
    numberOfMembersActiveMoreThan1Week,
    numberOfMembersInEndSeason,
    numberOfMembersNotInGamification,
    challengeEvent
  } = dashboard;
  return {
    percentCompleteOfWeightResult,
    percentCompleteOfExerciseComplete,
    percentCompleteOfWeightBonusResult,
    percentCompleteOfWeightTeamComplete,
    percentCompleteOfReducedWeight,
    numberOfMembersInSeason,
    numberOfMembersActiveMoreThan1Week,
    numberOfMembersInEndSeason,
    numberOfMembersNotInGamification,
    challengeEvent
  };
};

const mapActionsToProps = { getGamification, clearGamification, getChallengeEvent };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ChallengesDashboard1);