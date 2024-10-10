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
                <div className={styles.wrapper}>

                    <div className={styles.heading}>
                        <h4>Project Metrics RAC</h4>
                    </div>
                    <div className={styles.text}>
                        <h5>Key Metrics:</h5>
                        <h5>Current Phase:</h5>
                    </div>

                    <div className={styles.label}>
                        <div>
                            Cost

                        </div>

                        <div>
                            Schedule
                        </div>

                        <div>
                            Scope
                        </div>

                        <div>
                            A&D
                        </div>

                    </div>

                    <div className={styles.label_button}>
                        <div>
                        <button>G</button>
                    </div>
                    <div>
                        <button>G</button>
                    </div>
                    <div>
                        <button>G</button>
                    </div>

                    <div>
                        <button>G</button>
                    </div>

                    </div>
</div>

                    {/* {portlet1.map((row, index) => (
                                <tr key={index}>

                                <td>{row.phase}</td>
                                    <td>{row.start_date}</td>
                                    <td>{row.end_date}</td>
                                    <td>{row.completion}</td>
                                    <td>{row.status}</td> 

                                </tr>
                            ))}
                            {portlet2.map((row, index) => (
                                <tr key={index}>

                                  <td>{row.phase}</td>
                                    <td>{row.start_date}</td>
                                    <td>{row.end_date}</td>
                                    <td>{row.completion}</td>
                                    <td>{row.status}</td>
                                    
                                </tr>
                            ))} */}

                </div>
          

        );
    }
}
