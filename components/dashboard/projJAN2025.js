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
      project_total: ""
    };
    this.state = {
      ...stateData,
    };
  }

  componentDidMount() {
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
      proj_id: 4,
      tnnt_id: tnnt_id,
    };

    PfDashboardHelper.getPortlet51(filter)
      .then((data) => {
        this.setState({
          portlet2: data,
          project_total: this.calculateTotals(data)
        });
      })

    PfDashboardHelper.getPortlet52(filter)
      .then((data) => {
        const totalCount = data.reduce((sum, row) => sum + parseInt(row.total), 0);
        this.setState({
          portlet1: data,
          status: status,
          total: total,
          sq_meter: sq_meter,
          percentage: percentage,
          totalCountF: totalCount,
        });
      })
  }

  calculateTotals = (data) => {
    return data.reduce((totals, item) => {
        totals.btf += parseInt(item.btf, 10);
        totals.ifp += parseInt(item.ifp, 10);
        totals.fc += parseInt(item.fc, 10);
        totals.idp += parseInt(item.idp, 10);
        totals.fdp += parseInt(item.fdp, 10);
        totals.total_per_stage += parseInt(item.total_per_stage, 10);
        totals.total_stall_size += item.total_stall_size || 0; 
        return totals;
    }, { btf: 0, ifp: 0, fc: 0, idp: 0, fdp: 0, total_per_stage: 0, total_stall_size: 0 });
};

  getTotalStagesSum() {
    const portlet2Sum = this.state.portlet2.reduce((sum, row) => sum + parseInt(row.contract_count), 0);
    return portlet2Sum;
  }

  getTotalSqMtrSum() {
    return this.state.portlet2.reduce((sum, row) => sum + (row.stall_size ? parseInt(row.stall_size) : 0), 0);

  }

  render() {
    const { totalCount2, totalCountF, portlet1, portlet2, project_total } = this.state;

    const totalStagesSum = this.getTotalStagesSum();
    const booth = portlet1.length > 0 ? parseInt(portlet1[0].total) : 0;
    const yetToBook = booth - totalStagesSum;


    const totalSqMtrSum = this.getTotalSqMtrSum();
    const boothSqMtr = portlet1.length > 0 ? parseInt(portlet1[0].sq_meter) : 0;
    const yetToBookSqMtr = boothSqMtr - totalSqMtrSum;
    const yetToBookPerct = ((boothSqMtr - totalSqMtrSum) / boothSqMtr) * 100;
    const totalPercentage = ((project_total.total_stall_size / boothSqMtr) * 100).toFixed(2);
    return (
      <div>
        <div className={styles.wrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.table}>
                <th colSpan="9" style={{ textAlign: "center" }}>JAN2025-Expo</th>
              </tr>
              <tr>
                <th>Details</th>
                <th>Food & Drink Processing Expo</th>
                <th>India Dairy Processing Expo</th>
                <th>Food Confluence</th>
                <th>India Food Pack Expo</th>
                <th>Bakers Technology Fair</th>
                <th>Total</th>
                <th>Sq.Mtr</th>
                <th>Percentage (Sq.Mtr)</th>
              </tr>
            </thead>
            <tbody>

              {portlet2.map((row, index) => (
                <tr key={index}>
                  <td>{"Stage: "}{row.stage_name}</td>
                  <td>{row.fdp}</td>
                  <td>{row.idp}</td>
                  <td>{row.fc}</td>
                  <td>{row.ifp}</td>
                  <td>{row.btf}</td>
                  <td>
                    {/* <a href={`../../emMgmt/emContractDet?proj_id=4&status_id=1&stage_id=${row.stage_id}`} target="__blank"> */}
                    {row.total_per_stage}
                    {/* </a> */}
                  </td>
                  <td>{row.total_stall_size == null ? 0 : row.total_stall_size}</td>
                  <td>{((parseInt(row.total_stall_size == null ? 0 : row.total_stall_size) / boothSqMtr) * 100).toFixed(2)}%</td>
                </tr>
              ))}

              <tr>
                <td>Yet to Book</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{yetToBook}</td>
                <td>{yetToBookSqMtr}</td>
                <td>{(yetToBookPerct).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Grand Total</td>
                  <td>{project_total.fdp}</td>
                  <td>{project_total.idp}</td>
                  <td>{project_total.fc}</td>
                  <td>{project_total.ifp}</td>
                  <td>{project_total.btf}</td>
                  <td>{project_total.total_per_stage}</td>
                <td>{project_total.total_stall_size}</td>
                <td>{totalPercentage}%</td>
              </tr>

              {portlet1.map((row, index) => (
                <tr key={index} className={styles.boldRow}>
                  <td >{row.status}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <a href={`../../emMgmt/emStallDet?proj_id=4&rec_status_id=1`} target="__blank">
                      {row.total}
                    </a>
                  </td>
                  <td>{row.sq_meter}</td>
                  {console.log(row.total)}
                  {console.log(row.total)}
                  <td>{((parseInt(row.total) / totalCountF) * 100).toFixed(2)}%</td>

                </tr>
              ))}


            </tbody>
          </table>

        </div>
      </div>
    );
  }
}
