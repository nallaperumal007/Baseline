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
      totalCount: 0, // Initialize totalCount as a number
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
    const filter = {
      com_id: 1,
    };
    PfDashboardHelper.getPortlet36(filter)

      .then((data) => {
       

        const totalCount = data.reduce((sum, row) => sum + parseInt(row.tot), 0);
        const totalPercentage = data.reduce((sum, row) => sum + parseInt(row.tot), 0);
       

        this.setState({
          portlet34: data,
          totalCount: totalCount, // Set totalCount correctly
          // totalCount: Number(totalCount).toFixed(2), // Set totalCount correctly
         // totalPercentage: totalPercentage.toFixed(2) + '%'
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
                <th colSpan="3">Clients By Country</th>
              </tr>
              <tr>
                <th>Country</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {portlet34.map((t, index) => (
                <tr key={index}>
                  <td>{t.country_name}</td>
                  <td>
                    <a href={` ../../emMgmt/emCltDet?country_id=${t.country_id}`} target="__blank">
                      {t.tot}
                    </a>
                  </td>
                  <td>{((parseInt(t.tot) / totalCount) * 100).toFixed(2)}%</td>
                </tr>
              ))}

              <tr>
                <td>Total</td>
                
                <td>{totalCount}</td> {/* Display totalCount as is */}
                
                <td>{totalPercentage}</td> {/* Display calculated totalPercentage */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
