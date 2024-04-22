import React, { Component } from "react";
import './ChallengesDashboard3.css';


import {
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { connect } from "react-redux";

import { getBestClipInSeason } from "../../redux/dashboard";

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ChallengesDashboard3 extends Component {


  componentDidMount() {

    this.props.getBestClipInSeason();

  }






  render() {
    const {
      bestClipInSeason
    } = this.props;

    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="box-background">
                <br />
                <h5 className="text-center">คลิปที่คนสามารถลดน้ำหนักได้มากที่สุด</h5>
                <br />
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button"
                  table="table-to-xls3"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText={<h5>Export .csv <i class="fa-solid fa-arrow-up-from-bracket"></i></h5>} />
                <div className="table-responsive">
                  <table id="table-to-xls3" className="table table-bordered">
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
                        bestClipInSeason && bestClipInSeason.map((key) => {
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
    bestClipInSeason, worstClipInSeason
  } = dashboard;
  return {
    bestClipInSeason, worstClipInSeason
  };
};

const mapActionsToProps = { getBestClipInSeason };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ChallengesDashboard3);