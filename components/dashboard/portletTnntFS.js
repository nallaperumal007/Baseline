import React from "react";
// import styles from "../../styles/createcom.module.css";
import styles from "./dashboard.module.css";
import PfDashboardHelper from "../../helper/pa/paTnntDashboard";

export default class portlet46 extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      portlet1: [],
      is_active: true,
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
    this.getDocmDashboard();
  }
 

  getDocmDashboard() {
    const {
        tnnt_id,
    } = this.state;

    const filter = {
        proj_id: 4,
        tnnt_id: tnnt_id,
    };
    PfDashboardHelper.getCSStatsSev(filter)
      .then((data) => {
        console.log(data);
        this.setState({
           portlet1: data,
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {      
        portlet1,
    } = this.state;

    return (
      <div>
        <div className={styles.wrapper}>
          <table className={styles.table}>
            <thead>
            <th colSpan={4}>Severity</th>
              <tr>
                <th>Severity</th>
                <th>Total Tickets</th>
                <th>Total open</th>
                <th>Average Closure Time</th>
              </tr>
            </thead>
            <tbody>
              {portlet1.map((t) => (
                <tr>
                  <td>{t.Severity}</td>
                  <td>{t.total}</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    );
}
}
