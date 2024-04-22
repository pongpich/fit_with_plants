import React, { Component } from "react";
import './ChallengesDashboard2.css';


import { connect } from "react-redux";

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { getMembersEachWeekInSeason } from "../../redux/dashboard";
let max_length = [];
let index = [];
let numberMax = null;
let week = null;

class ChallengesDashboard2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: "ตลอดทั้ง season",
      dropdownOpen: false
    };
  }

  componentDidMount() {
    const { season } = this.state;
    const { percentOfMembersEachWeek } = this.state;
    this.props.getMembersEachWeekInSeason();
    this.weekAll(percentOfMembersEachWeek)
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


  weekAll(percentOfMembersEachWeek) {
    percentOfMembersEachWeek && percentOfMembersEachWeek.map((key, value) => {
      max_length.push(key.length);
      numberMax = Math.max(...max_length);
      for (let i = 1; i <= numberMax; i++) {
        index += i;
      }
      week = Array.from(new Set(index))
    })
  }




  render() {


    const { season, dropdownOpen } = this.state;
    const {
      percentCompleteOfWeightResult, percentOfMembersEachWeek, weekAll
    } = this.props;
    const myStyle = {
      width: { percentCompleteOfWeightResult }
    };

    this.weekAll(percentOfMembersEachWeek);

    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="box-background">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button"
                  table="table-to-xls2"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText={<h5>Export .csv <i class="fa-solid fa-arrow-up-from-bracket"></i></h5>} />
                <div className="table-responsive">
                  <table id="table-to-xls2" className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center"></th>
                        {
                          week && week.map((key) => {
                            return <th scope="col" className="text-centerColor"> สัปดาห์ที่ {key}</th>
                          })
                        }

                      </tr>
                    </thead>
                    <tbody>
                      {
                        percentOfMembersEachWeek === 0 ?
                          <td className="text-center">
                            <div className="spinner-border text-pink" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </td>
                          :
                          percentOfMembersEachWeek && percentOfMembersEachWeek.map((item, index) => {
                            return <tr>
                              <th scope="row" className="text-centerColor">SEASON {index + 1}</th>
                              {
                                item && item.map((val) => {
                                  return <td>{val}%</td>
                                })
                              }
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
    percentOfMembersEachWeek
  } = dashboard;
  return {
    percentOfMembersEachWeek,
  };
};

const mapActionsToProps = { getMembersEachWeekInSeason };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ChallengesDashboard2);