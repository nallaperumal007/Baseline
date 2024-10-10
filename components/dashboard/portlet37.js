import React from "react";
import PfDashboardHelper from "../../helper/pfmMgmt/pfDashboard";
import styles from "./dashboard.module.css";

export default class Portlet3 extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      portlet34: [],
      is_active: true,
      totalCount: 0,
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
    PfDashboardHelper.getPortlet37(filter)
      .then((data) => {
        const totalCount = data.reduce((sum, row) => sum + parseInt(row.yes) + parseInt(row.no), 0);
        const totalPercentage = (totalCount > 0) ? 100 : 0; // Total percentage should be 100% if there's data
        this.setState({
          portlet34: data,
          totalCount: Number(totalCount).toFixed(2),
          totalPercentage: totalPercentage.toFixed(2) + '%',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { portlet34, totalCount, totalPercentage } = this.state;

    return (
      <div>
        <div className={styles.wrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.table}>
                <th colSpan="3">Exhibitor Account Status</th>
              </tr>
              <tr>
                <th>Has Exhibitor Account</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {portlet34.map((t, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>Yes</td>
                    <td>{t.yes}</td>
                    <td>{((parseInt(t.yes) / totalCount) * 100).toFixed(2)}%</td>
                  </tr>
                  <tr>
                    <td>No</td>
                    <td>{t.no}</td>
                    <td>{((parseInt(t.no) / totalCount) * 100).toFixed(2)}%</td>
                  </tr>
                </React.Fragment>
              ))}
              <tr>
                <td>Total</td>
                <td>{Number(totalCount)}</td>
                <td>{totalPercentage}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
