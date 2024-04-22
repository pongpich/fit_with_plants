import React, { Component } from "react";
import './ChallengesDashboard4.css';


import {
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { connect } from "react-redux";

import { getWorstClipInSeason } from "../../redux/dashboard";

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ChallengesDashboard3 extends Component {


  componentDidMount() {
    this.props.getWorstClipInSeason();

  }






  render() {
    const {
      worstClipInSeason
    } = this.props;


    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="box-background">
                <br />
                <h5 className="text-center">คลิปที่คนสามารถลดน้ำหนักได้น้อยที่สุด</h5>
                <br />

                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button"
                  table="table-to-xls4"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText={<h5>Export .csv <i class="fa-solid fa-arrow-up-from-bracket"></i></h5>} />

                <div className="table-responsive">
                  <table id="table-to-xls4" className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" className="text-centerColor">season</th>
                        <th scope="col " className="text-centerColor" >อก</th>
                        <th scope="col " className="text-centerColor" >หลัง</th>
                        <th scope="col " className="text-centerColor" >แขน</th>
                        <th scope="col " className="text-centerColor" >ขา</th>
                        <th scope="col " className="text-centerColor" >Cardio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        worstClipInSeason && worstClipInSeason.map((key) => {
                          return <tr>
                            <th scope="row" className="text-center">{key.event_name}</th>
                            <td>{key.chest_focus}</td>
                            <td>{key.back_focus}</td>
                            <td>{key.arm_focus}</td>
                            <td>{key.leg_focus}</td>
                            <td>{key.cardio}</td>
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
    worstClipInSeason
  } = dashboard;
  return {
    worstClipInSeason
  };
};

const mapActionsToProps = { getWorstClipInSeason };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ChallengesDashboard3);