import React from "react";
import PfDashboardHelper from "../../helper/pfmMgmt/pfDashboard";
import styles from "./dashboard.module.css";

export default class Portlet3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      portlet49: [],
      is_active: true,
      totalCount: 0,
      id: "",
    };
  }

  componentDidMount() {
    const username = global.localStorage.username;

    if (username) {
      this.setState({ username });
    }
    this.getStatus();
  }

  getStatus() {
    const { tnnt_id } = this.state;
    const filter = { tnnt_id, uc_id: 1 };

    PfDashboardHelper.getLibOrderTypeStats(filter)
      .then((data) => {
        // Calculate total count from the 'count' field
        const totalCount = data.reduce((sum, row) => {
          const count = parseInt(row.count, 10);
          return isNaN(count) ? sum : sum + count;
        }, 0);

        this.setState({
          portlet49: data,
          totalCount, // Save the total count as a number
        });
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }

  render() {
    const { portlet49, totalCount } = this.state;

    return (
      <div>
        <div>
          <table className={styles.table}>
            <thead>
              <tr className={styles.table}>
                <th colSpan="2">Order Type Status</th>
              </tr>
              <tr>
                <th>Status</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {portlet49.map((t, index) => (
                <tr key={index}>
                  <td>{t.option_name}</td>
                  <td>
                    <a href={` ../../pfmMgmt/pfOrdM1Det?ord_type=${t.ord_type}`} target="__blank">
                      {t.count}
                    </a>
                  </td>
                </tr>
              ))}

              <tr>
                <td>Total</td>
                <td>{totalCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
