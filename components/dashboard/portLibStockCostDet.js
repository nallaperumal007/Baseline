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
    this.getCostDetails();
  }

  getCostDetails() {
    const { tnnt_id } = this.state;
    const filter = { tnnt_id, uc_id: 1 };

    PfDashboardHelper.getLibStockCostDetails(filter)
      .then((data) => {
        // Calculate total cost_amount from the 'cost_amount' field
        const totalCount = data.reduce((sum, row) => {
          const cost_amount = parseInt(row.cost_amount, 10); // Use 'cost_amount' instead of 'tot'
          return isNaN(cost_amount) ? sum : sum + cost_amount;
        }, 0);

        this.setState({
          portlet_stock: data,
          totalCount, // Save the total cost_amount as a number
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
                <th colSpan="2">Finance Dashboard</th>
              </tr>
              <tr>
                <th>Charges</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {portlet_stock.map((t, index) => (
                <tr key={index}>
                  <td>{t.cost_name}</td>
                  
                  <td>
                    <a href={` ../../pfmMgmt/pfOrdM1Expense?cost_type=${t.cost_amount}`} target="__blank">
                      {t.cost_amount}
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
