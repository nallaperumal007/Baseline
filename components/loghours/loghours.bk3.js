import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";

import styles from "./loghours.module.css";
import CustomInput from "../customInput/customInput";
import ProjectHelper from "../../helper/project";
import LoghoursHelper from "../../helper/loghours";
import TaskHelper from "../../helper/task";
import moment from "moment";

export default class Timesheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate:
                props.data?.date == undefined || props.editable == false
                    ? props.data == undefined || props.editable == false
                        ? new Date()
                        : new Date(props.data)
                    : new Date(props.data?.date),
            billing: [
                { id: 1, bill: "Billable" },
                { id: 2, bill: "Non-Billable" },
            ],
            user: [{ id: 1, user: "ME" }],
            work_items: [],
            selectedBill:
                props.data?.billing == undefined || props.editable == false
                    ? undefined
                    : props.data?.billing,
            selectedUser:
                props.data?.user_name == undefined || props.editable == false
                    ? undefined
                    : 1,
            selectedWorkItems:
                props.data?.work_items == undefined || props.editable == false
                    ? undefined
                    : props.data?.work_items,
            hours:
                props.data?.loghours == undefined || props.editable == false
                    ? ""
                    : props.data?.loghours,
            description:
                props.data?.description == undefined || props.editable == false
                    ? ""
                    : props.data?.description,
            task_id: 
                props.data?.task_id == undefined || props.editable == false
                ? ""
                : props.data?.task_id,
            username: "",
            editable: props.editable,
            is_loading: false,
        };
    }

    componentDidMount() {
        const username = global.localStorage.username;

        if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
             this.getTask();
        }
    }

    getTask() {
        TaskHelper.get()
            .then((data) => {
                this.setState({ work_items: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async add() {
        const {
            currentDate,
            selectedUser,
            selectedBill,
            selectedWorkItems,
            hours,
            description,
            username,
            task_id,
        } = this.state;

        try {
            const alertInitial = "";
            let alertText = alertInitial;


            if (selectedUser === undefined) {
                alertText += ". User\n";
            }

            if (selectedBill === undefined) {
                alertText += ". Billing\n";
            }

            if (selectedWorkItems === undefined) {
                alertText += ". Work Items\n";
            }

            if (hours === "") {
                alertText += ". Hours\n";
            } else if (hours > 8) {
                alertText += ". Log hours cannot be more than 8 hrs\n";
            }

            if (description === "") {
                alertText += ". Description\n";
            }

            if (alertText !== alertInitial) {
                Swal.fire({
                    title: "Fill these fields:\n",
                    html:
                        '<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' +
                        alertText +
                        "</pre>",
                    confirmButtonColor: Colors.primaryColor,
                    width: Colors.width,
                    allowOutsideClick: false,
                });
                return;
            }

            const data = {
                task_id: task_id,
                user_name: username,
                work_items: selectedWorkItems,
                date: moment(currentDate).format("YYYY-MM-DD"),
                hours: hours,
                billing_status: selectedBill,
                description: description,
            };
            this.setState({ is_loading: true });
            LoghoursHelper.create(data)
                .then((data) => {
                    if (data.code == 200) {
                        this.props.getLog();
                        Swal.fire({
                            text: "Log Hours is Successfully Updated!",
                            confirmButtonColor: Colors.primaryColor,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.props.setVisibility(false);
                        this.setState({ is_loading: false });
                    } else if (data.code === 101) {
                        Swal.fire({
                            text: "Error",
                            confirmButtonColor: Colors.red,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.setState({ is_loading: false });
                    } else {
                        Swal.fire({
                            text: data.msg,
                            confirmButtonColor: Colors.red,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.setState({ is_loading: false });
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        text: err,
                        confirmButtonColor: Colors.red,
                        width: Colors.width,
                        allowOutsideClick: false,
                    });
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    }

    async update() {
        const {
            currentDate,
            selectedUser,
            selectedBill,
            selectedWorkItems,
            hours,
            description,
            username,
            task_id,
        } = this.state;

        try {
            const alertInitial = "";
            let alertText = alertInitial;

            if (selectedProject === "") {
                alertText += ". Project\n";
            }

            if (selectedUser === undefined) {
                alertText += ". User\n";
            }

            if (selectedBill === undefined) {
                alertText += ". Billing\n";
            }

            if (selectedWorkItems === undefined) {
                alertText += ". Work Items\n";
            }

            if (hours === "") {
                alertText += ". Hours\n";
            } else if (hours > 8) {
                alertText += ". Log hours cannot be \nmore than 8 hrs\n";
            }

            if (description === "") {
                alertText += ". Description\n";
            }

            if (alertText !== alertInitial) {
                Swal.fire({
                    title: "Fill these fields:\n",
                    html:
                        '<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' +
                        alertText +
                        "</pre>",
                    confirmButtonColor: Colors.primaryColor,
                    width: Colors.width,
                    allowOutsideClick: false,
                });
                return;
            }

            const data = {
                log_id: this.props.data?.log_id,
                task_id: task_id,
                user_name: username,
                work_items: selectedWorkItems,
                date: moment(currentDate).format("YYYY-MM-DD"),
                hours: hours,
                billing_status: selectedBill,
                description: description,
            };
            this.setState({ is_loading: true });
            LoghoursHelper.updateLog(data)
                .then((data) => {
                    if (data.code == 200) {
                        this.props.getLog();
                        Swal.fire({
                            text: "Log Hours is Successfully Updated!",
                            confirmButtonColor: Colors.primaryColor,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.props.setVisibility(false);
                        this.setState({ is_loading: false });
                    } else if (data.code === 101) {
                        Swal.fire({
                            text: "Error",
                            confirmButtonColor: Colors.red,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.setState({ is_loading: false });
                    } else {
                        Swal.fire({
                            text: data.msg,
                            confirmButtonColor: Colors.red,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.setState({ is_loading: false });
                        alert(data.msg);
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        text: "big error",
                        confirmButtonColor: Colors.red,
                        width: Colors.width,
                        allowOutsideClick: false,
                    });
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    }

    onChangeHandler = (e) => {

        const index = e.target.selectedIndex;
        const optionElement = e.target.childNodes[index];
        const optionElementId = optionElement.getAttribute('id');

        this.setState({ selectedWorkItems: e.target.value,
        task_id: optionElementId,})
    }

    render() {
        const { setVisibility } = this.props;
        const {
            billing,
            currentDate,
            project,
            user,
            selectedUser,
            selectedBill,
            selectedWorkItems,
            work_items,
            hours,
            description,
            editable,
            task_id,
            is_loading
        } = this.state;
        return (
            <div className={styles.mainWrapper}>
                		{is_loading && (
	                    <div className={"loadingWrapper"}>
	                        <div className={"innerLoadingWrapper"}>
	                            <div class="bouncing-loader">
	                                <div></div>
	                                <div></div>
	                                <div></div>
	                            </div>
	                        </div>
	                    </div>
	                )}
                <div
                    className={styles.wrapper}
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src="/assets/close-red.png"
                        className={styles.closeButton}
                        onClick={() => setVisibility(false)}
                    />
                    <p className={styles.title}>Add Log Hours</p>

                    <div className={styles.inputAlignment}>
                        <p>User:</p>
                        <select
                            value={selectedUser}
                            onChange={(e) =>
                                this.setState({
                                    selectedUser: e.target.value,
                                })
                            }
                        >
                            <option value={0} disabled selected>
                                {"Select Users"}
                            </option>
                            {user.map((u) => (
                                <option value={u.id}>{u.user}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputAlignment}>
                        <p>Work Items:</p>
                        {editable ? (
                            <div className={styles.inputCustom}>
                                <CustomInput
                                    value={selectedWorkItems}
                                    onChange={(e) =>
                                        this.setState({
                                            selectedWorkItems: e.target.value,
                                        })
                                    }
                                    disabled
                                />
                            </div>
                        ) : (
                            <select
                                value={selectedWorkItems}
                                onChange={(e) =>
                                    this.onChangeHandler(e)
                                    // this.setState({
                                    //     selectedWorkItems: e.target.value,
                                    //     task_id: e.target.id,
                                    // })
                                }
                            >
                                <option value={0} disabled selected>
                                    {"Select Work Items"}
                                </option>
                                {work_items.map((p) => (
                                    <option value={p.task_name} id={p.task_id}>
                                        {p.task_name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className={styles.inputAlignment}>
                        <p>Date:</p>
                        <div className={styles.inputCustom}>
                            <DatePicker
                                className={styles.date}
                                dateFormat="dd-MM-yyyy"
                                selected={currentDate}
                                onChange={(e) =>
                                    this.setState({ currentDate: e })
                                }
                            />
                        </div>
                    </div>
                    <div className={styles.inputAlignment}>
                        <p className={styles.heading}>Hours:</p>
                        <div className={styles.inputCustom}>
                            <CustomInput
                                type="number"
                                value={hours}
                                onChange={(e) =>
                                    this.setState({
                                        hours: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className={styles.inputAlignment}>
                        <p>Billing Status:</p>
                        <select
                            value={selectedBill}
                            onChange={(e) =>
                                this.setState({
                                    selectedBill: e.target.value,
                                })
                            }
                        >
                            <option value={0} disabled selected>
                                {"Select Billing"}
                            </option>
                            {billing.map((b) => (
                                <option value={b.bill}>{b.bill}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputAlignment}>
                        <p className={styles.heading}>Description:</p>
                        <div className={styles.inputCustom}>
                            <CustomInput
                                inputType={"textarea"}
                                placeholder="Type your description here"
                                value={description}
                                onChange={(e) =>
                                    this.setState({
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className={styles.button}>
                        {editable ? (
                            <button
                                className={`button`}
                                onClick={() => {
                                    this.update();
                                }}
                            >
                                {"Update"}
                            </button>
                        ) : (
                            <button
                                className={`button`}
                                onClick={() => {
                                    this.add();
                                }}
                            >
                                {"Add"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
