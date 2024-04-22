import React, { Component } from "react";
import './ChallengesDashboard5.css';


import {
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { connect } from "react-redux";

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { getGamification, clearGamification, getChallengeEvent, getMemberInSeason, getDateOfJoiningChallenge } from "../../redux/dashboard";
class ChallengesDashboard5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: "เลือก season",
      dropdownOpen: false,
      first_name: null,
      last_name: null,
      phone: null,
      email: null
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
    this.props.getMumberInSeason(season);
    this.setState({ season: season });

  }

  selectUser_id(user_id, first_name, last_name, phone, email) {
    this.props.getDateOfJoiningChallenge(user_id);
    this.setState({ first_name: first_name, last_name: last_name, phone: phone, email: email });



  }

  render() {
    const { season, dropdownOpen, first_name, last_name, phone, email } = this.state;
    const {
      percentCompleteOfWeightResult,
      challengeEvent,
      memberOfInSeasonResult,
      dateOfJoiningChallengeEachSeason
    } = this.props;
    const myStyle = {
      width: { percentCompleteOfWeightResult }
    };
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="box-background">
                <h5>รายชื่อผู้สมัครคอร์สออนไลน์</h5>
                <div className="dropdownCh-Dashboard5">
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
                <br />
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button"
                  table="table-to-xls5"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText={<h5>Export .csv <i class="fa-solid fa-arrow-up-from-bracket"></i></h5>} />
                <div className="table-responsive">
                  <table id="table-to-xls5" className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">ชื่อ-สกุล <i class='fas fa-angle-down' ></i></th>
                        <th scope="col" className="text-center" >เบอร์โทรศัพท์</th>
                        <th scope="col" className="text-center" >อีเมล</th>
                        <th scope="col" className="text-center" >รอบที่ต่ออายุ <i class='fas fa-angle-down'></i></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        memberOfInSeasonResult && memberOfInSeasonResult.map((item) => {
                          return <tr>
                            <th scope="row" className="text-center color-primary pointer" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.selectUser_id(item.user_id, item.first_name, item.last_name, item.phone, item.email)} > {item.first_name}  {item.last_name}</th>
                            <td className="text-center">{item.phone}</td>
                            <td className="text-center">{item.email}</td>
                            <td className="text-centerColor">{season}</td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* pop up */}


        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog  modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <table className="table  table-borderless">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">ชื่อ-สกุล</th>
                      <th scope="col" className="text-center" >เบอร์โทรศัพท์</th>
                      <th scope="col" className="text-center" >อีเมล</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row" className="text-center  pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">{first_name} {last_name}</td>
                      <td className="text-center">{phone}</td>
                      <td className="text-center">{email}</td>
                    </tr>
                  </tbody>
                </table>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span style={{ fontSize: 50 }} aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">รอบที่ต่ออายุ </th>
                        <th scope="col" className="text-center" >วันที่ต่ออายุ</th>
                      </tr>
                    </thead>
                    <tbody>

                      {

                        dateOfJoiningChallengeEachSeason === null ?
                          <td className="text-center">
                            <div className="spinner-border text-pink" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </td>
                          :
                          dateOfJoiningChallengeEachSeason && dateOfJoiningChallengeEachSeason.map((item) => {
                            let created_at = new Date(item.created_at).toLocaleString("th-TH", { timeZone: "UTC" })
                            created_at = created_at.split(" ");
                            return <tr >

                              <td className="text-center">{item.event_name}</td>
                              <td className="text-center">{
                                created_at[0] !== 'Invalid' ? created_at[0] : "-"
                              }</td>
                            </tr>
                          })
                      }
                    </tbody>
                  </table>
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
    numberOfMembersInEndSeason,
    numberOfMembersNotInGamification,
    challengeEvent,
    memberOfInSeasonResult,
    dateOfJoiningChallengeEachSeason
  } = dashboard;
  return {
    percentCompleteOfWeightResult,
    percentCompleteOfExerciseComplete,
    percentCompleteOfWeightBonusResult,
    percentCompleteOfWeightTeamComplete,
    percentCompleteOfReducedWeight,
    numberOfMembersInSeason,
    numberOfMembersInEndSeason,
    numberOfMembersNotInGamification,
    memberOfInSeasonResult,
    challengeEvent,
    dateOfJoiningChallengeEachSeason
  };
};

const mapActionsToProps = { getGamification, clearGamification, getChallengeEvent, getMumberInSeason: getMemberInSeason, getDateOfJoiningChallenge };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ChallengesDashboard5);