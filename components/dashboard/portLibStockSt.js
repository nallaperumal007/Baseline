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
      portlet_stock: [],
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

    PfDashboardHelper.getLibStockStatus(filter)
      .then((data) => {
        // Calculate total com_count from the 'com_count' field
        const totalCount = data.reduce((sum, row) => {
          const com_count = parseInt(row.com_count, 10); // Use 'com_count' instead of 'tot'
          return isNaN(com_count) ? sum : sum + com_count;
        }, 0);

        this.setState({
          portlet_stock: data,
          totalCount, // Save the total com_count as a number
        });
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }

  render() {
    const { portlet_stock, totalCount } = this.state;

    return (
      <div>
        <div>
          <table className={styles.table}>
            <thead>
              <tr className={styles.table}>
                <th colSpan="2">Stock Stats</th>
              </tr>
              <tr>
                <th>Component</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {portlet_stock.map((t, index) => (
                <tr key={index}>
                  <td>{t.com_name}</td>
                  
                  <td>
                    <a href={` ../../pfmMgmt/pfStockM1Det?stock_name=${t.com_name}`} target="__blank">
                      {t.com_count}
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
