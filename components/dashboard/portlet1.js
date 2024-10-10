import React from "react";
import PfDashboardHelper from "../../helper/pfmMgmt/pfDashboard";
import styles from "./dashboard.module.css";

export default class Portlet1 extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      portlet1: [],
      is_active: true,
      totalCount: "",
      totalPercentage: "",
      id: "",
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
    const { tnnt_id } = this.state;
    const filter = {
      tnnt_id: tnnt_id,
    };
    PfDashboardHelper.getPortlet1(filter)
      .then((data) => {
        
        const totalCount = data.reduce((sum, row) => sum + row.head_count, 0);
        const totalPercentage = data.reduce((sum, row) => sum + row.percentage, 0);

        this.setState({
          portlet1: data,
          totalCount: totalCount,
          totalPercentage: totalPercentage.toFixed(2) + '%'
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { portlet1, totalCount, totalPercentage } = this.state; // Include totalCount in destructure

    return (
      <div>
        <div className={styles.wrapper}>
        <table className={styles.table}>

          {/* <table className={`table ${styles.table}`}> */}
            <thead>
              <tr className={styles.table}>
              {/* <tr style={{borderBottom: " 1px solid rgb(223, 223, 223)"}}> */}
                <th colSpan="3">Active Staff</th>
              </tr>
              <tr>
                <th>Employment Type</th>
                <th>Head Count</th>
                <th >Percentage</th>
              </tr>
            </thead>
            <tbody>
              {portlet1.map((t, index) => (
                <tr key={index}>
                  <td>{t.employment_type}</td>
                  <td>{t.head_count}</td>
                  <td>{t.percentage.toFixed(2)}%</td>
                </tr>
              ))}
              
              <tr>
                <td >Total</td>
                <td>{totalCount}</td>
                <td>{totalPercentage}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
