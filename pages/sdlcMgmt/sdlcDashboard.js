import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/dashboard.module.css";
import SideMenu from "../../components/sideMenu/sideMenu";
import SdlcDashHelper from "../../helper/sdlcMgmt/sdlcDashboard";
import SdlcClientHelper from "../../helper/sdlcMgmt/sdCltDet";
import SdlcProjectHelper from "../../helper/sdlcMgmt/sdProjDet";
import Head from "../../components/head";

export default class SdlcDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr_client: [],
            arr_project: [],
            arr_module: [],
            arr_feature_us: [],
            arr_feature_bug: [],
            arr_userstory: [],
            arr_dropdown_client: [],
            arr_dropdown_project: [],
            id_selectedClient: undefined,
            id_selectedProject: undefined,
            tnnt_id: global.config.tnnt_id,
        };
    }

    componentDidMount() {
        const username = global.config.username;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
        }
        this.getDashboardRecords();
        this.getClientDropdown();
        this.getProjectDropdown();
    }

    getClientDropdown() {
        const { tnnt_id } = this.state;

        const filter = {
            tnnt_id: tnnt_id
        }

        SdlcClientHelper.getForDropDown(filter)
            .then((data) => {
                this.setState({ arr_dropdown_client: data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getProjectDropdown(clt_id) {
        const { tnnt_id } = this.state;

        const filter = {
            clt_id: clt_id,
            tnnt_id: tnnt_id
        }

        SdlcProjectHelper.getForDropDown(filter)
            .then((data) => {
                this.setState({ arr_dropdown_project: data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getDashboardRecords() {
        const { tnnt_id } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
        }

        this.getBreakdownHelper(filter);
    }

    getData() {
        const {
            id_selectedClient,
            id_selectedProject,
            tnnt_id,
        } = this.state;

        const filter = {
            clt_id: id_selectedClient,
            proj_id: id_selectedProject,
            tnnt_id: tnnt_id,
        }

        this.getBreakdownHelper(filter);
    }

    getBreakdownHelper(filter) {

        SdlcDashHelper.getBreakdownClient(filter)
            .then((data) => {
                this.setState({ arr_client: data })
            })
            .catch((err) => {
                console.log(err);
            })

        SdlcDashHelper.getBreakdownProject(filter)
            .then((data) => {
                this.setState({ arr_project: data })
            })
            .catch((err) => {
                console.log(err);
            })

        SdlcDashHelper.getBreakdownModule(filter)
            .then((data) => {
                this.setState({ arr_module: data })
            })
            .catch((err) => {
                console.log(err);
            }) 
    }

    handleClearFilter = () => {
        this.setState({
            id_selectedClient: undefined,
            id_selectedProject: undefined,
        }, () => {
            this.getDashboardRecords();
        });
    }

    render() {
        const {
            arr_client,
            arr_project,
            arr_module,
            arr_dropdown_client,
            arr_dropdown_project,
            id_selectedClient,
            id_selectedProject,
        } = this.state;

        return (
            <div>
                <SideMenu tag="sdlc" subTag="SdlcDashboard" >
                    <Head title="Dashboard" />
                    <div className={styles.wrapper}>
                        <div className={styles.wrapper}>
                            <p className={styles.title}>Selection Criteria:</p>
                            <div className={styles.rowAlignment}>
                                <div className={styles.inputAlignment}>
                                    <p>Client:</p>
                                    <select
                                        value={id_selectedClient === undefined ? 0 : id_selectedClient}
                                        onChange={(e) => {
                                            this.getProjectDropdown(e.target.value),
                                                this.setState({
                                                    id_selectedClient: e.target.value,
                                                })
                                            }
                                        }
                                    >
                                        <option value={0} disabled selected>
                                            {"Select Client"}
                                        </option>
                                        {arr_dropdown_client.map((p) => (
                                            <option value={p.clt_id}>
                                                {p.clt_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.inputAlignment}>
                                    <p>Project:</p>
                                    <select
                                        value={id_selectedProject === undefined ? 0 : id_selectedProject}
                                        onChange={(e) =>
                                            this.setState({
                                                id_selectedProject: e.target.value,
                                            })
                                        }
                                    >
                                        <option value={0} disabled selected>
                                            {"Select Project"}
                                        </option>
                                        {arr_dropdown_project.map((p) => (
                                            <option value={p.proj_id}>
                                                {p.proj_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.filterbutton}>
                                <button className={`button`} onClick={() => this.getData()}>
                                    {"Submit"}
                                </button>
                                <button className={`button`} onClick={() => this.handleClearFilter()}>
                                    {"Clear"}
                                </button>
                            </div>
                        </div>
                        <h4>Breakdown by Client Details</h4>
                        <table className={`table ${styles.tablesdlc}`}>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Client ID</th>
                                    <th>Client Name</th>
                                    <th>Total Project Count</th>
                                    <th>To-do Count</th>
                                    <th>Progress Count</th>
                                    <th>Done Count</th>
                                    <th>Discard Count</th>
                                    <th>On-hold Count</th>
                                    <th>Blocked Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arr_client.map((a, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{a.clt_id}</td>
                                        <td>{a.clt_name}</td>
                                        <td>{a.proj_count}</td>
                                        <td>{a.todo_count}</td>
                                        <td>{a.progress_count}</td>
                                        <td>{a.done_count}</td>
                                        <td>{a.discard_count}</td>
                                        <td>{a.onhold_count}</td>
                                        <td>{a.blocked_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.wrapper}>
                        <h4>Breakdown by Project Details</h4>
                        <table className={`table ${styles.tablesdlc}`}>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Project ID</th>
                                    <th>Project Name</th>
                                    <th>Total Module Count</th>
                                    <th>To-do Count</th>
                                    <th>Progress Count</th>
                                    <th>Done Count</th>
                                    <th>Discard Count</th>
                                    <th>On-hold Count</th>
                                    <th>Blocked Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arr_project.map((a, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{a.proj_id}</td>
                                        <td>{a.proj_name}</td>
                                        <td>{a.module_count}</td>
                                        <td>{a.todo_count}</td>
                                        <td>{a.progress_count}</td>
                                        <td>{a.done_count}</td>
                                        <td>{a.discard_count}</td>
                                        <td>{a.onhold_count}</td>
                                        <td>{a.blocked_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.wrapper}>
                        <h4>Breakdown by Module Details</h4>
                        <table className={`table ${styles.tablesdlc}`}>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Module ID</th>
                                    <th>Module Name</th>
                                    <th>Total Feature Count</th>
                                    <th>To-do Count</th>
                                    <th>Progress Count</th>
                                    <th>Done Count</th>
                                    <th>Discard Count</th>
                                    <th>On-hold Count</th>
                                    <th>Blocked Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arr_module.map((a, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{a.mod_id}</td>
                                        <td>{a.mod_name}</td>
                                        <td>{a.feature_count}</td>
                                        <td>{a.todo_count}</td>
                                        <td>{a.progress_count}</td>
                                        <td>{a.done_count}</td>
                                        <td>{a.discard_count}</td>
                                        <td>{a.onhold_count}</td>
                                        <td>{a.blocked_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SideMenu>
            </div>
        );
    }
}
