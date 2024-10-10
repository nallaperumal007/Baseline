import React from "react";
import PfDashboardHelper from "../../helper/pfmMgmt/pfDashboard";
import styles from "./dashboard1.module.css";

export default class Portlet1 extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      portlet1: [],
      portlet2:[],
      is_active: true,
      totalCount: "",
      totalPercentage: "",
      id: "",
      yet_to_start: "",
      in_progress: "",
      for_review: "",
      done: "",
      discard: "",
      on_hold: "",
      blocked: "",
    };
    this.state = {
      ...stateData,
    };
  }

  componentDidMount() {
    const { editable } = this.state;
    const username = global.localStorage.username;

    if (username != null && username !== undefined) {
      this.setState({
        username: username,
      });
    }
    this.getAcCategory();
  }

  getAcCategory() {
    const { tnnt_id, yet_to_start, in_progress, for_review, done, discard, on_hold, blocked } = this.state;
    const filter = {
      user_name: global.config.username,
      tnnt_id: tnnt_id,
    };
    PfDashboardHelper.getPortlet31(filter)
      .then((data) => {
        this.setState({
          portlet1: data,
          yet_to_start: yet_to_start,
          in_progress: in_progress,
          for_review: for_review,
          done: done,
          discard: discard,
          on_hold: on_hold,
          blocked: blocked,
        });
        
      })
      .catch((err) => {
        console.log(err);
      });

      PfDashboardHelper.getPortlet32(filter)
      .then((data) => {
        this.setState({
          portlet2: data,
          yet_to_start: yet_to_start,
          in_progress: in_progress,
          for_review: for_review,
          done: done,
          discard: discard,
          on_hold: on_hold,
          blocked: blocked,
        });
        
      })
      
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { portlet1, portlet2, totalCount, totalPercentage } = this.state; // Include totalCount in destructure

    return (
      <div>
        <div className={styles.wrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.table}>
                <th colSpan="8" style={{ textAlign: "center", backgroundColor: "#adb0cbaf" }}>My Action Items</th>
              </tr>
              <tr>
                <th>Type</th>
                <th>Yet to Start</th>
                <th>In Progress </th>
                <th>For Review</th>
                <th>Done</th>
                <th>Discard</th>
                <th>On Hold </th>
                <th>Blocked</th>
              </tr>
            </thead>
            <tbody>
              {portlet1.map((row, index) => (
                <tr key={index}>
                  <th>Task</th>
                  <td>{row.yet_to_start}</td>
                  <td>{row.in_progress}</td>
                  <td>{row.for_review}</td>
                  <td>{row.done}</td>
                  <td>{row.discard}</td>
                  <td>{row.on_hold}</td>
                  <td>{row.blocked}</td>
                </tr>
              ))}
              {portlet2.map((row, index) => (
                <tr key={index}>
                  <th>Sub Task</th>
                  <td>{row.yet_to_start}</td>
                  <td>{row.in_progress}</td>
                  <td>{row.for_review}</td>
                  <td>{row.done}</td>
                  <td>{row.discard}</td>
                  <td>{row.on_hold}</td>
                  <td>{row.blocked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
