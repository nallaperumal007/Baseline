import React from "react";
import PfDashboardHelper from "../../helper/pfmMgmt/pfDashboard";
 import styles from "./dashboard.module.css";

export default class Portlet1 extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
            tnnt_id: global.config.tnnt_id,
            username: global.config.username,
            role_id: global.config.user_role,
            portlet1: [],
            portlet2: [],
            is_active: true,
            totalCount: "",
            totalPercentage: "",
            id: "",
            phase: "",
            start_date: "",
            end_date: "",
            completion: "",
            status: "",

            //   yet_to_start: "",
            //   in_progress: "",
            //   for_review: "",
            //   done: "",
            //   discard: "",
            //   on_hold: "",
            //   blocked: "",
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
        const { tnnt_id, phase, start_date, end_date, completion, status } = this.state;
        const filter = {
            user_name: global.config.username,
            tnnt_id: tnnt_id,
        };
        PfDashboardHelper.getPortlet31(filter)
            .then((data) => {
                this.setState({


                    portlet1: data,
                    phase: phase,
                    start_date: start_date,
                    end_date: end_date,
                    completion: completion,
                    status: status,
                    // yet_to_start: yet_to_start,
                    // in_progress: in_progress,
                    // for_review: for_review,
                    // done: done,
                    // discard: discard,
                    // on_hold: on_hold,
                    // blocked: blocked,
                });

            })
            .catch((err) => {
                console.log(err);
            });

        PfDashboardHelper.getPortlet32(filter)
            .then((data) => {
                this.setState({
                    portlet2: data,
                    phase: phase,
                    start_date: start_date,
                    end_date: end_date,
                    completion: completion,
                    status: status,
                    // yet_to_start: yet_to_start,
                    // in_progress: in_progress,
                    // for_review: for_review,
                    // done: done,
                    // discard: discard,
                    // on_hold: on_hold,
                    // blocked: blocked,
                });

            })

            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { portlet1, portlet2, totalCount, totalPercentage } = this.state; // Include totalCount in destructure

        return (
            <div>
                <div className={styles.dashboardwrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.table}>
                                <th colSpan="5" style={{ textAlign: "center", backgroundColor: "#adb0cbaf" }}>Phase Status</th>
                            </tr>
                            <tr>
                                <th>Phase</th>
                                <th>Start Date</th>
                                <th>End Date </th>
                                <th>completion %</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>A&D</td>
                                <td>4-Sep-23</td>
                                <td>15-Sep-23 </td>
                                <td>50%</td>
                                <td>in Progress</td>
                            </tr>
                            <tr>
                                <td>Development</td>
                                <td>11-Sep-23</td>
                                <td>29-Sep-23</td>
                                <td>0%</td>
                                <td>Not Started</td>

                            </tr>
                            <tr>

                                <td>Sit</td>
                                <td>02-Oct-23</td>
                                <td>13-Oct-23</td>
                                <td>0%</td>
                                <td>Not Started</td>
                            </tr>
                            <tr>

                                <td>UAT</td>
                                <td>16-Oct-23</td>
                                <td>03-Nov-23</td>
                                <td>0%</td>
                                <td>Not Started</td>
                            </tr>
                            <tr>
                                <td>Go live Prep</td>
                                <td>06-Nov-23</td>
                                <td>17-Nov-23</td>
                                <td>0%</td>
                                <td>Not Started</td>
                            </tr>
                            <tr>
                                <td>Go live implementation</td>
                                <td>18-Nov-23</td>
                                <td>19-Nov-23</td>
                                <td>0%</td>
                                <td>Not Started</td>
                            </tr>

                            <tr>
                                <td>PGL Support</td>
                                <td>20-Nov-23</td>
                                <td>24-Nov-23</td>
                                <td>0%</td>
                                <td>Not Started</td>
                            </tr>


                            {portlet1.map((row, index) => (
                                <tr key={index}>

                                    {/* <td>{row.phase}</td>
                                    <td>{row.start_date}</td>
                                    <td>{row.end_date}</td>
                                    <td>{row.completion}</td>
                                    <td>{row.status}</td> */}

                                </tr>
                            ))}
                            {portlet2.map((row, index) => (
                                <tr key={index}>

                                    {/* <td>{row.phase}</td>
                                    <td>{row.start_date}</td>
                                    <td>{row.end_date}</td>
                                    <td>{row.completion}</td>
                                    <td>{row.status}</td>
                                     */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
