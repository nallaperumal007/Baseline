import React from "react";
// import styles from "../../styles/createcom.module.css";
import styles from "./dashboard.module.css";
import PfDashboardHelper from "../../helper/pfmMgmt/pfDashboard";

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
    this.getCommDashboard();
  }
 

  getCommDashboard() {
    const {
        tnnt_id,
    } = this.state;

    const filter = {
        tnnt_id: tnnt_id,
    };
    PfDashboardHelper.getPortlet46(filter)
      .then((data) => {
        
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
          <table className={`table ${styles.table}`}>
            <thead>
            <th colSpan={2}>Contacts Dashboard</th>
              <tr>
                <th>Use case</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {portlet1.map((t) => (
                <tr>
                  <td>Invalid Email ID</td>
                  <td>
                    <a href={` ../../comm/commContact?email_stats_id=2`} target="__blank">
                      {t.count_email}
                    </a>
                  </td>
                </tr>
              ))}
              {portlet1.map((t) => (
                <tr>
                  <td>Invalid Whatsapp ID</td>
                  <td>
                    <a href={` ../../comm/commContact?wapp_stats_id=2`} target="__blank">
                      {t.count_wapp}
                    </a>
                  </td>
                </tr>
              ))}
              {portlet1.map((t) => (
                <tr>
                  <td>Unsubscribed Newsletter </td>
                  <td>
                    <a href={` ../../comm/commContact?email_subscribe_id=1`} target="__blank">
                      {t.count_unsubscribed}
                    </a>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    );
}
}
