import React from "react";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./gridViewLog.module.css";

//import Loghours from "../loghours/loghours";
import Loghours from "../timeMgmt/timesheetModel";

//import LoghoursHelper from "../../helper/loghours";
import LoghoursHelper from "../../helper/timeMgmt/tsTimesheet";
import moment from "moment";
import {
    startOfWeek,
    endOfWeek,
    startOfMonth,
    isWeekend,
    getWeeksInMonth,
} from "date-fns";

export default class GridView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logVisibility: false,
            periodical: [
                { id: 1, name: "Daily" },
                { id: 2, name: "Weekly" },
                { id: 3, name: "Monthly" },
            ],
            selectedPeriodical: 1,
            logDay: [],
            username: "",
            date: "",
            user_log: "",
            total_hours: "",
            weekOfMonth: "",
            monthWeekHours: [],
            monthHours: [],
            hoursPerDay: [],
        };

        //Get dates of month
        var numOfDays = moment(new Date(), "YYYY-MM").daysInMonth();
        var year = new Date().getFullYear();
        var month = new Date().getMonth();
        this.days = new Array();

        for (var i = 0; i < numOfDays; i++) {
            this.days.push(
                moment(new Date(year, month, i + 1)).format("DD-MMM-YYYY")
            );
        }

        //get the weeks of month
        this.weekly = new Array();
        const totalWeeks = getWeeksInMonth(new Date());
        const weekStart = moment(startOfMonth(new Date())).week() - 1;

        for (var i = 1, j = 0; i <= totalWeeks; i++, j++) {
            this.weekly.push({ week: "Week " + i, week_no: weekStart + j });
        }

        //get the dates of current week
        this.start = startOfWeek(new Date());
        this.end = endOfWeek(new Date());
        this.weekDay = dateRange(this.start, this.end);

        function dateRange(startDate, endDate, steps = 1) {
            const dateArray = [];
            let currentDate = new Date(startDate);

            while (currentDate <= new Date(endDate)) {
                dateArray.push(
                    moment(new Date(currentDate)).format("DD-MMM-YYYY")
                );
                currentDate.setUTCDate(currentDate.getUTCDate() + steps);
            }
            return dateArray;
        }
    }

    componentDidMount() {
        const username = global.localStorage.username;

        if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
        }

        this.getLog();
        this.getMonthHours();
    }

    getLog() {
        const username = global.localStorage.username;

        LoghoursHelper.getWeek(username, new Date().getMonth() + 1)
            .then((data) => {
                this.setState({ monthWeekHours: data });
            })
            .catch((err) => {
                console.log(err);
            });

        LoghoursHelper.getHoursPerDay(username, new Date().getMonth() + 1)
            .then((data) => {
                this.setState({ hoursPerDay: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getMonthHours() {
        const username = global.localStorage.username;

        LoghoursHelper.getMonthHours(username, new Date().getMonth() + 1)
            .then((data) => {
                this.setState({ monthHours: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getDayLog(date) {
        const username = global.localStorage.username;

        LoghoursHelper.getDayLog(username, date)
            .then((data) => {
                
                this.setState({ logDay: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const {
            logDay,
            periodical,
            selectedPeriodical,
            logVisibility,
            date,
            username,
            monthHours,
            monthWeekHours,
            hoursPerDay,
        } = this.state;

        return (
            <div>
                {logVisibility && (
                    <Loghours
                        visibility={logVisibility}
                        setVisibility={(v) =>
                            this.setState({ logVisibility: v })
                        }
                        data={date}
                        getLog={() => this.getLog()}
                    />
                )}
                <div className={styles.button}>
                    <p style={{ padding: 10 }}>Select Period: </p>
                    <select
                        className={styles.selectCareer}
                        value={selectedPeriodical}
                        onChange={(e) =>
                            this.setState({
                                selectedPeriodical: e.target.value,
                            })
                        }
                    >
                        {periodical.map((p) => (
                            <option value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
                {selectedPeriodical == 1 && (
                    <div style={{ display: "flex" }}>
                        <div>
                            <p className={styles.dateHeading}>DATE</p>
                            <p
                                style={{ borderTop: "none" }}
                                className={styles.username}
                            >
                                {username}
                            </p>
                        </div>
                        <table
                            style={{ tableLayout: "fixed" }}
                            className={styles.table}
                        >
                            <tbody>
                                <tr>
                                    {this.days.map((d) =>
                                        isWeekend(new Date(d)) ? (
                                            <td
                                                style={{ color: "red" }}
                                                className={styles.date}
                                            >
                                                {d}
                                            </td>
                                        ) : (
                                            <td className={styles.date}>{d}</td>
                                        )
                                    )}
                                </tr>
                                <tr>
                                    {this.days.map((d) => (
                                        <td className={styles.iconsShow}>
                                            {hoursPerDay.map(
                                                (h) =>
                                                    h.date == d && (
                                                        <p>
                                                            {h.hours}
                                                            {" hrs"}
                                                        </p>
                                                    )
                                            )}
                                            <div className={styles.iconsHide}>
                                                <div
                                                    className={`${styles.icon}`}
                                                >
                                                    <i
                                                        className={`fa fa-eye ${styles.iconLeft}`}
                                                        aria-hidden="true"
                                                        onClick={() =>
                                                            this.getDayLog(
                                                                moment(
                                                                    d
                                                                ).format(
                                                                    "YYYY-MM-DD"
                                                                )
                                                            )
                                                        }
                                                    />
                                                    <i
                                                        className={`fa fa-plus ${styles.iconRight}`}
                                                        aria-hidden="true"
                                                        onClick={() =>
                                                            this.setState({
                                                                logVisibility: true,
                                                                date: d,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <p className={styles.dateHeading}>TOTAL</p>
                            <p
                                style={{ borderTop: "none" }}
                                className={styles.username}
                            >
                                {monthHours.map((m) => m.hours)}
                                {" Hrs"}
                            </p>
                        </div>
                    </div>
                )}
                {selectedPeriodical == 2 && (
                    <div>
                        <div style={{ padding: 5 }}>{"This Week: "}</div>
                        <div style={{ display: "flex" }}>
                            <div>
                                <p className={styles.dateHeading}>USER NAME</p>
                                <p
                                    style={{ borderTop: "none" }}
                                    className={styles.username}
                                >
                                    {username}
                                </p>
                            </div>
                            <table
                                style={{ tableLayout: "fixed" }}
                                className={styles.table}
                            >
                                <tbody>
                                    <tr>
                                        {this.weekDay.map((w) =>
                                            isWeekend(new Date(w)) ? (
                                                <td
                                                    style={{ color: "red" }}
                                                    className={styles.date}
                                                >
                                                    {w}
                                                </td>
                                            ) : (
                                                <td className={styles.date}>
                                                    {w}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        {this.weekDay.map((d) => (
                                            <td className={styles.iconsShow}>
                                                {hoursPerDay.map(
                                                    (h) =>
                                                        h.date == d && (
                                                            <p>
                                                                {h.hours}
                                                                {" hrs"}
                                                            </p>
                                                        )
                                                )}
                                                <div
                                                    className={styles.iconsHide}
                                                >
                                                    <div
                                                        className={`${styles.icon}`}
                                                    >
                                                        <i
                                                            className={`fa fa-eye ${styles.iconLeft}`}
                                                            aria-hidden="true"
                                                            onClick={() =>
                                                                this.getDayLog(
                                                                    moment(
                                                                        d
                                                                    ).format(
                                                                        "YYYY-MM-DD"
                                                                    )
                                                                )
                                                            }
                                                        />
                                                        <i
                                                            className={`fa fa-plus ${styles.iconRight}`}
                                                            aria-hidden="true"
                                                            onClick={() =>
                                                                this.setState({
                                                                    logVisibility: true,
                                                                    date: d,
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <p className={styles.dateHeading}>TOTAL</p>
                                <p
                                    style={{ borderTop: "none" }}
                                    className={styles.username}
                                >
                                    {monthWeekHours.map(
                                        (h) =>
                                            h.week ==
                                                moment(
                                                    startOfMonth(
                                                        new Date(this.end)
                                                    )
                                                ).week() -
                                                    1 && h.hours
                                    )}
                                    {" Hrs"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {selectedPeriodical == 3 && (
                    <div style={{ display: "flex" }}>
                        <div>
                            <p className={styles.dateHeading}>USER NAME</p>
                            <p
                                style={{ borderTop: "none" }}
                                className={styles.username}
                            >
                                {username}
                            </p>
                        </div>
                        <table
                            style={{ tableLayout: "fixed" }}
                            className={styles.table}
                        >
                            <tbody>
                                <tr>
                                    {this.weekly.map((w) => (
                                        <td className={styles.week}>
                                            {w.week}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    {this.weekly.map((w) => (
                                        <td className={styles.iconsShow}>
                                            {monthWeekHours.map(
                                                (m) =>
                                                    w.week_no == m.week &&
                                                    m.hours + " Hrs"
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <p className={styles.dateHeading}>TOTAL</p>
                            <p
                                style={{ borderTop: "none" }}
                                className={styles.username}
                            >
                                {monthHours.map((m) => m.hours)} {" Hrs"}
                            </p>
                        </div>
                    </div>
                )}

                {logDay.length > 0 && (
                    <div style={{ marginTop: 20 }}>
                        <table className={`table`}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Deliverable</th>
                                    <th>Project Name</th>
                                    <th>Work Items</th>
                                    <th>Billing</th>
                                    <th>Log Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logDay.map((l) => (
                                    <tr>
                                        <td>{l.date}</td>
                                        <td>{l.wbs_name}</td>
                                        <td>{l.project_name}</td>
                                        <td>{l.work_items}</td>
                                        <td>{l.billing_status}</td>
                                        <td>{l.loghours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}
