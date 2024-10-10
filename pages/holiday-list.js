import React from "react";
import styles from "../styles/pages.module.css";
import SideMenu from "../components/sideMenu/sideMenu";
import Head from "../components/head";

export default class HolidayList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToHolidayList: false,
        };
    }

    render() {
        return (
            <div>
                <SideMenu tag="sdlc" subTag="staticpage">
                    <Head title="Holiday Details" />
                    <div className={styles.wrapper}>
                        <p className={styles.title1}>
                            The below National and Festival Holidays List of Finari for 2024 calendar year
                        </p>

                        <table className={`table ${styles.smalltable}`}>
                        <thead>
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Date</th>
                                    <th>Day</th>
                                    <th>Holiday List</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>01-Jan-2024</td>
                                    <td>Monday</td>
                                    <td>English New Year</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>15-Jan-2024</td>
                                    <td>Monday</td>
                                    <td>Pongal</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>26-Jan-2024</td>
                                    <td>Friday</td>
                                    <td>Republic Day</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>29-Mar-2024</td>
                                    <td>Friday</td>
                                    <td>Good Friday</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>01-May-2024</td>
                                    <td>Wednesday</td>
                                    <td>May Day</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>15-Aug-2024</td>
                                    <td>Thursday</td>
                                    <td>Independence Day</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>02-Oct-2024</td>
                                    <td>Wednesday</td>
                                    <td>Gandhi Jayanthi</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>11-Oct-2024</td>
                                    <td>Friday</td>
                                    <td>Ayutha Pooja</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>31-Oct-2024</td>
                                    <td>Thursday</td>
                                    <td>Deepavali</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>25-Dec-2024</td>
                                    <td>Wednesday</td>
                                    <td>Christmas</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </SideMenu>
            </div>
        );
    }
}
