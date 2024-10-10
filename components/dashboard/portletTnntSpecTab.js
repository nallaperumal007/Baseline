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
      portlet1: [],
      portlet2: [],
      portlet3: [],
      portlet4: [],
      is_active: true,
      id: "",
      total_stalls: "",
      status: "",
      total: "",
      sq_meter: "",
      percentage: "",
      totalCount: 0,
      totalPercentage: 0,
      totalCountF: 0,
      totalPercentageF: 0,
      totalCount2: 0,
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
    const { tnnt_id, status, total, sq_meter, percentage } = this.state;
    const filter = {
      proj_id: 1,
      tnnt_id: tnnt_id,
    };
    PfDashboardHelper.getPortlet42(filter)
      .then((data) => {
        const totalCount = data.reduce((sum, row) => sum + parseInt(row.total), 0);
        const totalPercentage = (totalCount > 0) ? 100 : 0;
        this.setState({
          portlet1: data,
          status: status,
          total: total,
          sq_meter: sq_meter,
          percentage: percentage,
          totalCountF: totalCount, // Save the total count as a number

          totalPercentageF: totalPercentage.toFixed(2) + '%',
        });

      })

    PfDashboardHelper.getPortlet43(filter)
      .then((data) => {
        const totalCount2 = data.reduce((sum, row) => sum + parseInt(row.contract_count), 0);
        const totalPercentage = (totalCount2 > 0) ? 100 : 0;
        this.setState({
          portlet2: data,
          status: status,
          total: total,
          sq_meter: sq_meter,
          percentage: percentage,
          totalCount2: totalCount2, // Save the total count as a number

          totalPercentage: totalPercentage.toFixed(2) + '%',
        });

      })

    PfDashboardHelper.getPortlet44(filter)
      .then((data) => {
        this.setState({
          portlet3: data,
          status: status,
          total: total,
          sq_meter: sq_meter,
          percentage: percentage,
        });

      })

    PfDashboardHelper.getPortlet45(filter)
      .then((data) => {
        this.setState({
          portlet4: data,
          status: status,
          total: total,
          sq_meter: sq_meter,
          percentage: percentage,
        });

      })
      .catch((err) => {
        console.log(err);
      });
  }

  getTotalStagesSum() {
    const portlet2Sum = this.state.portlet2.reduce((sum, row) => sum + parseInt(row.contract_count), 0);
    //   const portlet3Sum = this.state.portlet3.reduce((sum, row) => sum + parseInt(row.total), 0);
    //   const portlet4Sum = this.state.portlet4.reduce((sum, row) => sum + parseInt(row.total), 0);
    //  return portlet2Sum + portlet3Sum + portlet4Sum;
    return portlet2Sum;
  }

  getTotalSqMtrSum() {
    return this.state.portlet2.reduce((sum, row) => sum + (row.stall_size ? parseInt(row.stall_size) : 0), 0);

  }

  render() {
    const { totalCount2, totalPercentageF, totalCountF, totalPercentage, totalCount, portlet1, portlet2, portlet3, portlet4, total, sq_meter, percentage } = this.state;
    console.log('aaaaa');
    console.log(totalCount2);
    const totalStagesSum = this.getTotalStagesSum();
    const booth = portlet1.length > 0 ? parseInt(portlet1[0].total) : 0;
    const yetToBook = booth - totalStagesSum;


    const totalSqMtrSum = this.getTotalSqMtrSum();
    const boothSqMtr = portlet1.length > 0 ? parseInt(portlet1[0].sq_meter) : 0;
    const yetToBookSqMtr = boothSqMtr - totalSqMtrSum;
    const yetToBookPerct = ((boothSqMtr - totalSqMtrSum) / boothSqMtr) * 100;



    return (
      <div>
        <div className={styles.wrapper}>
          <div className={styles.Title}>BaBa</div>
          <table className={styles.table}>

            <thead>
              <tr className={styles.table}>
                <th colSpan="4" style={{ textAlign: "center" }}>Ticket Breakdown per Feature</th>
              </tr>
              <tr>
                <th>Tenant</th>
                <th>Tot. Ticket</th>
                <th>Tot. Open</th>  
                <th>Avg.Closure</th>

              </tr>
            </thead>

            <tbody>


             </tbody>
          </table>
        </div>

      </div>
    );
  }
}
