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
      totalPercentage: 0,
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
    const {tnnt_id} = this.state;
    const filter = {
      tnnt_id: tnnt_id,
    };
    PfDashboardHelper.getPortlet38(filter)
      .then((data) => {
        const totalCount = data.reduce((sum, row) => sum + parseInt(row.count), 0);
        const totalPercentage = (totalCount > 0) ? 100 : 0; 
        this.setState({
          portlet34: data,
          totalCount: totalCount, // Save the total count as a number
          totalPercentage: totalPercentage.toFixed(2) + '%',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { portlet34, totalCount, totalPercentage } = this.state;

    // Calculate total percentage dynamically
    // const totalPercentage = portlet34.reduce((sum, t) => sum + (parseInt(t.count) / totalCount) * 100, 0).toFixed(2);


    return (
      <div>
        <div className={styles.wrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.table}>
                <th colSpan="4">Tickets Outstanding Status</th>
              </tr>
              <tr>
                <th>Day</th>
                <th>Raised</th>
                <th>Closed</th>
                <th>Outstanding</th>
              </tr>
            </thead>
            <tbody>
              {portlet34.map((t, index) => (
                <tr key={index}>
                  <td>{t.day}</td>
                  <td>
                  <a href={`/pfmMgmt/pfCSDet/?rec_raised_date=1`} target="__blank">
                      {t.raised}
                   </a>
                   </td>
                  <td>{t.closed}</td>
                  <td>{t.outstanding}</td>
                  {/* <td>{((parseInt(t.count) / totalCount) * 100).toFixed(2)}%</td> */}
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
