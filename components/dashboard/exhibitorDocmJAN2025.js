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
    this.getDocmDashboard();
  }
 

  getDocmDashboard() {
    const {
        tnnt_id,
    } = this.state;

    const filter = {
        proj_id: "7,8,9,10,11",
        tnnt_id: tnnt_id,
    };
    PfDashboardHelper.getExhibDocmStats(filter)
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
          <table className={styles.table}>
            <thead>
            <th colSpan={3}>Documents Dashboard</th>
              <tr>
                <th>Document Name</th>
                <th>Submitted</th>
                <th>Approved</th>
              </tr>
            </thead>
            <tbody>
              {portlet1.map((t) => (
                <tr>
                  <td>Logo</td>
                  <td>{t.file_logo}</td>
                  <td>0</td>
                </tr>
              ))}
              {portlet1.map((t) => (
                <tr>
                  <td>Product Catalougue</td>
                  <td>{t.file_product_catalogue}</td>
                  <td>0</td>
                </tr>
              ))}
              {portlet1.map((t) => (
                <tr>
                  <td>Promotional Flier</td>
                  <td>{t.file_promo_flier}</td>
                  <td>0</td>
                </tr>
              ))}
              {portlet1.map((t) => (
                <tr>
                  <td>Ad Design</td>
                  <td>{t.file_ad_design}</td>
                  <td>0</td>
                </tr>
              ))}
              {portlet1.map((t) => (
                <tr>
                  <td>Promotional Videos</td>
                  <td>{t.file_promo_videos}</td>
                  <td>0</td>
                </tr>
              ))}
              {portlet1.map((t) => (
                <tr>
                  <td>Stand Design</td>
                  <td>{t.file_stand_design}</td>
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
