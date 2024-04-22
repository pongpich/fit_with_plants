import React, { Component } from "react";
import ChallengesDashboard1 from '../components/dashboard/ChallengesDashboard1';
import ChallengesDashboard2 from '../components/dashboard/ChallengesDashboard2';
import ChallengesDashboard3 from '../components/dashboard/ChallengesDashboard3';
import ChallengesDashboard4 from '../components/dashboard/ChallengesDashboard4';
import ChallengesDashboard5 from '../components/dashboard/ChallengesDashboard5';

import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) { // เช็คว่า login ยัง
      if (user !== null && user.password !== null && user.authorization === "member") { // ถ้าเป็น member ธรรมดาจะถูกไม่สามารถเข้าหน้านี้ได้ (จะถูกส่งไปหน้า login)
        this.props.history.push('/login');
      }
    } else {
      this.props.history.push('/login');
    }
  }

  componentDidUpdate(prevProps) {

  }

  render() {
    return (
      <div>
        <ChallengesDashboard1 />
        <ChallengesDashboard2 />
        <ChallengesDashboard3 />
        <ChallengesDashboard4 />
        <ChallengesDashboard5 />
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user } = authUser;
  return { user };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Dashboard);
